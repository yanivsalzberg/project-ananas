var express = require('express');
var router = express.Router();
var Player = require("../models/playerModel");

router.get('/', function (req, res, next) {
  Player.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })// find()
})///////////////////////////////////     getting all players( highscore list, etc) ////////////////////////////////////////////////

router.get('/:name', function (req, res, next) {
  Player.find({name: req.params.name},function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  })// find()
})///////////////////////////////////     getting specific player by name(for now) ////////////////////////////////////////////////

router.post('/', function (req, res, next) {
  var p = new Player(req.body);
  p.save(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  });//save
}); ///////////////////////////////////// saving a new pineapple box ////////////////////////////////////////////////////

router.delete("/:name",function(req,res){
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
router.put('/:name', function(req, res, next) {
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

module.exports = router;
