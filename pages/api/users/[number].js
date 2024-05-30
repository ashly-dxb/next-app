import dbConnect from "../../../lib/dbConnect";
import Users from "../../../models/Users";
import bcryptjs from "bcryptjs";

// http://localhost:3000/api/users/123456789

export default async function handler(req, res) {
  const { method } = req;
  const { number } = req.query;

  if (number === "" || number === null) {
    res.status(200).send("Invalid Request!");
  }

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userDet = await Users.find({ _id: number });
        res.status(200).json({
          success: true,
          message: "Successfully fetched User details!",
          data: userDet,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      const filter = { _id: number };
      const { username, password } = req.body;

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const updateDoc = {
        $set: {
          username,
          password: hashedPassword,
        },
      };

      try {
        const user = await Users.updateOne(filter, updateDoc);
        res.status(200).json({
          success: true,
          message: "Successfully updated!",
          data: user,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PATCH":
      const filter2 = { _id: number };

      var dynamicObject = {};

      if (req.body.username) {
        const username2 = req.body.username;
        dynamicObject.username = username2;
      }

      if (req.body.password) {
        const password2 = req.body.password;
        const salt2 = await bcryptjs.genSalt(10);
        const hashedPassword2 = await bcryptjs.hash(password2, salt2);
        dynamicObject.password = hashedPassword2;
      }

      const updateDoc2 = {
        $set: dynamicObject,
      };

      try {
        const user = await Users.updateOne(filter2, updateDoc2);
        res.status(200).json({
          success: true,
          message: "Successfully updated user!",
          data: user,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const user = await Users.deleteOne({ _id: number });
        res.status(200).json({
          success: true,
          message: "Successfully deleted user!",
          data: user,
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
