var express = require('express');
var router = express.Router();
var requestList = [
  { router: "/", path: "/index/index.js" }
]
requestList.forEach(function (item) {
  var actionReq = require('../action' + item.path)
  router.get(item.router, function (req, res, next) {
    actionReq(req, res, next)
  })
})
module.exports = router;