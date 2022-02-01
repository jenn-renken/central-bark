import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PET, SINGLE_UPLOAD } from "../../utils/mutations";
import { QUERY_PETS, QUERY_PROFILE } from "../../utils/queries";

const emptyPetForm = 
  {
    name: "",
    petBreed: "",
    petPreference: "",
    petPersonality: "",
  }
const PetForm = () => {
  const [petForm, setPetForm] = useState({...emptyPetForm});
  const [characterCount, setCharacterCount] = useState(0);

const [image, setImage] = useState(null);

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

  const [singleUpload] = useMutation(SINGLE_UPLOAD);

  const handleChange = (event) => {
   setPetForm({...petForm, [event.target.name]: event.target.value});
  };

  const handleImageChange = (event) => {
    console.log("file[0]", event.target.files[0]);
    setImage(event.target.files[0])
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("image", image);
      const fileResult = await singleUpload({
        variables: {file: {...image}}
      });

      console.log("fileResult", fileResult);
      const result = await addPet({
        variables: { ...petForm },
      });
      const pets = result.addPet;
      const newPetId = pets[pets.length - 1]._id;
    
      console.log("result", result);
      console.log("image", image);

      setPetForm({...emptyPetForm});
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className= "box" encType="multipart/form-data" onSubmit={handleFormSubmit}>
      <h1>Enter your pet's info:</h1>
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
        <label className="label">Pet Photo</label>
        <div className="control">
          <input type="file" name="image" onChange={handleImageChange} />
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
