var express, app, http;

express = require('express');
http = require('http');
app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/app.js', function (req, res) {
    res.sendFile(__dirname + '/dist/app.js');
});

app.listen(3030);
