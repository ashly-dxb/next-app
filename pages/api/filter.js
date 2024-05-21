// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// To access the API: http://localhost:3000/api/filter?counter=22

export default function zzzz(req, res) {
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "application/json");
  // res.end(JSON.stringify({ query: req.query }));

  // res.status(200).json({ query: req.query });

  // console.log("=====", req.body);
  res.status(200).json({ query: req.query });
}
