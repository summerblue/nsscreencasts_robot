
## 说明

	利用此脚本把 http://www.nsscreencast.com/ 上的视频下载下来. 

## 安装必要的工具

Reqirements: nodejs, caspterjs, aria2 

### 安装 nodejs

	➜ brew install node

### 安装 caspterjs headless browser

这里利用 brew 来协助安装

	➜ brew update
	➜ brew install casperjs

### 安装 aria2 命令行下载工具

	➜ brew install aria2

## 执行操作

> 注意必须按照以下流程执行操作. 


### 先登录 

> 注意此项目并没有使用到 login cookie 的功能, 这里只是作为一个利用 caspterjs 登录的 demo 

修改 login.js 文件, 填写用户名密码信息

	var login_username = '我的帐号';
	var login_password = '我的密码';

命令行执行, 注意

	casperjs login.js 

### 抓取分页

	casperjs lesson_pager.js

### 开始下载

因为此网站下载的时候会判断用户是否登录, 所有在下载器 `aria2` 发送请求的时候, 需要能带登录的 cookie. 

#### 获取 cookie 的方法是: 

1. 打开 chrome 浏览器并登录 http://www.nsscreencast.com/;
2. 使用 chrome debuger 里的 network 功能, 刷新页面, 点击请求链接, 取下请求时候使用的 Cookie 复制出来;
3. 把刚刚获取到的 cookie 填入 lesson_downloader.js 文件的以下地方

```
var cookie_header = '--header=Cookie: _gauge...dc45f39';
```

#### 开始执行下载命令

	node lesson_downloader.js



