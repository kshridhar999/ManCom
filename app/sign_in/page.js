"use client";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";

const SignIn = () => {
  const router = useRouter();

  const {handleSubmit, control, register} = useForm();

  const routeToPage = (page="")=> {
    if(page) {
      router.push(page);
    }
  };

  const onSignIn = async (data) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/sign_in_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if(!(result || {}).error){
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("user_info", JSON.stringify(result));

          const sessionCreation = new Date();

          localStorage.setItem("session_created", JSON.stringify(sessionCreation));
        }
        
        routeToPage("/");
      }else{
        console.log(result.error);
      }
      
    }catch(e){
      console.log(e);
    }
  };
  return (
    <div className="h-screen flex justify-center align-center bg-gradient-to-br from-sky-500 to-indigo-500">
      <div className="w-96 p-4 flex flex-col justify-center align-center">
        <Form className="shadow-md p-4 rounded-md  bg-slate-100"  onSubmit={handleSubmit(onSignIn)} control={control}>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="border-2 h-10 rounded-sm" autoComplete="" {...register("email")}/>
          </div>
          <div className="flex space-x-2 py-2 items-center justify-between">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="border-2 h-10 rounded-sm cursor-text" autoComplete="" {...register("password")}/>
          </div>
          <button className="w-full mt-4 p-2 bg-emerald-500 text-white rounded-md hover:shadow-md" type="submit">Sign In</button>
        </Form>

        <div className="flex justify-between py-2 items-center">
          <p>Don&apos;t have an account?</p>
          <button className="p-2 bg-slate-500 text-white rounded-md hover:shadow-md" onClick={()=> routeToPage("/sign_up")}>Sign Up</button>
        </div>
      </div>
    
    </div>
  );
};

export default SignIn;