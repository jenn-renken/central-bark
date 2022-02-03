import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PET, QUERY_PROFILE, QUERY_PETS } from "../utils/queries";
import { REMOVE_PET } from "../utils/mutations";
import Auth from "../utils/auth";
import EditForm from '../components/EditForm';
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const PetDetail = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { petId } = useParams();
  const [removePet, { error }] = useMutation(REMOVE_PET, {
    update(cache, { data: { removePet } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { pets } = cache.readQuery({ query: QUERY_PETS });
        cache.writeQuery({
          query: QUERY_PETS,
          data: { pets: [removePet, ...pets] },
        });
      } catch (e) {
        console.error(e);
      }

      const { profile } = cache.readQuery({ query: QUERY_PROFILE });
      cache.writeQuery({
        query: QUERY_PROFILE,
        data: { profile: { ...profile, pets: [...profile.pets, removePet] } },
      });
    },
  });

  const { loading, data } = useQuery(QUERY_PET, {
    variables: { id: petId },
  });

  const pet = data?.pet || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRemovePet = async (event) => {
    if (!window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      return 
    }
    try {
      await removePet({
        variables: { petId },
      });
    window.alert(`${pet.name} deleted`)
    window.location.href="/profile"
    } catch (e) {
      console.error(e);
    } 
  }

  return (
    <div className="content-is-centered">
      <div className="section">
        <p className="title is-2 has-text-link">{pet.name}</p>
      </div>
      <div className="column is-three-quarters">
        <div className="card">
          <div className="card-image">
            <div className="media-left">
              <figure className="image is-256x256">
                <img src={pet.image} alt="image of a dog"></img>
              </figure>
            </div>
          </div>
        </div>

        <div className="card-content">
          <ul>
            <li>Name: {pet.name}</li>
            <li>Breed: {pet.petBreed}</li>
            <li>Personality: {pet.petPersonality}</li>
            <li>Pet Preferences: {pet.petPreference}</li>
          </ul>
          <div className="card-body">
            <p>{pet.petText}</p>
          </div>
          {!isEditing && Auth.loggedIn() && Auth.getProfile().data._id == pet.userId &&
            <form className="edit-post-form">
              <div className="is-flex is-justify-content-space-between">
                  <button className="button is-primary" type="button" onClick={() => setIsEditing(true)}>
                    Edit Pet 
                  </button>
                  <button
                    id="delete-post-btn"
                    className="button is-danger"
                    type="button"
                    onClick={handleRemovePet}
                  >
                    Delete Pet
                  </button>
              </div>
            </form>
          }
          {isEditing && <EditForm pet={pet} setIsEditing={setIsEditing}></EditForm>}
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
