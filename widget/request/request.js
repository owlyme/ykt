var request = require('request');

function getRequest(url, headers, cb) {
    request({
        url: url,
        formData: '',
        headers: require('./headers')(headers.cookie)
    }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            var json = {};
            try {
                json = JSON.parse(body);
            } catch (e) {
                err = true;
            }
        }
        cb && cb(json, err, body);
    });
}


module.exports = getRequest;