"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { onFileUpload } from "../actions/uploadProfile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import "./styles.css";
import toast from "react-hot-toast";
import {useFormStatus} from "react-dom";

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

const UploadButton = ()=> {
  const {pending} = useFormStatus();
  return (
    <Button
      type="submit"
      variant="contained"
      size="small"
      disabled={pending}
    >
           Upload{pending && "ING..."}
    </Button>
  );
};
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
      setPreview("");
      setFile(null);
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
          <VisuallyHiddenInput type="file"
            accept=".jpg,.jpeg,.png"
            name='file'
            onChange={handleFileChange}/>
        </Button>

        <VisuallyHiddenInput type="hidden" name='id' value={userId}/>
        {file && <UploadButton />
        }
      </form>
      <div className="relative rounded-md bg-zinc-200 shadow-md flex w-80 h-80 truncate">
        <div className="flex-shrink-0" id={!preview? "original" : "after_preview"}>
          <img src={imgUrl || "/account.svg"} alt="Original" className="object-cover w-full h-full" />
        </div>
        <div className="flex-shrink-0" id={preview? "show_preview" : "hide_preview"}>
          <img src={preview} alt="Preview" className="object-cover w-full h-full border-l-4 border-dashed border-indigo-700" />
        </div>
      </div>
    </div>
  );
}