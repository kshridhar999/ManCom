export default async function Home() {
  
  return (
    <div className="m-4 flex-auto p-4 text-slate-600 text-center overflow-hidden text-wrap flex flex-col justify-center items-center">
      <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r to-indigo-500 from-orange-500 ">HI THERE, VISITOR</div>

      <div className="mt-8 text-xl font-light">
  Thanks for visiting this website... This website is inteded to be used as learning playground for the developer. The developer plans on adding different features and optimizations to this site as time plays its course. <strong>Till then,</strong>
      </div>

      <div className="mt-8 text-xl font-light">
  Feel free to navigate through the World Of <span className="text-4xl text-stone-700 font-extralight">World Wide Web</span>.
      </div>
    </div>
  );
}
