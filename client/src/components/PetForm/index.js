import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_PROFILE } from "../../utils/queries";

const emptyPetForm = 
  {
    name: "",
    petBreed: "",
    petPreference: "",
    petPersonality: ""
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

      // update profile object's cache, appending new thought to the end of the array
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
    <form className= "box" onSubmit={handleFormSubmit}>
      <h1>Enter your pet's info:</h1>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" name="name" placeholder="Name" value={petForm.name} onChange={handleChange}></input>
        </div>
      </div>
      <div class="field">
        <label class="label">Breed</label>
        <div class="control">
          <input class="input" type="text" name="petBreed" placeholder="Breed" value={petForm.petBreed} onChange={handleChange}></input>
        </div>
      </div>
      <div class="field">
        <label class="label">Personality</label>
        <div class="control">
          <textarea class="textarea" placeholder="Personality" name="petPersonality" value={petForm.petPersonality} onChange={handleChange}></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Pet Preferences</label>
        <div class="control">
          <textarea class="textarea" placeholder="Pet Preferences" name="petPreference" value={petForm.petPreference} onChange={handleChange}></textarea>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default PetForm;
