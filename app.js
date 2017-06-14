var express = require('express')
var app = express()
var proxy = require('http-proxy-middleware');

//静态资源
app.use(express.static(__dirname + '/public'))

//c.y.qq.com QQ音乐
app.use('/cyqq', proxy({
    target: 'https://c.y.qq.com',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
        '^/cyqq': ''
    },
    headers: {
        Referer: 'https://c.y.qq.com'
    }
}));



app.listen(3002)