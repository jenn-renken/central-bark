import React from "react";
import { Link } from "react-router-dom";
import '../../assets/css/index.css';

const PetGallery = ({ pets, title }) => {
  if (!pets.length) {
    return <h3>No Pets Yet</h3>;
  }

  return (
    
    <div className="section">
      <div className="section">
        <span className="subtitle is-4 is-justify-content-center">Make some new friends!</span>
      </div>

    <div className="columns is-multiline is-mobile">
      
        <h3>{title}</h3>
        {pets &&
          pets.map((pet) => (
            <div className="column is-one-third">
            <div key={pet._id}>
              <div className="card ">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={pet.image}
                      alt="image of a dog"
                    ></img>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img
                          src={require("../../assets/images/logo.png")}
                          alt="Placeholder image"
                        ></img>
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{pet.name}</p>
                      <p className="subtitle is-6">{pet.petBreed}</p>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    {/* <p>
                      <Link
                        to={`/profile/${pet.username}`}
                        style={{ fontWeight: 700 }}
                        className="text-light"
                      >
                        {pet.username}
                      </Link>{" "}
                    </p> */}
                    <div>
                      <Link to={`/pet/${pet._id}`}>
                        View Pet Details
                      </Link>
                    
                      {/* <ul>
                        <li>Name: {pet.name}</li>
                        <li>Breed: {pet.petBreed}</li>
                        <li>Personality: {pet.petPersonality}</li>
                        <li>Pet Preferences: {pet.petPreference}</li>
                      </ul> */}
                  
                    {/* <p className="mb-0">
                    Reactions: {pet.reactionCount} || Click to{' '}
                    {pet.reactionCount ? 'see' : 'start'} the discussion!
                  </p> */}
                  </div>
                </div>

              </div>
            </div>
          </div>
          </div>
        ))}
      

    </div>
    </div>
  );
};

export default PetGallery;
