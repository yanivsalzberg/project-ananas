var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var pineRoutes = require('./routers/pine-router');
var playerRoutes = require('./routers/player-router');
var app = express();

mongoose.connect("mongodb://localhost/pineboxes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/pineboxes', pineRoutes);
app.use('/players', playerRoutes);
app.use(express.static('public'));
app.use(express.static('node_modules'));


app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(8000, function() {
  console.log("Pineapple! Listening on 8000.");
});
