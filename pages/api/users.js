import dbConnect from "../../lib/dbConnect";
import Users from "../../models/Users";
import bcryptjs from "bcryptjs";
import sendEmail from "../../lib/sendEmail";

// http://localhost:3000/api/users

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { username, email, password } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
          return res
            .status(200)
            .json({ success: false, message: "The email is already existing" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new Users({
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const userID = savedUser._id;
        const userID2 = userID.toString();
        // console.log("savedUser._id :::", userID2, savedUser._id.toString());

        // send verification email
        const mailResp = await sendEmail({
          email,
          emailType: "VERIFY",
          userId: savedUser._id.toString(),
        });

        res.status(200).json({
          message: "New User Created",
          success: true,
          mailStatus: mailResp,
          savedUser,
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "GET":
      try {
        const userList = await Users.find({}).sort({ createdDate: -1 });
        const rowCount = userList.length;

        res.status(200).json({
          success: true,
          message: "Successful",
          data: userList,
          rowCount: rowCount,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
