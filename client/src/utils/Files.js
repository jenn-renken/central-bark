//frontend to display uploaded images
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

export const filesQuery = gql`
  {
    files
  }
`;

export const Files = () => {
  const { data, loading } = useQuery(filesQuery);
//wait for loading to finish
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {/* loop through each file and display image */}
      {data.files.map(x => (
        <img
          style={{ width: 200 }}
          key={x}
          // path to image
          src={`http://localhost:4000/images/${x}`}
          alt={x}
        />
      ))}
    </div>
  );
};