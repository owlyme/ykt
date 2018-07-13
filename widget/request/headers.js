var debug = 0,
    key = '888',
    ver = '1.0',
    version = 0,
    ctype = 1,
    md5 = require('../md5/md5');
//require('common/cookie/cookie.js');

function headers(cookie){
    //获取cookie
    var cookies ={};
     if (cookie) {
        cookie.split(';').forEach(l => {
            var parts = l.split('=');
            cookies[parts[0].trim()] = (parts[1] || '').trim();
       });
    }
    var time = Date.parse(new Date()) / 1000;
    var sign = md5(time + key);
    var headers = {
        sign : sign,
        time : time,
        ver : ver,
        version : version,
        ctype : ctype,
        key: key,
        city : cookies.city || '',
        sid : cookies.sid || '',
        'User-Agent': 'request'
    }
    return headers;
}


module.exports = headers;
