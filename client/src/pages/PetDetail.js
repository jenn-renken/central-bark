import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PET } from '../utils/queries';
import Auth from '../utils/auth';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const PetDetail = props => {
  const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_PET, {
    variables: { id: petId }
  });

  const pet = data?.pet || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div>

      <div className="media-content">
                      <p className="title is-4">{pet.name}</p>
                      <p className="subtitle is-6">{pet.petBreed}</p>
                    </div>

      <ul>
        <li>Name: {pet.name}</li>
        <li>Breed: {pet.petBreed}</li>
        <li>Personality: {pet.petPersonality}</li>
        <li>Pet Preferences: {pet.petPreference}</li>
      </ul>

      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {pet.username}
          </span>{' '}
          comment on {new Date(pet.createdAt).toLocaleString}
        </p>
        <div className="card-body">
          <p>{pet.petText}</p>
        </div>
      </div>

      {pet.commentCount > 0 && <CommentList comments={pet.comments} />}
      {Auth.loggedIn() && <CommentForm petId={pet._id} />}
    </div>
  );
};

export default PetDetail;