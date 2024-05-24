import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";
import getDataFromToken from "../../../lib/getDataFromToken";

// http://localhost:3000/api/users/profile

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // Extract user ID from the authentication token
        const userId = await getDataFromToken(req, res);

        console.log("getDataFromToken:::::", userId);

        // Find the user in the database based on the user ID
        const user = await Users.findOne({ _id: userId }).select("-password");

        res.json({
          message: "User found",
          data: user,
        });
      } catch (error) {
        res.json({ error: error.message }, { status: 400 });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
