import Image from "next/image";
import ProfileBar from "./profile_bar";

function TopBar({userFound=true}) {
  // const router = useRouter();
  
  // const routeToPage = (page="")=> {
  //   if(page) {
  //     router.push(page);
  //   }
  // };
  
  return (
    <div className="h-12 bg-rose-500 flex justify-between p-4 shadow-md items-center">
      <Image src="/logo.png" alt="~" height={32} width={32}  />
      <div className="flex items-center space-x-4 text-2xl font-semibold text-slate-800">
        {/* <button className="p-2 hover:bg-slate-300 hover:text-white rounded-md" onClick={()=> routeToPage("/about")}>About</button> */}
        <ProfileBar userFound={userFound} />
      </div>
  
    </div>
  );
}
  
export default TopBar;