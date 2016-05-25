/**
 * Created by Administrator on 2016/5/23.
 */
var https = require('https');
var redis = require('redis');
var basetools = require('./BaseTools');


//缓存
client = redis.createClient();

/**
 *全局
 * @param appid
 * @param secret
 * @constructor
 */
var API = function (appid, secret) {
    this.appid = appid;
    this.secret = secret;
}

/**
 *从微信api获取access_token
 * @constructor
 */
API.prototype.GetAccessToken = function (callback) {
    var JsonGet = {
        grant_type: 'client_credential',
        appid: this.appid,
        secret: this.secret,
    };
    var option = {
        host: basetools.urls.hostBase,
        path: basetools.urls.pathBase + 'token',
    };
    basetools.RequesGet(JsonGet, option, function (data) {
        client.set("access_token", JSON.parse(data)['access_token'], redis.print)
        client.quit();
        return callback(data);
    });
}

/**
 *从缓存获取access_token
 * @constructor
 */
API.prototype.GetAccessTokenInCache = function (callback) {
    client.get("access_token", function (err, res) {
        if (err) {
            console.log("错误信息：" + err);
        } else {
            //console.log("缓存结果：" + res);
            return callback(res);
        }
    });
    client.quit();
}

/**
 *验证微信返回的json是否是成功的，如果不成功返回true
 * @param res
 * @constructor
 */
exports.IsFail = function (json) {
    console.log(json);
    if (json['errcode'] === '40001') {
        return true;
    } else {
        return false;
    }
}

module.exports = API;