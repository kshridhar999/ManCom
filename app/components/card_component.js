// const dataSet = [
//   {
//     name: "John Doe",
//     location: "New York",
//     experience: "5 years",
//     field: "Software Development",
//     rating: 4.7,
//   },
//   {
//     name: "Jane Smith",
//     location: "San Francisco",
//     experience: "8 years",
//     field: "Data Science",
//     rating: 4.5,
//   },
//   {
//     name: "Michael Johnson",
//     location: "Los Angeles",
//     experience: "10 years",
//     field: "Marketing",
//     rating: 4.2,
//   },
//   {
//     name: "Emily Williams",
//     location: "Chicago",
//     experience: "6 years",
//     field: "Finance",
//     rating: 4.8,
//   },
//   {
//     name: "David Brown",
//     location: "Boston",
//     experience: "3 years",
//     field: "Human Resources",
//     rating: 3.9,
//   },
//   {
//     name: "Sarah Wilson",
//     location: "Miami",
//     experience: "7 years",
//     field: "Graphic Design",
//     rating: 4.6,
//   },
//   {
//     name: "Robert Millerfasdfasdfadf fsa dfasf",
//     location: "Dallas",
//     experience: "9 years",
//     field: "Project Management",
//     rating: 4.1,
//   },
//   {
//     name: "Olivia Davis",
//     location: "Seattle",
//     experience: "4 years",
//     field: "Research",
//     rating: 4.9,
//   },
//   {
//     name: "Daniel Martinez",
//     location: "Austin",
//     experience: "2 years",
//     field: "Customer Support",
//     rating: 3.5,
//   },
// ];

function CardComponent({ wo = {} }) {
  const abbrN = (wo.name || "").split(" ", 2);
  const newName =
    abbrN.length > 1 ? abbrN[0] + " " + abbrN[1][0] + "." : abbrN[0];
  return (
    <div className="rounded-md bg-cyan-100 flex h-fit">
      <div className="flex flex-col p-1">
        <div className="text-ellipsis overflow-hidden w-50 font-bold">
          {newName}
        </div>
        <div className="text-ellipsis overflow-hidden w-50">{wo.location}</div>
      </div>
      <div className="flex flex-col text-right p-1 font-light">
        <div>{wo.experience}</div>
        <div>{wo.rating} </div>
      </div>
    </div>
  );
}
export default CardComponent;