var _port = 8000;

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('index.html');
});

app.listen(_port, function () {
    console.log('listening on ' + _port);
})