const { Schema, model } = require("mongoose");
const commentSchema = require('./Comment');

const petSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true,
  // },
  userId: {
    type: String,
    required: true
  },
  petPersonality: {
    type: String,
    required: true,
  },
  petPreference: {
    type: String,
    required: true,
  },
  petBreed: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  //if time permits add "picture like" feature as well (virtual like count)
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

petSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Pet = model('Pet', petSchema);

module.exports = Pet;

