var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/pineboxes");
var Pinebox = require("./pineboxModel");
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/pineboxes', function (req, res, next) {
  Pinebox.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
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
  Beer.findOneAndRemove({ _id: req.params.id }, function(err, pinebox) {     // might
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
  Beer.findOneAndUpdate({ _id: req.params.id },  {$set:  {color: req.body.color}}, { new: true }, function(err, pinebox) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      //console.log(pinebox); testing
      res.send(pinebox);
    }
  });
});///////////////////////////////////////////////// edit a certain pineappleBox's
app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.");
});
