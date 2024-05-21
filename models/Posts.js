// models/Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
    maxlength: [50, "Title cannot be more than 50 characters"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Posts || mongoose.model("Posts", PostSchema);
// module.exports = mongoose.model("posts", PostSchema);
