"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { onFileUpload } from "../actions/uploadProfile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import "./styles.css";
import Image from "next/image";

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

export default function ProfilePicForm({imgUrl="", userId = ""}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(imgUrl || "/account.svg");

  const handleFileChange = (event) => {
    console.log("event: " + event);
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    setFile(event.target.files[0]);
  };

  const handleFormAction = async (formData) => {
    await onFileUpload(formData);
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file, imgUrl]);

  return (
    <div className="flex flex-col space-y-4">
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
      <div className="h-80 w-80 rounded-md bg-zinc-200 truncate">
        <Image src={preview} alt="No Profile" width={100} height={100}/>
      </div>
    </div>
  );
}