import moment from "moment-timezone";
import { Paper } from "@mui/material";
import getUser from "@/api/get_user";
import NoUserFound from "./components/noUserFound";
import ProfilePicForm from "./components/profilePicForm";
import { startCase } from "@/utils/stringFunctions";

const showOrder = [
  {key: "first_name", label: "First Name", value: (val)=> startCase(val)}, 
  {key: "last_name", label:"Last Name", value: (val)=> startCase(val)},
  {key: "email", label: "Email"},
  {key: "created_at", label: "Joining Date", value:(val)=> moment.utc(val).format("DD MMM YYYY, hh:mm A")}];

const getProfileInfo = (user={}) => {
  const fieldArr = [];
  console.log("created_at", user?.created_at);

  if(typeof user === "object") {
    showOrder.forEach((field)=> {
      if(field.key in user){
        fieldArr.push({key: field.key, label: field.label, value: field.value?.(user[field.key]) || user[field.key]});
      }
    });
  }

  return fieldArr;
};

const Profile = async ()=> {
  const user = await getUser() || {};
  const userFound = !!(user.id);
  const userInfo = getProfileInfo(user);

  return (
    <>
      {userFound ? <div className="p-4 flex-auto">
        <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">YOUR PROFILE</p>
        <Paper className="mt-8 p-2 border-2 rounded-lg flex space-x-2" elevation={3}>
          <ProfilePicForm userId={user.id} imgUrl={user.image_url} />
          <div className="grid grid-cols-3 items-start flex-auto gap-x-2 grid-rows-3 border-[1px] rounded-md border-violet-800">
            {userInfo.map((field)=> {
              return (
                <div className="p-2 shadow-md border-slate-400" key={field.key}>
                  <p className="text-md text-black font-light">
                    {field.label}
                  </p>
                  <p className="text-lg text-black font-medium">
                    {field.value}
                  </p>
                </div>
              );
            })}         
          </div>
        </Paper>
      </div>:
        <NoUserFound />
      }
    </>
  );
};

export default Profile;