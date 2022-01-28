import React from "react";
import { Link } from "react-router-dom";

const PetGallery = ({ pets, title }) => {
  if (!pets.length) {
    return <h3>No Pets Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {pets &&
        pets.map((pet) => (
          <div key={pet._id} className="card ">
            <div className="card-image">
              <img
                src={require("../../assets/images/logo.png")}
                alt="Placeholder image"
              ></img>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img
                      src={require("../../assets/images/logo.png")}
                      alt="Placeholder image"
                    ></img>
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{pet.name}</p>
                  <p class="subtitle is-6">{pet.petBreed}</p>
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
                <div className="content">
                  <Link to={`/pet/${pet.userId}`}>
                    Connect with the pet parent!
                  </Link>

                  <ul>
                    <li>Name: {pet.name}</li>
                    <li>Breed: {pet.petBreed}</li>
                    <li>Personality: {pet.petPersonality}</li>
                    <li>Likes/Dislikes: {pet.petPreference}</li>
                  </ul>
                  {/* <p className="mb-0">
                  Reactions: {pet.reactionCount} || Click to{' '}
                  {pet.reactionCount ? 'see' : 'start'} the discussion!
                </p> */}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PetGallery;
