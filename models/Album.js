const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: { type: String },
  owner: { type: String },
});

module.exports = mongoose.model("Albums", AlbumSchema);
