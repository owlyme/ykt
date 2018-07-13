var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require("path");
const multer = require('multer')
const FdfsController = require('../fileService/FdfsController')
// fdfs单点部署
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'fileService/upload/');    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.originalname);
    // cb(null, file.fieldname + '-' + Date.now());  
  }
});
var upload = multer({ storage: storage })
// 单图上传
router.post('/upload', upload.single('logo'), function (req, res, next) {
  // An error occurred when uploading
  var file = req.file;
  var filepath = path.join(__dirname, '../'+file.path)
  console.log(filepath)
  FdfsController.upload(filepath, file.originalname, res)
});
router.get('/download', function (req, res, next) {
  FdfsController.download(req, res)
})
router.get('/form', function (req, res, next) {
  var form = fs.readFileSync(path.join(__dirname, '../form.html'), { encoding: 'utf8' });
  res.send(form);
});

module.exports = router;