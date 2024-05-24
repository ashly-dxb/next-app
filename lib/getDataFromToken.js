import jwt from "jsonwebtoken";
// import { cookie } from "cookie";
import Cookies from "universal-cookie";

async function getDataFromToken(req, res) {
  //   const cookies = new Cookies(null, { path: "/" });
  const cookies = new Cookies(req.headers.cookie, { path: "/" });

  try {
    // Retrieve the token from the cookies
    // const token = req.cookies.get("token")?.value || "";

    // const cookieStore = cookies();
    // const token = cookieStore.get("token")?.value || "";

    // const token = req.cookies.token;

    const token = cookies.get("token");

    console.log("cookies read 111 !!!!!!!!!!!!", token);

    if (token !== "") {
      // Verify and decode the token using the secret key
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

      console.log("cookies read 222 !!!!!!!!!!!!", decodedToken);

      // Return the user ID from the decoded token
      return decodedToken.id;
    }

    console.log("cookies NOT read !!!!!!!!!!!!");
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default getDataFromToken;
