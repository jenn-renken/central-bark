import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PET } from '../utils/queries';
import '../../assets/css/index.css';
import Auth from '../utils/auth';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

// const PetDetail = props => {
  // const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_PET, {
    variables: { id: petId }
  });

  const pet = data?.pet || {};

  const PetDetail = ({ pets, title }) => {
    const { petId } = useParams();
    }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="columns is-multiline is-mobile">
    <div className="columns is-multiline is-mobile">
        <h3>{title}</h3>
        {pets &&
          pets.map((pet) => (
            <div className="column is-one-quarter">
            <div key={pet._id}>
              <div className="card ">
                <div className="card-image">
                  <figure className="image is-5by4">
                    <img
                      src={pet.image}
                      alt="Placeholder image"
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

                       <ul>
                        <li>Name: {pet.name}</li>
                        <li>Breed: {pet.petBreed}</li>
                        <li>Personality: {pet.petPersonality}</li>
                        <li>Pet Preferences: {pet.petPreference}</li>
                      </ul>
                    </div>
                    <div>
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
                  </div>
                </div>
              </div>
            </div>
            </div>
  ))}
    
  </div>
  </div>
  );
    

export default PetDetail;