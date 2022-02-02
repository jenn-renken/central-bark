import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const ADD_FRIEND = gql`
//   mutation addFriend($id: ID!) {
//     addFriend(friendId: $id) {
//       _id
//       username
//       friendCount
//       friends {
//         _id
//         username
//       }
//     }
//   }
// `;

export const ADD_PET= gql`
mutation addPet($petPersonality: String!, $petPreference: String!, $petBreed: String!, $name: String!, $image: String){
  addPet(petPersonality: $petPersonality, petPreference: $petPreference, petBreed: $petBreed, name: $name, image: $image) {
 
      pets {
        _id
        userId
        petPersonality
        petPreference
        petBreed
        name
        image
        createdAt
        commentCount
      comments {
        _id
      }

      }
  }
}
`;
  export const UPDATE_PET = gql`
  mutation updatePet($_id: ID!, $petPersonality: String!, $petPreference: String!, $petBreed: String!, $name: String!, $image: String){
    updatePet(_id:$_id, petPersonality: $petPersonality, petPreference: $petPreference, petBreed: $petBreed, name: $name, image: $image) {
   
      pets {
        _id
        userId
        petPersonality
        petPreference
        petBreed
        name
        image
        createdAt
        commentCount
        comments {
          _id
        }
      }
    }
  }
`;
export const REMOVE_PET = gql`
  mutation removePet($petId: ID!){
    removePet(petId: $petId) {
      pets {
        _id
        userId
        petPersonality
        petPreference
        petBreed
        name
        image
        createdAt
        commentCount
        comments {
          _id
        }
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($petId: ID!, $commentBody: String!) {
    addComment(petId: $petId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

