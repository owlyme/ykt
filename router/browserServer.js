var express = require('express');
var router = express.Router();
var instance = require('../api/index')
var PATH = require('../api/path')
var CONST = require('../api/const')
var Request = require('request')

function isDirectPath(path) {
  let bool = false
  CONST.directRoutes.forEach(function (item) {
    item.test(path) && (bool = true)
  })
  return bool
}

router.post('/api/intercept', function(req, res, next){
  var sess = req.sessionID;
  let routeMap = null; // 用户权限console.error()路由表
  let broswerRoute = req.body.href;
  let sid = req.body.sessionId
  console.error('body')
  console.error(req.body)
  // 判断浏览器的cookie不存在或已过期
  if (!sid) {
    console.error('session不存在')
    sid = sess;
    let d = new Date();
    d.setTime(d.getTime() + (CONST.maxAge))

    if (isDirectPath(broswerRoute)) {
      res.json({
        sessionId : sid,
        expires : d.toUTCString(),
        routeMap : routeMap,
        url : broswerRoute,
        noExist : true
      })
    } else {
      res.json({
        sessionId : sid,
        expires : d.toUTCString(),
        routeMap : routeMap,
        url : '/login',
        noExist : true
      })
    }
    // 需要根据web站点路由二级目录，根据约定好的权限去跳转，不需要权限，直接跳转到访问的页面，否则，直接到登陆页面
  } else {
    // session存在，判断session有效性
    // 请求Java接口判断接口有效性
    var param = {
      url: PATH.GET_SESSION,
      json: true,
      method: 'POST',
      body: {sessionId : sid}
    }
    var validReq = Request(param, function(err, dataObj, body) {
      console.error('判断session是否有效')
      // session有效
      if (body.code === 1) {
        console.error('session有效')
        let d = new Date();
        d.setTime(d.getTime() + (CONST.maxAge))
        res.json({
          sessionId : sid,
          expires: d.toUTCString(),
          // routeMap : routeMap,
          url : broswerRoute,
          valid: true,
          nickName: body.data.nickName
        })
      } else {
        console.error('session无效')
        let d = new Date();
        d.setTime(d.getTime() + (CONST.maxAge))
        if (isDirectPath(broswerRoute)) {
          res.json({
            sessionId : sid,
            expires : d.toUTCString(),
            routeMap : routeMap,
            url : broswerRoute,
            invalid: true
          })
        } else {
          res.json({
            sessionId : sid,
            expires : d.toUTCString(),
            routeMap : routeMap,
            url : '/login',
            invalid: true
          })
        }
      }
    })
  }
})
// 登陆
router.post('/api/login', function(req, res, next) {
  let param = {
    identificationNumber: req.body.username,
    loginPassword : req.body.psw,
    sessionId : req.cookies.sessionId,
    platformType : 1
  }
  console.error(PATH.LOGIN)
  console.error(param)
  Request.post({
    url: PATH.LOGIN,
    json: true,
    method: 'POST',
    body: param
  }, function (err, data, body) {
    res.json(body);
  })
})

router.post('/api/register', function (req, res) {
  let param = {
    identificationNumber: req.body.username,
    loginPassword : req.body.psw,
    sessionId : req.cookies.sessionId,
    registerType : req.body.regType,
    mobile : req.body.mobile,
    platformType : req.body.platformType,
    autoLogin : req.body.autoLogin
  }
  // 输出 JSON 格式
  console.error(param)
  Request({
    url: PATH.REGISTER,
    json: true,
    method: 'POST',
    body: param
  }, function (err, data, body) {
    console.error(body)
    if (body.code === 1) {
      // res.json(body);
    }
    res.json(body);
  })
})

router.post('/api/logout', function (req, res) {
  // 输出 JSON 格式
  let param = {
    sessionId : req.cookies.sessionId,
  }
  Request({
    url: PATH.LOGOUT,
    json: true,
    method: 'POST',
    body: param
  }, function (err, data, body) {
    res.json(body);
  })
})

module.exports = router;
