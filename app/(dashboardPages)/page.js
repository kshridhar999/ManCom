export default async function Home() {
  return (
    <div className='m-4 flex flex-auto flex-col items-center justify-center overflow-hidden text-wrap p-4 text-center'>
      <div className='bg-gradient-to-r from-orange-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent '>
        HI THERE, VISITOR
      </div>

      <div className='mt-8 text-xl font-light'>
        Thanks for visiting this website... This website is inteded to be used
        as learning playground for the developer. The developer plans on adding
        different features and optimizations to this site as time plays its
        course. <strong>Till then,</strong>
      </div>

      <div className='mt-8 text-xl font-light'>
        Feel free to navigate through the World Of{' '}
        <span className='text-4xl font-extralight text-stone-700'>
          World Wide Web
        </span>
        .
      </div>
    </div>
  );
}
