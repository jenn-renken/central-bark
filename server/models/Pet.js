const { Schema, model } = require("mongoose");

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

const Pet = model('Pet', petSchema);

module.exports = Pet;

// in Pet.js, update to a model instead of just a schema, add a userId field with the proper datatype for a mongo object id;
// in addPet,
  // first create a new Pet object using the args for the pet info, and context.user._id for the userId field.
  // get the _id field from the newly returned pet, and push it to the savedPets property of the relevant user.
// in removePet,
  // first pull the relevant id from the user's savedPets property.
  // delete the Pet object.