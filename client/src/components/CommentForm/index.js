import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ petId }) => {
  const [commentBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentBody, petId },
      });

      // clear form value
      setBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <p
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label className="label">Comment</label>
          <div className="control">
            <textarea
              placeholder="Leave a comment to this profil Pet..."
              value={commentBody}
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button className="button is-link " type="submit">
          Submit
        </button>
      </form>
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default CommentForm;
