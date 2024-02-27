"use server";
import { getError, isErrorful } from "@/utils/responseFunctions";

import { cookies } from "next/headers";

export const onSignIn = async (formData) => {
  const reqObj = Object.fromEntries(formData.entries());
 
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/sign_in_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqObj),
  });
  const result = await res.json();

  if(!isErrorful(result)){
    cookies().set("session_id", result.token, {expires: new Date(result.expires_at)});
    cookies().set("session_created", result.issued_at);
  }else{
    return getError(result);
  }
  
};