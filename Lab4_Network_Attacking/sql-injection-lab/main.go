package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"crypto/md5"
	"encoding/hex"
	"strings"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	_ "modernc.org/sqlite"
)

var (
	userdb           *sql.DB
	templates    *template.Template
	sessionStore *sessions.CookieStore
)


// 初始化数据库
func initUserDB() error {
	// 确保数据库文件存在
	if _, err := os.Stat("users.db"); os.IsNotExist(err) {
		file, err := os.Create("users.db")
		if err != nil {
			return err
		}
		file.Close()
	}

	// 打开数据库连接
	var err error
	userdb, err = sql.Open("sqlite", "users.db")
	if err != nil {
		return err
	}

	// 创建用户表
	createTableQuery := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		perm INTEGER DEFAULT 0
	);
	
	INSERT OR IGNORE INTO users (username, password, perm) VALUES ('admin', 'zzz', 2);
	INSERT OR IGNORE INTO users (username, password, perm) VALUES ('user', 'e10adc3949ba59abbe56e057f20f883e', 0);


	`
	_, err = userdb.Exec(createTableQuery)
	return err
}

// 简单的过滤函数 - 过滤一些常见的SQL注入关键字
func simpleSQLFilter(input string) string {
	// 转换为小写进行检查
	lowerInput := strings.ToLower(input)
	
	// 检查常见SQL关键字
	keywords := []string{"select", "union", "drop", "delete", "insert", "update", "--", ";", "/*", "*/"}
	// amdmin' OR 1=1
	for _, keyword := range keywords {
		if strings.Contains(lowerInput, keyword) {
			// 替换关键字为空
			// 但是会替换几次？
			
			// 这里只会 replae 一次， 我可以利用这个规则
			input = strings.ReplaceAll(input, keyword, "")
			input = strings.ReplaceAll(input, strings.ToUpper(keyword), "")
		}
	}
	
	return input
}

// 用户结构体
type User struct {
	ID       int
	Username string
	Password string
	Perm     int
}

// 处理首页路由
func indexHandler(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "index.html", nil)
}

// 处理注册页面
func registerPageHandler(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "register.html", nil)
}

// 处理注册请求
func registerHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	username := r.FormValue("username")
	password := r.FormValue("password")

	if username == "" || password == "" {
		templates.ExecuteTemplate(w, "register.html", "用户名和密码都是必填项")
		return
	}
	filteredUsername := simpleSQLFilter(username)
	log.Printf("过滤后的用户名: %s", filteredUsername)

	// SQL注入点,但是有用吗？
	sql := fmt.Sprintf("SELECT * FROM users WHERE username = '%s'", filteredUsername)
	log.Printf("[registerHandler] SQL语句: %s", sql)
	row := userdb.QueryRow(sql)
	var user User
	err := row.Scan(&user.ID, &user.Username, &user.Password, &user.Perm)
	if err == nil {
		templates.ExecuteTemplate(w, "register.html", "用户名已存在")
		return
	} else if err.Error() != "sql: no rows in result set" {
		log.Printf("查询错误: %v", err)
		templates.ExecuteTemplate(w, "register.html", "注册失败")
		return
	}
	
	hash := md5.Sum([]byte(password))
	hashStr := hex.EncodeToString(hash[:])

	// 插入新用户，默认权限为0
	log.Printf("[registerHandler] 插入新用户: %s", username)
	// 使用fmt.Sprintf来格式化SQL语句，打印出实际执行的SQL语句
	execSQL := fmt.Sprintf("INSERT INTO users (username, password, perm) VALUES ('%s', '%s', 0)", username, hashStr)
	log.Printf("[registerHandler] Userdb exec: %s", execSQL)
	_, err = userdb.Exec("INSERT INTO users (username, password, perm) VALUES (?, ?, 0)", username, hashStr)
	if err != nil {
		log.Printf("[registerHandler] 执行错误: %v", err)
		templates.ExecuteTemplate(w, "register.html", "注册失败")
		return
	}

	http.Redirect(w, r, "/login", http.StatusSeeOther)
}

// 处理登录页面
func loginPageHandler(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "login.html", nil)
}

// 处理登录请求
func loginHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	username := r.FormValue("username")
	password := r.FormValue("password")
	hash := md5.Sum([]byte(password))
	hashStr := hex.EncodeToString(hash[:])
	if username == "" || password == "" {
		templates.ExecuteTemplate(w, "login.html", "用户名和密码都是必填项")
		return
	}

	log.Printf("[loginHandler] 登录用户: %s", username)

	var user User
	//预编译，没有注入
	row := userdb.QueryRow("SELECT id, username, password FROM users WHERE username = ? AND password = ?", username, hashStr)
	err := row.Scan(&user.ID, &user.Username, &user.Password)
	if err != nil {
		log.Printf("[loginHandler] Error: %v", err)
		templates.ExecuteTemplate(w, "login.html", "用户名或密码错误")
		return
	}

	session, _ := sessionStore.Get(r, "auth-session")
	session.Values["authenticated"] = true
	session.Values["user_id"] = user.ID
	session.Values["username"] = user.Username  
	session.Save(r, w)

	http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
}


func isAuthenticated(r *http.Request) bool {
	session, _ := sessionStore.Get(r, "auth-session")
	auth, ok := session.Values["authenticated"].(bool)
	return ok && auth
}


func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !isAuthenticated(r) {
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}
		next.ServeHTTP(w, r)
	})
}


func checkPermission(username string) bool {
	// 这里还会 filter 一次
	filteredUsername := simpleSQLFilter(username)

	log.Printf("[checkPermission] 过滤后的用户名: %s", filteredUsername)
	
	// SQL注入点
	query := fmt.Sprintf("SELECT * FROM users WHERE username = '%s'", filteredUsername)
	
	log.Printf("[checkPermission] 执行查询: %s", query)
	
	var user User
	err := userdb.QueryRow(query).Scan(&user.ID, &user.Username, &user.Password, &user.Perm)
	if err != nil {
		log.Printf("[checkPermission] 权限查询失败: %v", err)
		return false
	}
	
	// 如果权限大于1，则是管理员
	return user.Perm > 1
}


func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := sessionStore.Get(r, "auth-session")
	username := session.Values["username"].(string)

	log.Printf("[dashboardHandler] 用户名: %s", username)
	
	isAdmin := checkPermission(username)
	
	data := struct {
		Username string
		IsAdmin  bool
	}{
		Username: username,
		IsAdmin:  isAdmin,
	}
	session.Values["isAdmin"] = isAdmin
	session.Save(r, w)
	
	templates.ExecuteTemplate(w, "dashboard.html", data)
}


func logoutHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := sessionStore.Get(r, "auth-session")
	session.Values["authenticated"] = false
	session.Save(r, w)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func main() {

	templates = template.Must(template.ParseGlob("templates/*.html"))

	sessionStore = sessions.NewCookieStore([]byte("secret-key-for-session"))

	// 初始化数据库
	if err := initUserDB(); err != nil {
		log.Fatalf("数据库初始化失败: %v", err)
	}
	defer userdb.Close()
	// if err := initSecretDB(); err != nil {
		// log.Fatalf("数据库初始化失败: %v", err)
	// }
	// defer secretdb.Close()

	// 初始化路由
	r := mux.NewRouter()
	r.HandleFunc("/", indexHandler)
	r.HandleFunc("/register", registerPageHandler).Methods("GET")
	r.HandleFunc("/register", registerHandler).Methods("POST")
	r.HandleFunc("/login", loginPageHandler).Methods("GET")
	r.HandleFunc("/login", loginHandler).Methods("POST")
	r.HandleFunc("/logout", logoutHandler)

	// 需要认证的路由
	dashboard := r.PathPrefix("/dashboard").Subrouter()
	dashboard.Use(authMiddleware)
	dashboard.HandleFunc("", dashboardHandler)

	// 启动服务器
	fmt.Println("服务器已启动，监听在 http://localhost:8089")
	log.Fatal(http.ListenAndServe(":8089", r))
} 