var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PineboxSchema = new Schema({
  color: String,
  selected: Boolean
 })

 var pinebox = mongoose.model("Pinebox", PineboxSchema);
 module.exports = pinebox;
