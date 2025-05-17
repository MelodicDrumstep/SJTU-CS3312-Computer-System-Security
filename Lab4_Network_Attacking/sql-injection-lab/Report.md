# SQL Injection Lab Report

## Compilation

```
export GOPROXY=https://goproxy.cn,direct
go build -ldflags="-s -w" main.go
```

admin OR 1=1

## Attempts

1. Let's formalize the process:

For registration, input username A, password m0:
First check for duplicates using filtered(A)
If not duplicate, register by inserting (A, md5(m0), 0) into DB

For login, input username B, password m1:
Use prepared statement to find B, md5(m1) in DB, check if password matches
Then use the username (B) from DB to redirect to /dashboard
In dashboard, call checkPermission, which uses
filtered(B) to search in DB and return corresponding permission.

So, filter B's permission field in DB is 2
pswd(A) = m0
pswd(B) = m1

2. Injection at registration seems useless unless I can inject into the database write statement, otherwise the permission won't be sufficient.
For example, I tried using username `admin OR 1=1` during registration, but it didn't work.

3. For the login part, we need to pay special attention to the behavior of the `checkPermission` function:

```go
func checkPermission(username string) bool {

	// Filter is applied here again
	filteredUsername := simpleSQLFilter(username)

	log.Printf("[checkPermission] Filtered username: %s", filteredUsername)
	
	// SQL injection point
	query := fmt.Sprintf("SELECT * FROM users WHERE username = '%s'", filteredUsername)
	
	log.Printf("[checkPermission] Executing query: %s", query)
	
	var user User
	err := userdb.QueryRow(query).Scan(&user.ID, &user.Username, &user.Password, &user.Perm)
	if err != nil {
		log.Printf("[checkPermission] Permission query failed: %v", err)
		return false
	}
	
	// If permission is greater than 1, it's an admin
	return user.Perm > 1
}
```

Based on this, if we want the attack to succeed, there are only two cases:

a. The filtered username used for login is already registered as admin

b. It's not admin but the permission has been changed to 2

I tried case a. If we want the filtered username in checkPermission to be admin,
then its pre-filtered form is not admin but is registered, let's say it's A. But we can't register with A because
registration will filter A to get `admin` and check for duplicates, which will find the field already exists.
For example, I tried using username `admindrop` but it didn't work.

4. I also tried directly injecting into the database write part. I found its format is:

```go
_, err = userdb.Exec("INSERT INTO users (username, password, perm) VALUES (?, ?, 0)", username, hashStr)
```

Therefore, I tried to inject the username as `A, md5(A), 2) ...` format.

I tried `AB, 5d41402abc4b2a76b9719d911017c592, 2)`, but it didn't work.
