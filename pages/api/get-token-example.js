/*
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });

  if (token) {
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  } else {
    res.status(401);
  }
  res.end();
}

*/
