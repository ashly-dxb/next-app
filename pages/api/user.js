// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// To access the API: http://localhost:3000/api/user

export default (req, res) => {
  res.status(200).json({ name: "John Doe", age: 28, city: "Dubai" });
};
