const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  albumId: {
    ref: "Albums",
    type: Schema.Types.ObjectId,
  },
  title: { type: String },
  url: { type: String },
  thumbnailUrl: { type: String },
  owner: {
    ref: "Users",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Photos", PhotoSchema);
