var express, app, http, util, statString;

express = require('express');
http = require('http');
util = require('util');
statString = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPARAMS=2014-15&' +
             'ContextFilter=&ContextMeasure=FGA&DateFrom=&DateTo=&GameID=&GameSegment=&' +
             'LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&' +
             'Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=%s&PlusMinus=N&' +
             'Position=&Rank=N&RookieYear=&Season=2014-15&SeasonSegment=&SeasonType=Regular+Season&' +
             'TeamID=0&VsConference=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&showZones=0';

app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/app.js', function (req, res) {
    res.sendFile(__dirname + '/dist/app.js');
});

app.get('/data', function (req, res) {
  var playerId, requestUrl;
  playerId = req.query.id;
  requestUrl = util.format(statString, playerId);
  http.get(requestUrl, function (response) {
    var playerData;
    playerData = '';

    response.on('data', function (data) {
      playerData += data.toString();
    });

    response.on('end', function () {
      var json, headerData, shotData;

      json = JSON.parse(playerData);
      headerData = json['resultSets'][0]['headers'];
      shotData = json['resultSets'][0]['rowSet'];

      res.json(shotData.concat([headerData]));
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
});

app.listen(3030, function () {
    console.log('Server running on localhost:3030');
});
