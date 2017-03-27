var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  gamesWon: Number,
  score: Number,
  achievementUnlocked: Boolean
 })
var player = mongoose.model("Player", PlayerSchema);
module.exports = player;
