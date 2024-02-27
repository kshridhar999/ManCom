import Link from "next/link";
import SignUpForm from "./signUpForm";
import { Divider } from "@mui/material";

const SignUp = ()=> {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-zinc-300 to-zinc-700">
      <div className="p-4 rounded-md flex flex-col shadow-md bg-slate-100 space-y-4">
        <text className="text-2xl font-black bg-gradient-to-br from-stone-300 to-stone-800 text-transparent bg-clip-text text-center">Sign Up</text>
        <Divider variant="middle"/>
        <SignUpForm />

        <div className="flex justify-between items-center self-end space-x-2">
          <p>Already have an account?</p>
          <Link href="/sign_in" className=" text-indigo-500 hover:text-indigo-700 underline">Sign In</Link>
        </div>
        
      </div>
    
    </div>
    
  );
};

export default SignUp;