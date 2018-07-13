const express = require('express')
const path = require('path')
const request = require('./api/index')
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileRoute = require('./router/fileService')
const htmlRoute = require('./router/htmlService')
const browserRoute = require('./router/browserServer')
const session = require('express-session')
const uuid = require('node-uuid');

let options = {
  name: 'sessionId',
  domain: 'localhost', // 表示 cookie 的域；用于和请求 URL 的服务器的域进行比较。如果匹配，那么接下来检查路径属性。
  secret: 'bear',  // 用来对session id相关的cookie进行签名
  genid:function(req) {
    console.error(req.sessionId)
    console.error(req.body)
    let ssid = null;
    if(!req.body[options.name] && !req.body['connect.sid']) {
      ssid = uuid(24);
    }
    return ssid
  },
  path: '/', // 表示 cookie 的路径；用于和请求路径进行比较。如果路径和域都匹配，那么在请求中发送 cookie。
  // store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    httpOnly:false,
    secure: false // 确保浏览器只通过 HTTPS 发送 cookie
  }
}

app.use(cookieParser());
var urlencodedParser = app.use(bodyParser.urlencoded({extended: false}));
// 使用就靠这个中间件
app.use(bodyParser.json()); // for parsing application/json

app.use(session(options));
// ssr
app.engine('html', require('express-art-template'));
// app.use('/api', express.static(__dirname + '/api'))
app.use(fileRoute)
app.set('views', path.join(__dirname, 'views'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});
app.use(htmlRoute)
app.use(browserRoute)
app.listen(3000, function () {
  console.log('listen 3000...')
});