
import TopBar from "../common_components/top_bar";
import moment from "moment";
import { Paper } from "@mui/material";
import getUser from "../api/get_user";
import { startCase } from "../utils/stringFunctions";
import NoUserFound from "./components/noUserFound";
import ProfilePicForm from "./components/profilePicForm";

const getProfileInfo = ({user={}, key=""}) => {
  let returnKey = "";
  let returnVal = "";

  switch(key) {
  case "created_at":
    returnKey = "Joining Date";
    returnVal = moment(new Date(user.created_at)).format("DD MMM YYYY, hh:mm A");
    break;
  case "image_url":
    returnKey = "";
    returnVal = "";
    break;
  case "updated_at":
    returnKey = "";
    returnVal = "";
    break;
  case "id":
    returnKey = "";
    returnVal = "";
    break;
  default:
    returnKey = startCase(key);
    returnVal = user[key];
  }

  return {returnKey, returnVal};
};

const Profile = async ()=> {
  const user = await getUser() || {};
  const userFound = !!(user.id);

  return (
    <div>
      <TopBar userFound={userFound}/>
      {userFound ? <div className="p-4">
        <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">YOUR PROFILE</p>
        <Paper className="mt-8 p-2 border-2 rounded-lg flex space-x-2" elevation={3}>
          <ProfilePicForm userId={user.id} imgUrl={user.image_url}/>
          <div className="flex-1 flex space-y-2 flex-col">
            {Object.keys(user).map((key, ind)=> {
              const {returnKey, returnVal} = getProfileInfo({user, key});
              if(!returnKey && !returnVal) {
                return null;
              }
              return (
                <div className="flex justify-between items-center border-b-2 border-slate-400" key={ind}>
                  <p className="font-extralight text-2xl text-black">
                    {returnKey}
                  </p>
                  <p className="font-normal text-2xl text-black">
                    {returnVal}
                  </p>
                </div>
              );
            })}        
          </div>
        </Paper>
      </div>:
        <NoUserFound />
      }
    </div>
  );
};

export default Profile;