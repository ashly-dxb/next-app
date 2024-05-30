import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";
// import { cookie } from "cookie";
// import Cookies from "universal-cookie";
import { getCookie, setCookie } from "cookies-next";

// http://localhost:3000/api/users/login

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // const cookies = new Cookies(req.headers.cookie, {
  //   path: "/",
  //   expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  // });

  // console.log(cookies);
  // console.log("COOKIES IN LOGIN");

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
          res
            .status(200)
            .json({ success: false, message: "User does not exist" });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
          res
            .status(200)
            .json({ success: false, message: "Invalid email/password" });
        }

        const tokenData = {
          id: user._id,
          username: user.username,
          email: user.email,
        };

        // Create a token with expiration of 1 day
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });

        // Set the token as an HTTP-only cookie
        // response.cookies.set("token", token, { httpOnly: true });
        // res.setHeader("Set-Cookie", cookie.serialize("token", token));

        // cookies.set("my_access_token", token, {
        //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 180), // 180 days
        //   httpOnly: false,
        //   secure: true,
        //   sameSite: "None",
        // });

        const cookieOpt = {
          // expires: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
          maxAge: 180 * 24 * 60 * 60 * 1000,
          httpOnly: false,
          secure: false,
          sameSite: "None",
        };

        setCookie("my_access_token", token, cookieOpt);

        console.log("COOKIES RETRIEVED :: ", getCookie("my_access_token"));

        // Create a JSON response indicating successful login
        res.status(200).json({
          success: true,
          message: "Login successful",
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
