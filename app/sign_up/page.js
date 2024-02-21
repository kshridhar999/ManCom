"use client";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";

const SignUp = ()=> {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control
  } = useForm();

  const onSignUp = async (data) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/sign_up_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if(!(result || {}).error){
        setCookie("session_id", result.token, {expires: new Date(result.expires_at)});
        setCookie("session_created", result.issued_at);
        
        router.push("/");
      }else{
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  return (
    <div className="h-screen flex justify-center align-center bg-gradient-to-br from-sky-500 to-indigo-500">
      <div className="w-96 p-4 flex flex-col justify-center align-center">
        <Form className="shadow-md p-4 rounded-md  bg-slate-100"  onSubmit={handleSubmit(onSignUp)} control={control}>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" className="border-2 h-10 rounded-sm" autoComplete="" {...register("first_name")}/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" className="border-2 h-10 rounded-sm" autoComplete="" {...register("last_name")}/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="email">Email*</label>
            <input type="email" name="email" className="border-2 h-10 rounded-sm" autoComplete="" {...register("email")}/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="password">Password*</label>
            <input type="password" name="password" className="border-2 h-10 rounded-sm cursor-text" autoComplete="" {...register("password")}/>
          </div>
          <button className="w-full mt-4 p-2 bg-emerald-500 text-white rounded-md hover:shadow-md" type="submit">Sign Up</button>
        </Form>

        <div className="flex justify-between py-2 items-center">
          <p>Already have an account?</p>
          <Link href="/sign_in" className="p-2 bg-slate-500 text-white rounded-md hover:shadow-md text-center align-middle">Sign In</Link>
        </div>
      </div>
    
    </div>
    
  );
};

export default SignUp;