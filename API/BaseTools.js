/**
 * Created by Administrator on 2016/5/24.
 */
var https = require('https');
var querystring = require('querystring');

/**
 * get操作
 * @param JsonGet
 * @param option
 * @param callback
 * @constructor
 */
exports.urls={
    hostBase : 'api.weixin.qq.com',
    pathBase : '/cgi-bin/',
}

exports.RequesGet = function (JsonGet, option, callback) {
    var contents = querystring.stringify(JsonGet);
    var options = {
        host: option.host,
        path: option.path + '?' + contents,
        method: 'GET',
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            return callback(data);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();
}

/**
 * Post操作
 * @param JsonPost
 * @param option
 * @param callback
 * @constructor
 */
exports.RequesPost = function (JsonPost, option, callback) {
    var contents = querystring.stringify(JsonPost);

    var options = {
        host: option.host,
        path: option.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': contents.length
        }
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            return callback(data);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(contents);
    req.end();
}