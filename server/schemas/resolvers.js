const { AuthenticationError } = require('apollo-server-express');
const { User, Pet } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profile: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('pets')
        //   .populate('friends');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('pets')
        // .populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        // .populate('friends')
        .populate('pets');
    },
    pets: async (parent, {userId}) => {
      const params = userId ? { userId } : {};
      return Pet.find(params);
      
    },
    pet: async (parent, { _id }) => {
      return Pet.findOne({ _id });
    },
  },
    //   if (context.user) {
    //     const _user = await User.findById(context.user);
    //     console.log(_user.savedPets)
    //     return _user.savedPets;
    //   }

    //    throw new AuthenticationError('You need to be logged in!');
    // },

  //   pet: async (parent, { _id }) => {
  //     return Pet.findOne({ _id });
  //   }
  // },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addPet: async (parent, args, context) => {
      if (context.user._id) {
        const pet = args;
        pet.userId = context.user._id
        const newPet = await Pet.create ( pet )
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { pets: newPet._id} },
          { new: true }
        );
        console.log(updatedUser)
        updatedUser.pets = await Pet.find({"_id":  { $in: updatedUser.pets }})

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    updatePet: async (parent, args, context) => {
      if(!context.user._id) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findById(
        { _id: context.user._id }
      );
      const petUpdate = args; 
      let pet = user.pets.find(p => p._id == petUpdate._id);
      if(!pet) {
        throw new AuthenticationError(`You don't own ${petUpdate.name}!`);
      }
      pet = { ...pet, ...petUpdate };
      const updatedPet = await Pet.updateOne ( {_id: pet._id}, {$set: pet} )
      console.log(updatedPet);
      user.pets = await Pet.find({"_id":  { $in: user.pets }})

      return user;
    },
    removePet: async (parent, args, context) => {
        if(context.user._id) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { pets: args.petId  } },
            { new: true }
        );
          await Pet.findByIdAndDelete(args.petId)
        return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { petId, commentBody }, context) => {
      if (context.user) {
        const updatedPet = await Pet.findOneAndUpdate(
          { _id: petId },
          { $push: { comments: { commentBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedPet;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
//     addFriend: async (parent, { friendId }, context) => {
//       if (context.user) {
//         const updatedUser = await User.findOneAndUpdate(
//           { _id: context.user._id },
//           { $addToSet: { friends: friendId } },
//           { new: true }
//         ).populate('friends');

//         return updatedUser;
//       }

//       throw new AuthenticationError('You need to be logged in!');
//     }
  }
};

module.exports = resolvers;