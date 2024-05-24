import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";

export async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // It extracts the token property from the JSON body of the incoming request.
        const { token } = req.body;

        const user = await Users.findOne({
          verifyToken: token,
          verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid token" });
        }

        user.usVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        res.status(200).json({
          success: true,
          message: "Email verified successfully",
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
