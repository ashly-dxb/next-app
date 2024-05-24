import bcryptjs from "bcryptjs";
import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";

// http://localhost:3000/api/users/signup

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { username, email, password } = req.body;

        const user = await Users.findOne({ email });
        if (user) {
          return res.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new Users({
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();

        res.status(200).json({
          message: "User created successfully",
          success: true,
          savedUser,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
