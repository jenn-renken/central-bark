import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "../utils/Files";
import { uploadFileMutation } from "../utils/mutations";



export const Upload = () => {
//useMutation hook, pass in uploadFileMutation
//destructured array -> getting back uploadFile function
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }]
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
    <h1>Hello test</h1>
  </div>
    // <div {...getRootProps()}>
    //   <input {...getInputProps()} />
    //   {isDragActive ? (
    //     <p>Drop the files here ...</p>
    //   ) : (
    //     <p>Drag 'n' drop some files here, or click to select files</p>
    //   )}
    // </div>
  );
};