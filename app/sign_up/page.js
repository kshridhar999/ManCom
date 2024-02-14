"use client";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";

const SignUp = ()=> {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control
  } = useForm();

  const routeToPage = (page="")=> {
    if(page) {
      router.push(page);
    }
  };

  const onSignUp = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/sign_up_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You may need to include additional headers, such as authentication headers
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if(!(result || {}).error){
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("user_info", JSON.stringify(result));
          const sessionCreation = new Date();

          localStorage.setItem("session_created", JSON.stringify(sessionCreation));
        }
        
        console.log("User created with id" + result.id);
        routeToPage("/");
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
          <button className="p-2 bg-slate-500 text-white rounded-md hover:shadow-md" onClick={()=> routeToPage("/sign_in")}>Sign In</button>
        </div>
      </div>
    
    </div>
    
  );
};

export default SignUp;