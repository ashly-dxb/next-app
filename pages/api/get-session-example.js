import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  //   const session = await getServerSession(req, res, authOptions);
  const session = await getServerSession(req, res, {});

  console.log("example1:", session);
  if (session) {
    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    res.status(401);
  }
  res.end();
}
