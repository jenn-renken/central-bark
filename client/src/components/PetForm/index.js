import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_PROFILE } from "../../utils/queries";

const emptyPetForm = 
  {
    name: "",
    petBreed: "",
    petPreference: "",
    petPersonality: "",
    image: ""
  }
const PetForm = () => {
  const [petForm, setPetForm] = useState({...emptyPetForm});
  const [characterCount, setCharacterCount] = useState(0);

  const [addPet, { error }] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { pets } = cache.readQuery({ query: QUERY_PETS });
        cache.writeQuery({
          query: QUERY_PETS,
          data: { pets: [addPet, ...pets] },
        });
      } catch (e) {
        console.error(e);
      }

      const { profile } = cache.readQuery({ query: QUERY_PROFILE });
      cache.writeQuery({
        query: QUERY_PROFILE,
        data: { profile: { ...profile, pets: [...profile.pets, addPet] } },
      });
    },
  });

  const handleChange = (event) => {
   setPetForm({...petForm, [event.target.name]: event.target.value});
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPet({
        variables: { ...petForm },
      });

      setPetForm({...emptyPetForm});
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className= "box" encType="multipart/form-data" onSubmit={handleFormSubmit}>
      <p className="subtitle is-4">Enter your pet's info:</p>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" name="name" placeholder="Name" value={petForm.name} onChange={handleChange}></input>
        </div>
      </div>
      <div className="field">
        <label className="label">Breed</label>
        <div className="control">
          <input className="input" type="text" name="petBreed" placeholder="Breed" value={petForm.petBreed} onChange={handleChange}></input>
        </div>
      </div>
      <div className="field">
        <label className="label">Personality</label>
        <div className="control">
          <textarea className="textarea" placeholder="Personality" name="petPersonality" value={petForm.petPersonality} onChange={handleChange}></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">Pet Preferences</label>
        <div className="control">
          <textarea className="textarea" placeholder="Pet Preferences" name="petPreference" value={petForm.petPreference} onChange={handleChange}></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">Image URL</label>
        <div className="control">
          <input className="input" type="text" name="image" placeholder="image" value={petForm.image} onChange={handleChange}></input>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default PetForm;
