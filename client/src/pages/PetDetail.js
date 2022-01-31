import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PET } from '../utils/queries';
import Auth from '../utils/auth';

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
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {pet.username}
          </span>{' '}
          pet on {pet.createdAt}
        </p>
        <div className="card-body">
          <p>{pet.petText}</p>
        </div>
      </div>

      {/* {pet.reactionCount > 0 && <ReactionList reactions={pet.reactions} />}
      {Auth.loggedIn() && <ReactionForm petId={pet._id} />} */}
    </div>
  );
};

export default PetDetail;