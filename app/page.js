import getUser from "./api/get_user";
import TopBar from "./common_components/top_bar";

export default async function Home() {
  let user = await getUser() || {}; 

  const fname = String(user.first_name || "").toUpperCase();
  const lname = String(user.last_name || "").toUpperCase();
  
  return (
    <>
      <TopBar user={user}/>

      <div className="p-4 text-purple-200 bg-purple-600/30 rounded-md m-4 flex-auto">
        <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">HI THERE, {fname || lname || "VISITOR"}</div>

        <div className="mt-8 text-xl font-light">
        Thanks for visiting this website... This website is inteded to be used as learning playground for the developer. The developer plans on adding different features and optimizations to this site as time plays its course. <strong>Till then,</strong>
        </div>

        <div className="mt-8 text-xl font-light">
        Feel free to navigate through the World Of <span className="text-4xl text-amber-300 font-thin">World Wide Web</span>.
        </div>
      </div>
    </>
  );
}
