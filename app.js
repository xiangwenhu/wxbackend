var express = require('express');
var fs = require('fs');
var https = require('https');
var privateKey = fs.readFileSync('./private.pem', 'utf8');
var certificate = fs.readFileSync('./file.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };


var app = express();

var httpsServer = https.createServer(credentials, app);

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

app.get('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); //让options请求快速返回
    }
    else {
        next();
    }
});



httpsServer.listen(443, function () {
    console.log('HTTPS Server is running on: https://localhost:%s', 443);
});