"use client";
import { IconButton } from "@mui/material";
import { getCookie } from "cookies-next";
import { getURL } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "./actions/logout";

const ProfileBar = ({user={}}) => {
  const router = useRouter();
  const currentUrl = getURL();
  const onProfilePage = (currentUrl || "").includes("profile");

  const [popoverVisible, setPopoverVisible] = useState(false);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if(user?.id){
      const inter = setInterval(() => {
        setCounter((pv)=> pv += 1);
      }, 1000);
      return ()=> clearInterval(inter);
    }
  }, [user?.id]);

  useEffect(() => {
    setCounter(()=> {
      const sessionStart = new Date(getCookie("session_created"));
      const curTime = new Date();
      return Math.floor((curTime.getTime() - sessionStart.getTime())/1000);
    });
  }, []);

  const onLogOut = ()=> {
    logout();

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
      <IconButton onClick={togglePopover} size="small" sx={{height:"32px", width:"32px", borderRadius:"50%", overflow:"hidden"}}>
        <Image src={user?.image_url || "/account.svg"}
          alt="No Profile"
          height={32}
          width={32} />
      </IconButton>
      
      <div
        className={`${
          popoverVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        } w-60 absolute right-0 top-6 mt-4 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">

          {user?.id ? 
            <div className="flex flex-col justify-between">
              <div className="text-gray-700 flex justify-between items-center pb-2">
                <p className="text-gray-700 font-bold text-md">Time Active:
                </p> 
                <p className="text-gray-700 font-bold text-md ">
                  {counter > 1000 ? "> 1000" : counter} <span className="text-gray-700 font-normal text-sm">second{counter > 1 && "s"}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                 
                <Link href={!onProfilePage ? "/profile" : "/"} className="p-2 bg-emerald-500 text-white rounded-md hover:shadow-md w-20 text-center align-middle" >{!onProfilePage ? "Profile": "Home"}</Link>

                <button
                  className="p-2 bg-yellow-500 text-white rounded-md hover:shadow-md w-20"
                  onClick={onLogOut}
                >
                    Log Out
                </button>
              </div>
            </div>
            :
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-700">Existing User?</p>
                <Link href="/sign_in" className="p-2 bg-emerald-300 text-white rounded-md hover:shadow-md w-20 text-center align-middle">
              Sign In
                </Link>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-700 ">New User?</p>
                <Link href="/sign_up" className="p-2 bg-emerald-300 text-white rounded-md hover:shadow-md w-20 text-center align-middle">
              Sign Up
                </Link>
              </div></>}
          
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
