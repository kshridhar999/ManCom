import Image from "next/image";
import ProfileBar from "./ProfileBar";
import getUser from "@/api/get_user";

async function TopBar() {
  let user = await getUser() || {};
    
  return (
    <nav className="h-12 flex justify-between p-4 border-b-[1px] border-slate-500 shadow items-center sticky top-0">
      <Image src="/logo.png"
        alt="~"
        height={32}
        width={32}  />
      <div className="flex items-center space-x-4 text-2xl font-semibold text-slate-800">
        <ProfileBar user={user}/>
      </div>
    </nav>
  );
}
  
export default TopBar;