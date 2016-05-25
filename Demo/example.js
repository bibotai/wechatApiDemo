/**
 * Created by Administrator on 2016/5/24.
 */
var wechat = require('./../index').weixintools;
var wechatUesr = require('./../index').usertools;
var wechatBund = require('./../index').bundtools;
var config = require('./config');

var api = new wechat(config.appid, config.appsecret);
//获取token
api.GetAccessToken(function (data) {
   console.log('access_token:' + JSON.parse(data)['access_token']);
});

//从cache获取token
api.GetAccessTokenInCache(function (data) {
    console.log('access_token in cache:' + data);
});

//获取用户信息参数
var argsUser = {
    access_token: 'access_token',
    openid: 'openid',
    lang: 'lang'
};

/**
 *获取用户信息
 */
wechatUesr.GetUserInfo(argsUser, function (data) {
    console.log('userinfo:' + data);
});

 //绑定参数
 var argsBund = {
     access_token: 'access_token',
     ticket: 'ticket',
     device_id:'device_id',
     openid: 'openid'
 };
 /**
  * 绑定成功通知
  */
 wechatBund.Bund(argsBund, function (data) {
     console.log('bund:' + data);
 });