
"use client";
import Image from "next/image";
import TopBar from "../components/top_bar";
import moment from "moment";

const Profile = ()=> {
  let user = {}; 
  if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem("user_info")) || {};
  }
  const userFound = !!((user || {}).id);
  const fname = String(user.first_name || "").toUpperCase();
  const lname = String(user.last_name || "").toUpperCase();
  const joiningDate = new Date(user.created_at);

  const joiningStr = moment(joiningDate).format("DD MMM YYYY, hh:mm A");

  return (
    <div>
      <TopBar userFound={userFound}/>
      <div className="p-4">
        <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">YOUR PROFILE</p>
        <div className="mt-8 p-2 border-2 rounded-lg shadow-2xl bg-orange-200 flex space-x-2">
          <div className="w-80 h-80 rounded-md bg-zinc-500 truncate">
            <Image src="/account.svg" alt="No Profile" height={100} width={100}/>
          </div>
          <div className="flex-1 flex space-y-2 flex-col">
            <div className="flex justify-between items-center border-b-2 border-slate-400">
              <p className="font-extralight text-2xl text-black">
          First Name:
              </p>
              <p className="font-normal text-2xl text-black">
                {fname || "-"}
              </p>
            </div>
        
            <div className="flex justify-between items-center border-b-2 border-slate-400">
              <p className="font-extralight text-2xl text-black">
          Last Name:
              </p>
              <p className="font-normal text-2xl text-black">
                {lname || "-"}
              </p>
            </div>

            <div className="flex justify-between items-center border-b-2 border-slate-400">
              <p className="font-extralight text-2xl text-black">
          Email:
              </p>
              <p className="font-normal text-2xl text-black">
                {user.email || "-"}
              </p>
            </div>

            <div className="flex justify-between items-center border-b-2 border-slate-400">
              <p className="font-extralight text-2xl text-black">
          Date Joined:
              </p>
              <p className="font-normal text-2xl text-black">
                {joiningStr}
              </p>
            </div>
        
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Profile;