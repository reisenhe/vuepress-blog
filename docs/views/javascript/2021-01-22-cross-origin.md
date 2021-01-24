---
title: 【JavaScript】知识小记 - 跨域
date: 2021-01-22
categories:
 - frontEnd
author: ReisenD
tags:
 - javascript
 - 浏览器
 - 面试
---

## 什么是跨域
始于浏览器的同源策略，指的是浏览器不能执行其他网站的脚本，是一种对 js 实施的安全限制
### 同源策略
协议、域名以及端口三者必须一致，否则就会触发跨域。出于安全考虑，浏览器只允许了相同域名下的接口交互。

## 跨域的解决方案
### 跨域资源共享 CORS
后端设置了响应头中的相关参数后，浏览器就能开启 CORS 通信。最基础的参数就是 **Access-Control-Allow-Origin**
```js
// 以 nodejs 举例接口代码设置
function (req,res) {
    // 设置参数为 * 表示允许所有情况下的跨域请求
    res.header("Access-Control-Allow-Origin","*")
    res.send('接收数据')
}
```
除此之外，还有其他详细的跨域设置
* access-control-allow-origin - 决定可跨域的源路径，(例如 https://www.bilibili.com)
* access-control-allow-methods - 决定可跨域的请求方法，(例如 POST)
* access-control-allow-headers - 决定允许携带的请求头，(例如 Content-Type)
...

### jsonp
利用网页中的 script 标签没有跨域限制的机制，在加载页面资源时，可以通过这种方法获取到接口返回的动态数据。当然智能使用 **GET** 请求方法
```js
// 以 nodejs 举例接口代码设置
app.get("/", function(req, res) {
    // 路径中带上 query 为 callback 的函数名，执行完请求后，将会执行页面中对应的函数方法，并把返回值传入
    let funcName = req.query.callback;
    res.send(funcName + "('接收数据')")
})
```
在页面中注册好响应名称的方法，再将方法传入，就可以实现跨域获取内容了
```html
<script>
    // 下方的 script 将请求这个方法
    function f(data) {
        // 传入的内容将被打印
        console.log(data)
    }
</script>
<script src="http://localhost:5316?callback=f"></script>
```
