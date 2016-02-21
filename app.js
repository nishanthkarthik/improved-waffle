/* global process */
var _port = process.env.PORT | 8000;

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('login.html');
});

app.listen(_port, function () {
    console.log('listening on ' + _port);
})