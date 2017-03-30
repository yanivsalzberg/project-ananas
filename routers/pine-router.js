var express = require('express');
var router = express.Router();
var Pinebox = require("../models/pineboxModel");

//***************************************** pineapple paths ***************************************************************************
router.get('/', function (req, res, next) {
  Pinebox.find(function(error, result){
    if (error) {
      console.log(error);
    } else {
      console.log("server is"+ result);
      res.send(result);
    }//else
  })// find()
})///////////////////////////////////     getting all the pineapples ////////////////////////////////////////////////

router.post('/', function (req, res, next) {
  var p = new Pinebox(req.body);
  p.save(function(error, result){
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }//else
  });//save
}); ///////////////////////////////////// saving a new pineapple box ////////////////////////////////////////////////////

router.delete("/:id",function(req,res){
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
router.put('/:id', function(req, res, next) {
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
module.exports = router;
