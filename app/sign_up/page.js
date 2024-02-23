"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onSignUp } from "./actions/signUp";
import toast from "react-hot-toast";
import {useFormStatus } from "react-dom";
import { signUpSchema } from "../input_configs";

const SignUpBotton = () => {
  const {pending } = useFormStatus();

  return (
    <button className="w-full mt-4 p-2 bg-emerald-500 text-white rounded-md hover:shadow-md" type="submit" disabled={pending}>Sign Up</button>
  );
};
const SignUp = ()=> {
  const router = useRouter();

  const handleSignUp = async (formData) => {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = signUpSchema.safeParse(rawData);
    
    if (!validatedFields.success) {
      let errStr = "";
      Object.values(validatedFields.error.flatten().fieldErrors).forEach((error)=> {
        errStr += error + ", ";
      });
      toast.error(errStr);
      return;
    }

    const res = await onSignUp(formData) || {};
    
    if("errors" in res) {
      toast.error(()=> {return (
        <ul>
          {res.errors?.map((err, ind) => (
            <li key={ind}>{err.message}</li>
          ))}
        </ul>);}
      );
    }else{
      router.push("/");
    }
  };
  return (
    <div className="h-screen flex justify-center align-center bg-gradient-to-br from-zinc-300 to-zinc-700">
      <div className="p-4 flex flex-col justify-center align-center">
        <form className="shadow-md p-4 rounded-md  bg-slate-100" action={handleSignUp}>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" className="border-2 h-10 rounded-sm" autoComplete=""/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" className="border-2 h-10 rounded-sm" autoComplete=""/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="email">Email<span className="text-red-500">*</span></label>
            <input type="email" name="email" className="border-2 h-10 rounded-sm" autoComplete=""/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="password">Password<span className="text-red-500">*</span></label>
            <input type="password" name="password" className="border-2 h-10 rounded-sm cursor-text" autoComplete="" />
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="confirm_password">Confirm Password<span className="text-red-500">*</span></label>
            <input type="password" name="confirm_password" className="border-2 h-10 rounded-sm cursor-text" autoComplete="" />
          </div>
          <SignUpBotton />
        </form>

        <div className="flex justify-between py-2 items-center">
          <p>Already have an account?</p>
          <Link href="/sign_in" className="p-2 bg-indigo-500 text-white rounded-md hover:shadow hover:bg-indigo-700 text-center align-middle">Sign In</Link>
        </div>
      </div>
    
    </div>
    
  );
};

export default SignUp;