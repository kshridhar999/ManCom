import Image from "next/image";
import ProfileBar from "./profile_bar";

function TopBar({user={}}) {

  return (
    <nav className="h-12 bg-slate-200 flex justify-between p-4 shadow-md items-center sticky top-0 z-50">
      <Image src="/logo.png" alt="~" height={32} width={32}  />
      <div className="flex items-center space-x-4 text-2xl font-semibold text-slate-800">
        <ProfileBar user={user} />
      </div>
    </nav>
  );
}
  
export default TopBar;