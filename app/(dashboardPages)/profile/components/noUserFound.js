import Link from "next/link";

export default function NoUserFound() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 flex-auto">
      <div className=" text-4xl font-extrabold">No User Found</div>
      <div className="text-2xl font-extralight">Return to Home or Sign in/Sign Up</div>
      <div className="flex space-x-4 pt-4">
        <Link href="/" className="p-2 bg-emerald-400 text-white rounded-md hover:shadow-md w-20 text-center align-middle">
                  Home
        </Link>
        <Link href="/sign_in" className="p-2 bg-emerald-400 text-white rounded-md hover:shadow-md w-20 text-center align-middle">
                  Sign In
        </Link>
        <Link href="/sign_up" className="p-2 bg-emerald-400 text-white rounded-md hover:shadow-md w-20 text-center align-middle">
                  Sign Up
        </Link>
    
      </div>
    </div>
  );
}