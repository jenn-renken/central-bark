const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//  const petSchema = require('./Pet');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true

    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet'
      }
    ]
  //   savedPets: [petSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.virtual('petCount').get(function () {
//   return this.savedPets.length;
// });

const User = model('User', userSchema);

module.exports = User;