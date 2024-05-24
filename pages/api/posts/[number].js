import dbConnect from "../../../lib/dbConnect";
import Posts from "../../../models/Posts";

// http://localhost:3000/api/posts/1234

export default async function handler(req, res) {
  const { method } = req;
  const { number } = req.query;

  if (number === "" || number === null) {
    res.status(400).send("Invalid Request!");
  }

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const postDet = await Posts.find({ _id: number });
        res.status(200).json({
          success: true,
          data: postDet,
          msg: "successful",
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const post = await Posts.deleteOne({ _id: number });
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
