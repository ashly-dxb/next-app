import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";

// http://localhost:3000/api/users/logout

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const response = res.json({
          message: "Logout successful",
          success: true,
        });

        response.cookies.set("token", "", {
          httpOnly: true,
          expires: new Date(0),
        });

        response;
      } catch (error) {
        res.json({ error: error.message }, { status: 500 });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
