import { gql } from '@apollo/client';

export const QUERY_PETS = gql`
    query pets {
      pets {
        _id
        petPersonality
        petPreference
        petBreed
        name
        createdAt
        userId
  }
        
    }
`;

export const QUERY_PET = gql`
    query pet($id: ID!) {
        pet(_id: $id) {
            _id
            petPersonality
            petPreference
            petBreed
            name
            createdAt
            username
        }
    }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pets {
        _id
        petPersonality
        petPreference
        petBreed
        name
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      pets {
        _id
        petPersonality
        petPreference
        petBreed
        name
        createdAt
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
{ 
  me {
      _id
      username
      email
    }
  }
`