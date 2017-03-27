var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/pineboxes");
//mongoose.connect("mongodb://localhost/players");
var Pinebox = require("./pineboxModel");
//var Player = require("./playerModel");
app.use(express.static('public'));
app.use(express.static('node_modules'));
//****************************************** player paths ************************************************************************
app.get('/players', function (req, res, next) {
  Player.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })// find()
})///////////////////////////////////     getting all players( highscore list, etc) ////////////////////////////////////////////////

app.get('/players/:name', function (req, res, next) {
  Player.find({name: req.params.name},function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })// find()
})///////////////////////////////////     getting specific player by name(for now) ////////////////////////////////////////////////

app.post('/players', function (req, res, next) {
  var p = new Player(req.body);
  p.save(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  });//save
}); ///////////////////////////////////// saving a new pineapple box ////////////////////////////////////////////////////

app.delete("/players/:name",function(req,res){
  Player.findOneAndRemove({ _id: req.params.name }, function(err, player) {     // might
    if (err) {
      console.log(err);
      res.send("err");
    }  else {
      //console.log(player); testing
      res.send(player);
    }
}); //findOneAndRemove
}); //app.delete
 //////////////////////////////////////////deleting a new pineapple box //////////////////////////////////////////////////
//   update a players score and number of games played. also check for achievement
app.put('/players/:name', function(req, res, next) {
  Player.findOneAndUpdate({ name: req.params.name },  {$inc:  {score: 100, gamesWon: 1}}, { new: true }, function(err, player) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      //console.log(player); testing
      res.send(player);
    }
  });
});///////////////////////////////////////////////// update a winning player

//******************************************end of player paths ************************************************************************

//****************************************** pineapple paths ***************************************************************************
app.get('/pineboxes', function (req, res, next) {
  Pinebox.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      console.log("server is"+ result);
      res.send(result);
    }//else
  })// find()
})///////////////////////////////////     getting all the pineapples ////////////////////////////////////////////////

app.post('/pineboxes', function (req, res, next) {
  var p = new Pinebox(req.body);
  p.save(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  });//save
}); ///////////////////////////////////// saving a new pineapple box ////////////////////////////////////////////////////

app.delete("/pineboxes/:id",function(req,res){
  Pinebox.findOneAndRemove({ _id: req.params.id }, function(err, pinebox) {     // might
    if (err) {
      console.log(err);
      res.send("err");
    }  else {
      //console.log(pinebox); testing
      res.send(pinebox);
    }
}); //findOneAndRemove
}); //////////////////////////////////////////deleting a new pineapple box //////////////////////////////////////////////////
app.put('/pineboxes/:id', function(req, res, next) {
  Pinebox.findOneAndUpdate({ _id: req.params.id },  {$set:  {color: req.body.color}}, { new: true }, function(err, pinebox) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      //console.log(pinebox); testing
      res.send(pinebox);
    }
  });
});///////////////////////////////////////////////// edit a certain pineappleBox's
//*******************************************************   pineapple paths *************************************************************
app.listen(8000, function() {
  console.log("Pineapple! Listening on 8000.");
});
