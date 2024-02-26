"use client";
import Link from "next/link";
import SignInForm from "./signInForm";
import { Divider } from "@mui/material";

const SignIn = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-300 to-zinc-700 h-screen w-screen flex justify-center items-center">
      <div className="w-96 p-4 shadow-md rounded-md bg-slate-100 flex flex-col space-y-4">
        <text 
          className="text-2xl font-black bg-gradient-to-br from-stone-300 to-stone-800 text-transparent bg-clip-text text-center"
        >Sign In</text>
        <Divider variant="middle" />
        <SignInForm />
        <div className="flex justify-between items-center self-end space-x-2">
          <p>Don&apos;t have an account?</p>
          <Link
            href="/sign_up"
            className="text-indigo-500 hover:text-indigo-700 underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
