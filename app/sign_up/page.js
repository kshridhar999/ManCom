"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onSignUp } from "./actions/signUp";

const SignUp = ()=> {
  const router = useRouter();

  const handleSignUp = async (formData) => {
    try {
      await onSignUp(formData);
      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  return (
    <div className="h-screen flex justify-center align-center bg-gradient-to-br from-sky-500 to-indigo-500">
      <div className="w-96 p-4 flex flex-col justify-center align-center">
        <form className="shadow-md p-4 rounded-md  bg-slate-100"  action={handleSignUp}>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" className="border-2 h-10 rounded-sm" autoComplete=""/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" className="border-2 h-10 rounded-sm" autoComplete=""/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="email">Email*</label>
            <input type="email" name="email" className="border-2 h-10 rounded-sm" autoComplete=""/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="password">Password*</label>
            <input type="password" name="password" className="border-2 h-10 rounded-sm cursor-text" autoComplete=""/>
          </div>
          <button className="w-full mt-4 p-2 bg-emerald-500 text-white rounded-md hover:shadow-md" type="submit">Sign Up</button>
        </form>

        <div className="flex justify-between py-2 items-center">
          <p>Already have an account?</p>
          <Link href="/sign_in" className="p-2 bg-slate-500 text-white rounded-md hover:shadow-md text-center align-middle">Sign In</Link>
        </div>
      </div>
    
    </div>
    
  );
};

export default SignUp;