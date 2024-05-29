// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// To access the API: http://localhost:3000/api/userlist

export default function xyz(req, res) {
  res.status(200).json([
    { name: "John Doeio", age: 28, place: "Dubai" },
    { name: "Mary Carer", age: 35, place: "New york" },
    { name: "Stev Carte", age: 41, place: "London" },
  ]);
}
