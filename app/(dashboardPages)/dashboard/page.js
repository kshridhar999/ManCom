import getUser from "@/app/api/get_user";
import { redirect } from "next/navigation";

export default async function Dashboard(){
  const user = await getUser() || {};
  console.log("user", user);

  if(!user.id){
    redirect("/sign_in");
  }

  return <div className="flex-auto">
        Dashboard
  </div>;
}