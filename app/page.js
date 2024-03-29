
"use client";

import TopBar from "./components/top_bar";

// import { useRouter } from "next/navigation";

const Greetings = ({user={}})=> {
  const fname = String(user.first_name || "").toUpperCase();
  const lname = String(user.last_name || "").toUpperCase();
  return (
    <div  className="p-4">
      <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">HI THERE, {fname || lname || "VISITOR"}</div>

      <div className="mt-8 text-xl font-light">
        Thanks for visiting this website... This website is inteded to be used as learning playground for the developer. The developer plans on adding different features and optimizations to this site as time plays its course. <strong>Till then,</strong>
      </div>

      <div className="mt-8 text-lg font-light">
        Feel free to navigate through the World Of <span className="text-3xl text-fuchsia-800 font-extralight">World Wide Web</span>.
      </div>
    </div>
  );
};
export default function Home() {
  let user = {}; 
  if (typeof window !== "undefined" && window.localStorage) {
    user = JSON.parse(localStorage.getItem("user_info")) || {};
  }
  const userFound = !!(user || {}).id;
  
  return (
    <div>
      <TopBar userFound={userFound}/>

      <Greetings user={user}/>
    </div> 
  );
}
