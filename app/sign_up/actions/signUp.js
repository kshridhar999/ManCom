"use server";

import { cookies } from "next/headers";

export const onSignUp = async (formData) => {
  const reqObj = {};
  for (const pair of formData.entries()) {
    reqObj[pair[0]]= pair[1];
  }
 
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/sign_up_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqObj),
  });
  const result = await res.json();

  if(!(result || {}).error){
    cookies().set("session_id", result.token, {expires: new Date(result.expires_at)});
    cookies().set("session_created", result.issued_at);
  }else{
    throw new Error(result.error);
  }
  
};