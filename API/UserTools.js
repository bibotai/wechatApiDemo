/**
 * Created by Administrator on 2016/5/23.
 */
var basetools = require('./BaseTools');
/**
 *获取用户信息
 * @constructor
 */
exports.GetUserInfo = function (args, callback) {
    var JsonGet = {
        access_token: args.access_token,
        openid: args.openid,
        lang: args.lang,
    };
    var option = {
        host: basetools.urls.hostBase,
        path: basetools.urls.pathBase + 'user/info',
    };
    basetools.RequesGet(JsonGet, option, function (data) {
        return callback(data);
    });
}
