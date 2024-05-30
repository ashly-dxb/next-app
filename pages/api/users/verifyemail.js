import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // It extracts the token property from the JSON body of the incoming request.
        const { token } = req.body;

        const user = await Users.findOne({
          verifyToken: token,
          verifyTokenExpiry: { $gt: Date.now() },
        });

        console.log("User by token: ", user);

        if (!user) {
          return res
            .status(200)
            .json({ success: false, message: "Invalid token" });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const savedUser = await user.save();

        res.status(200).json({
          message: "Email verified successfully",
          success: true,
          savedUser,
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
