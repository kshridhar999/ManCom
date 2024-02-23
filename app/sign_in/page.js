"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onSignIn } from "./actions/signIn";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { signInSchema } from "../input_configs";

const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-full mt-4 p-2 bg-emerald-500 text-white rounded-md hover:shadow-md hover:bg-emerald-700"
      type="submit"
      disabled={pending}
      variant="contained"
    >
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
};
const SignIn = () => {
  const router = useRouter();

  const handleSignIn = async (formData) => {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = signInSchema.safeParse(rawData);
    
    if (!validatedFields.success) {
      let errStr = "";
      Object.values(validatedFields.error.flatten().fieldErrors).forEach((error)=> {
        errStr += error + ", ";
      });
      toast.error(errStr);
      return;
    }
    const res = await onSignIn(formData) || {};
    
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
      <div className="w-96 p-4 flex flex-col justify-center align-center">
        <form
          className="shadow-md p-4 rounded-md bg-slate-100"
          action={handleSignIn}
        >
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="border-2 h-10 rounded-sm"
              autoComplete=""
            />
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="border-2 h-10 rounded-sm cursor-text"
              autoComplete=""
            />
          </div>
          <SignInButton />
        </form>

        <div className="flex justify-between py-2 items-center">
          <p>Don&apos;t have an account?</p>
          <Link
            href="/sign_up"
            className="p-2 bg-indigo-500 text-white rounded-md hover:shadow hover:bg-indigo-700 text-center align-middle"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
