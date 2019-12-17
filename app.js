"use strict"

var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var cookieParser = require('cookie-parser');
var utils = require("./utils")
//第一种
// var fs = require("fs")
// app.use('/index.html',function(req,res){
//   var fileName="./index.html";
//   fs.readFile(fileName,function(err,data){
//       if(err)
//           console.log("对不起，您所访问的路径出错");
//       else{
//           res.write(data);
//       }
//   })
// })

//第二种
var exStatic = require("express-static");
app.use(exStatic('./')); //这一句中的'./'是静态页面的相对路径。

//端口号
var port = 3000

app.use(cookieParser());
app.use(bodyParse.urlencoded({
  extended: false
}));
app.use(express.static('public'));

// 解决跨域问题
app.all('*', function (req, res, next) {
  // console.log(req);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, authKey, sessionid');
  // res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, authKey, sessionId");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


  if (req.method == 'OPTIONS') {
    res.send(200);
    /让options请求快速返回/
  } else {
    next();
  }
});

// 监听3000端口
var server = app.listen(port, utils.getIPAdress(), function () {
  console.log(`listening at =====> ${utils.getIPAdress()}:${port}...`);
});

//说明
// var server = app.listen(端口, 获取本机IP, function () {
//   console.log(`listening at =====> ${utils.getIPAdress()}:${port}...`);
// });