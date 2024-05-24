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
          return res.json({ error: "Invalid token" }, { status: 400 });
        }

        // Update user properties
        user.usVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        res.json({
          message: "Email verified successfully",
          success: true,
        });
      } catch (error) {
        res.json({ error: error.message }, { status: 500 });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
