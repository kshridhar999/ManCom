"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { onFileUpload } from "../actions/uploadProfile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import "./styles.css";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function ProfilePicForm({ userId = "", imgUrl = ""}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    setFile(event.target.files[0]);
  };

  const handleFormAction = async (formData) => {
    try{
      await onFileUpload(formData);
      toast.success("Profile picture changed successfully!");
    }catch(e){
      toast.error("Error uploading profile picture: " + e.message);
    }
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="flex flex-col space-y-2">
      <form action={handleFormAction} className="flex space-x-2 self-center">
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          {file || imgUrl ? "Change" : "Upload Picture"}
          <VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png" name='file' onChange={handleFileChange}/>
        </Button>

        <VisuallyHiddenInput type="hidden" name='id' value={userId}/>
        {file && 
          <Button
            type="submit"
            variant="contained"
            size="small"
          >
           Upload
          </Button>}
      </form>
      <div className="rounded-md bg-zinc-200 shadow-md flex w-80 h-80 truncate">
        {preview ? (
          <>
            <div className="flex-shrink-0 w-1/2 blur-sm">
              <img src={imgUrl || "/account.svg"} alt="Original" className="object-cover w-full h-full" />
            </div>
            <div className="flex-shrink-0 w-1/2 shadow-md">
              <img src={preview} alt="Preview" className="object-cover w-full h-full border-l-4 border-dashed border-indigo-700" />
            </div>
          </>
        ) : (
          <img src={imgUrl || "/account.svg"} alt="Original" className="object-contain w-full h-full" />
        )}
      </div>
    </div>
  );
}