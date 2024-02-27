import Image from "next/image";
import ProfileBar from "./ProfileBar";
import getUser from "@/api/get_user";

async function TopBar() {
  let user = await getUser() || {};
  
  return (
    <nav className="h-12 bg-violet-400 flex justify-between p-4 shadow-md items-center sticky top-0">
      <Image src="/logo.png"
        alt="~"
        height={32}
        width={32}  />
      <div className="flex items-center space-x-4 text-2xl font-semibold text-slate-800">
        <ProfileBar user={user} />
      </div>
    </nav>
  );
}
  
export default TopBar;