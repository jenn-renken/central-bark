import React from 'react';
import { Link } from 'react-router-dom';

const PetGallery = ({ pets, title }) => {
  if (!pets.length) {
    return <h3>No Pets Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {pets &&
        pets.map(pet => (
          <div key={pet._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${pet.username}`}
                style={{ fontWeight: 700 }}
                className='text-light'
                >
                  {pet.username}
                </Link>{' '}
              pet on {pet.createdAt}
            </p>
            {/* <div className="card-body">
              <Link to={`/pet/${pet._id}`}>
                <p>{pet.petText}</p>
                <p className="mb-0">
                  Reactions: {pet.reactionCount} || Click to{' '}
                  {pet.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div> */}
          </div>
        ))}
    </div>
  );
};

export default PetGallery;