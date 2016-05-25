/**
 * Created by Administrator on 2016/5/24.
 */
var basetools = require('./BaseTools');
var weixintools = require('./WeixinTools');

//绑定成功通知(封装)
exports.Bund = function (args, callback) {
    this._Bund(args, function (res) {
        console.log(res);
        var statu=weixintools.IsFail(res);
    });

    i = 0;
    if (this.result === true) {
        i++;
        console.log("尝试次数：" + i + "，返回信息：" + callback)
        _Bund(args, callback);
        if (i >= 3)
            result = false;
    }
}

//绑定成功通知（未封装）
exports._Bund = function (args, callback) {
    var JsonPost = {
        access_token: args.token,
        ticket: args.ticket,
        device_id: args.deviceid,
        openid: args.openid,
    };
    var option = {
        host: basetools.urls.hostBase,
        path: basetools.urls.pathBase + 'device/bind',
    };
    basetools.RequesPost(JsonPost, option, function (data) {
        return callback(data);
    });

}


//解绑成功通知(封装)
exports.Unbund = function (callback) {
    var result = weixintools.IsFail(callback);
    i = 0;
    if (result === true) {
        i++;
        _Unbund(callback);
        if (i >= 3)
            result = false;
    }
}

//解绑成功通知（未封装）
_Unbund = function (callback) {
    var options = {
        host: 'api.weixin.qq.com',
        path: '/device/unbind',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': this.contents.length
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
    req.write(this.contents);
    req.end();
}

//强制绑定成功通知
exports.ForceBund = function (callback) {
    var options = {
        host: 'api.weixin.qq.com',
        path: '/device/compel_bind',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': this.contents.length
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
    req.write(this.contents);
    req.end();
}

//强制解绑成功通知
exports.ForceUnBund = function (callback) {
    var options = {
        host: 'api.weixin.qq.com',
        path: '/device/compel_unbind',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': this.contents.length
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
    req.write(this.contents);
    req.end();
}