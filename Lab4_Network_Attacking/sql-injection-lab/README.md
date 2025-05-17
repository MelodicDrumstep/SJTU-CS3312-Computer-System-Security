# 环境搭建

提供了预先编译好的Binary(linux/amd64, macos/arm64, windows/amd64)

你也可以通过`go build -ldflags="-s -w" main.go`自行编译

或者也可以直接运行`go run main.go`

服务器默认绑定到`0.0.0.0:8089`

本地搭建环境仅是为了方便调试，在实际场景中，你看不到任何stdout/stderr输出。类似的，你也无法直接读取templates下的任何内容。

# 任务

利用SQL注入漏洞拿到管理员权限登录到Dashboard，获取Flag。

# 提示

1. 管理员初始化语句为`INSERT OR IGNORE INTO users (username, password, perm) VALUES ('admin', 'zzz', 2);`，而后端实际比较的是md5值，不可能拿到密码直接登录。

2. 你应该重点关注`simpleSQLFilter`, `registerHandler`和`checkPermission`。源码中也给出了相应提示

3. 你可以结合代码中已有的log或自行添加log语句，观察实际执行的SQL语句及执行结果。

4. 你应该时刻考虑构造某个SQL注入Payload的目的是什么，是为了提取数据库数据还是控制SQL语句输出结果。

## 参考资料

https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection

https://cloud.tencent.com/developer/article/2160400

https://www.anquanke.com/post/id/266244

https://www.k0rz3n.com/2017/11/21/mysqltrick/

# 作业要求

1. 以Markdown形式提交完整的思路，包括但不限于代码分析过程和构造的HTTP请求。
2. 尝试用Python/Javascript写一个脚本，自动完成这个任务。

