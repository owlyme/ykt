const axios = require('axios');
const util = require('./util.js');

const instance = axios.create({ // 自定义配置创建axios的新实例。
  // baseURL: 'http://rap2api.taobao.org/app/mock/224',
  withCredentials: true, // 允许携带cookie
  timeout: 10000
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
//错误处理 截取请求 //添加响应拦截器
instance.interceptors.response.use(function(response) {
  return response;
}, util.catchError);

module.exports = instance;