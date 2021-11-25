const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    films: [{ type: String }],
    tvShows: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Character = model("Character", characterSchema);

module.exports = Character;
