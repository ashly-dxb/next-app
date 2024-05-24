import dbConnect from "../../lib/dbConnect";
import Posts from "../../models/Posts";
import { redirect } from "next/navigation";

// http://localhost:3000/api/posts

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const posts = await Posts.find({}).sort({ createdDate: -1 });

        const rowCount = posts.length;

        res.status(200).json({
          success: true,
          message: "Successful",
          data: posts,
          rowCount: rowCount,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const post = await Posts.create(req.body);
        res.status(201).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      // redirect(`/posts/ListPosts`); // Navigate to the listing page from ServerSide itself
      break;

    case "PUT":
      try {
        const filter = { _id: req.body.postID };
        const updateDoc = {
          $set: {
            title: req.body.title,
            description: req.body.description,
          },
        };

        const post = await Posts.updateOne(filter, updateDoc);
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      // redirect(`/posts/ListPosts`); // Navigate to the listing page from ServerSide itself
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
