"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { getURL } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileBar = ({userFound=true}) => {
  const router = useRouter();
  const currentUrl = getURL();
  const onProfilePage = (currentUrl || "").includes("profile");

  const [popoverVisible, setPopoverVisible] = useState(false);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if(userFound){
      const inter = setInterval(() => {
        setCounter((pv)=> pv += 1);
      }, 1000);
      return ()=> clearInterval(inter);
    }
  }, [userFound]);

  useEffect(() => {
    setCounter(()=> {
      const sessionStart = new Date(getCookie("session_created"));
      const curTime = new Date();
      return Math.floor((curTime.getTime() - sessionStart.getTime())/1000);
    });
  }, []);

  const logOut = ()=> {
    deleteCookie("session_id");
    deleteCookie("session_created");
    
    togglePopover();
    if(onProfilePage){
      router.push("/");
    }else{
      router.refresh();
    }
    
  };

  const togglePopover = () => {
    setPopoverVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="relative text-sm">
      <button onClick={togglePopover} className="focus:outline-none rounded-full bg-transparent truncate bg-white shadow-md">
        <Image src="/account.svg" alt="No Profile" height={32} width={32} />
      </button>

      <div
        className={`${
          popoverVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        } w-60 absolute right-0 top-12 mt-4 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">

          {userFound ? 
            <div className="flex flex-col justify-between">
              <div className="text-gray-700 flex justify-between items-center pb-2">
                <p className="text-gray-700 font-bold text-md">Time Active:
                </p> 
                <p className="text-gray-700 font-bold text-md ">
                  {counter > 1000 ? "> 1000" : counter} <span className="text-gray-700 font-normal text-sm">second{counter > 1 && "s"}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                {!onProfilePage ? <button
                  className="p-2 bg-emerald-500 text-white rounded-md hover:shadow-md w-20"
                  onClick={()=>router.push("/profile")}
                >
                    Profile
                </button> : <button
                  className="p-2 bg-emerald-500 text-white rounded-md hover:shadow-md w-20"
                  onClick={()=>router.push("/")}
                >
                    Home
                </button>}

                <button
                  className="p-2 bg-yellow-500 text-white rounded-md hover:shadow-md w-20"
                  onClick={logOut}
                >
                    Log Out
                </button>
              </div>
            </div>
            :
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-700">Existing User?</p>
                <button
                  className="p-2 bg-emerald-300 text-white rounded-md hover:shadow-md w-20"
                  onClick={() => router.push("/sign_in")}
                >
              Sign In
                </button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700 ">New User?</p>
                <button
                  className="p-2 bg-emerald-300 text-white rounded-md hover:shadow-md w-20"
                  onClick={() => router.push("/sign_up")}
                >
              Sign Up
                </button>
              </div></>}
          
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
