import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_ME } from "../../utils/queries";

const PetForm = () => {
  const [thoughtText, setText] = useState("");
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

      // update me object's cache, appending new thought to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, pets: [...me.pets, addPet] } },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addPet({
        variables: { thoughtText },
      });

      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className= "box">
      <h1>Enter your pet's info:</h1>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name"></input>
        </div>
      </div>
      <div class="field">
        <label class="label">Breed</label>
        <div class="control">
          <input class="input" type="text" placeholder="Breed"></input>
        </div>
      </div>
      <div class="field">
        <label class="label">Personality</label>
        <div class="control">
          <textarea class="textarea" placeholder="Personality"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Likes/Dislikes</label>
        <div class="control">
          <textarea class="textarea" placeholder="Likes/Dislikes"></textarea>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PetForm;
