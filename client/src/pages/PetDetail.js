import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PET } from "../utils/queries";
import Auth from "../utils/auth";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
// import '../../assets/css/index.css';

const PetDetail = (props) => {
  const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_PET, {
    variables: { id: petId },
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
      <div className="column is-half">
        <div className="card">
          <div className="card-image">
            <div className="media-left">
              <figure className="image is-4by3">
                <img src={pet.image} alt="image of a dog"></img>
              </figure>
            </div>
          </div>
        </div>

        <div className="card-content">
          {/* <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {pet.username}
          </span>{' '}
          Pet Detail {new Date(pet.createdAt).toLocaleString}
        </p> */}
          {/* <div className="media-content">
           <p className="title is-4">{pet.name}</p>
           <p className="subtitle is-6">{pet.petBreed}</p>
          </div> */}
          <ul>
            <li>Name: {pet.name}</li>
            <li>Breed: {pet.petBreed}</li>
            <li>Personality: {pet.petPersonality}</li>
            <li>Pet Preferences: {pet.petPreference}</li>
          </ul>
          <div className="card-body">
            <p>{pet.petText}</p>
          </div>
          <form class="edit-post-form">
            {/* <div>
      <input
        name="edit-pet"
        class="input is-link"
        type="text"
        value="{{post.petDetail}}"
      />
    </div> */}
            <div class="is-flex is-justify-content-space-between">
              <button class="button is-primary" type="submit">
                Edit Pet
              </button>
              <button
                id="delete-post-btn"
                class="button is-danger"
                type="button"
              >
                Delete Pet
              </button>
            </div>
          </form>
        </div>
        <div className="card-content">
          {pet.commentCount > 0 && <CommentList comments={pet.comments} />}
          {Auth.loggedIn() && <CommentForm petId={pet._id} />}
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
