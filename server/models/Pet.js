const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    username:{
          type: String,
          required: true
        },
  petPersonality: {
    type: String,
    required: true,
  },
  petPreference: {
      type: String,
      required: true
  },
  petBreed: {
      type: String,
      required: true,
  },
  petId: {
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
  //add in when ready for comment!!!
  //don't forget to create commentSchema
//if time permits add "picture like" feature as well (virtual like count)
//   comments: [commentSchema]
// },
// {
//   toJSON: {
//     getters: true
//   }
// }
});

//do we need a pet model here?
const Pet = model('Pet', petSchema);

module.exports = petSchema;