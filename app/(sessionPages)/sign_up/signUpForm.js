"use client";

import { useRouter } from "next/navigation";
import { onSignUp } from "./actions/signUp";
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { signUpSchema } from "@/app/inputConfigs";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { Controller, useForm, Form } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

const userTypes = {
  customer: {long_label: "Friend In Need", short_label: "(Customer)"},
  service_provider: {long_label: "Friend Indeed", short_label:"(Service Provider)"}
};

const UserType = ({control, setValue, errors}) => {
  
  return (
    <div className="flex space-x-2 flex-auto">
      <div className="self-center flex flex-col justify-center">
        <Controller
          name="user_type"
          control={control}
          render={({ field }) => (
            <ButtonGroup>
              {Object.keys(userTypes).map((type) => {
                return (
                  <Button
                    key={type}
                    className={`flex-1 text-white ${field.value === type ? "bg-indigo-700 pointer-events-none": "bg-zinc-500 hover:bg-zinc-700"}`}
                    onClick={() => {
                      setValue("user_type", type);
                    }}
                  >
                    <div>
                      <strong>{userTypes[type].long_label}</strong>
                      <p>{userTypes[type].short_label}</p>
                    </div>  
                  </Button>
                );
              })}
            </ButtonGroup>
           
          )}
        />
        <p className={`${errors?.user_type?.message ? "visible": "hidden"} text-[10px] text-red-700`}>{errors?.user_type?.message}</p>
      </div>
      
    </div>
    
  );
};

const GeneralFields = ({register, errors}) => {
  return (
    <>
      <div className="flex space-x-2 items-center justify-between">
        <label htmlFor="first_name">First Name</label>
        <div className="h-10">
          <input type="text"
            className="border-2 h-10 rounded-lg p-2 focus:outline-none"
            {...register("first_name")}/>
          <p className={`${errors?.first_name?.message ? "visible": "hidden"} text-[10px] text-red-700`}>{errors?.first_name?.message}</p>
        </div>
      </div>
      <div className="flex space-x-2 items-center justify-between">
        <label htmlFor="middle_Name">Middle Name</label>
        <div className="h-10">
          <input type="text"
            className="border-2 h-10 rounded-lg p-2 focus:outline-none"
            {...register("middle_name")}/>
          <p className={`${errors?.middle_name?.message ? "visible": "hidden"} text-[10px] text-red-700`}>{errors?.middle_name?.message}</p>
        </div>
      </div>
      <div className="flex space-x-2 items-center justify-between">
        <label htmlFor="last_name">Last Name</label>
        <div className="h-10">
          <input type="text"
            className="border-2 h-10 rounded-lg p-2 focus:outline-none"
            {...register("last_name")}/>
          <p className={`${errors?.last_name?.message ? "visible": "hidden"} text-[10px] text-red-700`}>{errors?.last_name?.message}</p>
        </div>
      </div>
      <div className="flex space-x-2 items-center justify-between">
        
        <label htmlFor="email">Email<span className="text-red-500">*</span></label>
        <div className="h-10">
          <input type="email"
            className="border-2 h-10 rounded-lg p-2 focus:outline-none"
            {...register("email")}/>
          <p className={`${errors?.email?.message ? "visible": "hidden"} text-[10px] text-red-700`}>{errors?.email?.message}</p>
        </div>
        
      </div>
    </>
  );
};

const PasswordFields = ({register, errors={}}) => {

  return (
    <div className="flex-auto flex flex-col justify-evenly">
      <div className="flex space-x-2 items-center justify-between">
        <label htmlFor="password">Password<span className="text-red-500">*</span></label>
        <div className="h-10">
          <input type="password"
            className="border-2 h-10 rounded-lg p-2 focus:outline-none"
            {...register("password")} />
          <p className={`${errors?.password?.message ? "visible": "hidden"} text-[10px] text-red-700`}>{errors?.password?.message}</p>
        </div>
      </div>
      <div className="flex space-x-2 items-center justify-between">
        <label htmlFor="confirm_password">Confirm Password<span className="text-red-500">*</span></label>
        <div>
          <input type="password"
            className="border-2 h-10 rounded-lg p-2 focus:outline-none"
            {...register("confirm_password")} />
          <p className={`${errors?.confirm_password?.message ? "visible": "hidden"} text-[10px] text-red-700`}>{errors?.confirm_password?.message}</p>
        </div>
      </div>
    </div>
  );
};

const formStateComponent = [
  {Component: UserType, fields:["user_type"]},
  {Component: GeneralFields, fields:["first_name", "middle_name", "last_name", "email"]},
  {Component: PasswordFields},
]; 

const SignUpBotton = () => {
  const {pending } = useFormStatus();
  
  return (
    <Button className=" bg-green-500 hover:bg-green-700 text-white" type="submit" disabled={pending}>Sign Up</Button>
  );
};

const SignUpForm = () => {
  const router = useRouter();
  
  const [formState, setFormState] = useState(0);
  const prevPossible = formState > 0;
  const nextPossible = formState < formStateComponent.length-1;
  const {trigger, formState:{errors}, register, handleSubmit, control, setValue, clearErrors} = useForm({resolver: zodResolver(signUpSchema)});
  const {Component: FormStateComponent} = formStateComponent[formState];

  const goBack = ()=> {
    clearErrors();
    setFormState(formState-1);
  };

  const goForward =async ()=> {
    const checkField = await trigger(formStateComponent[formState].fields, {shouldFocus: true});
    if(!checkField) return;

    setFormState(formState+1);
  };

  const handleSignUp = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

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
      router.push("/dashboard");
    }
  };

  return (
    <Form className="flex flex-col space-y-4 w-80 h-80 justify-between" onSubmit={handleSubmit(handleSignUp)} control={control}>
      <FormStateComponent register={register}
        errors={errors}
        control={control}
        setValue={setValue}/>
      <div className="flex flex-row-reverse space-x-2 justify-between w-full">
        {nextPossible ? <Button onClick={()=> goForward()} className="bg-green-500 hover:bg-green-700 text-white">Next</Button>:
          <SignUpBotton />}
        {prevPossible && <Button onClick={()=> goBack()} className="bg-amber-300 hover:bg-amber-700 text-white">Back</Button>}
        
      </div>
    </Form>
  );
};

export default SignUpForm;