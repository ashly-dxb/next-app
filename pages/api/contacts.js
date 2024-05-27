import dbConnect from "../../lib/dbConnect";
import Contacts from "../../models/Contacts";
// import { redirect } from "next/navigation";

// http://localhost:3000/api/contacts

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { full_name, email, phone, subject, message } = req.body;

        // const user = await Contacts.findOne({ email });
        // if (user) {
        //   return res
        //     .status(400)
        //     .json({ success: false, message: "The email is already existing" });
        // }

        const contReq = new Contacts({
          fullname: full_name,
          email,
          phone,
          subject,
          message,
        });

        const contactReq = await contReq.save();

        res.status(200).json({
          message: "Request created successfully",
          success: true,
          contactReq,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "GET":
      try {
        const contacts = await Contacts.find({}).sort({ contactedDate: -1 });
        const rowCount = contacts.length;

        res.status(200).json({
          success: true,
          message: "Successful",
          data: contacts,
          rowCount: rowCount,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // case "POST":
    //   try {
    //     const post = await Contacts.create(req.body);
    //     res.status(201).json({ success: true, data: post });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   // redirect(`/contacts/ListPosts`); // Navigate to the listing page from ServerSide itself
    //   break;

    case "PUT":
      try {
        const filter = { _id: req.body.postID };
        const updateDoc = {
          $set: {
            title: req.body.title,
            description: req.body.description,
          },
        };

        const post = await Contacts.updateOne(filter, updateDoc);
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      // redirect(`/contacts/ListPosts`); // Navigate to the listing page from ServerSide itself
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
