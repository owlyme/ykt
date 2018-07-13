module.exports = {
  directRoutes : [/^(\/login).*$/, /^(\/index).*$/, /^(\/register).*$/], // 不需要权限验证的路由
  maxAge : 60 * 1000 // session 过期时间
}