// models/Users.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide fullname"],
    maxlength: [50, "Fullname cannot be more than 50 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    maxlength: [50, "Email cannot be more than 50 characters"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone"],
    maxlength: [20, "Phone cannot be more than 20 characters"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    maxlength: [100, "Subject cannot be more than 100 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
    maxlength: [2000, "Message cannot be more than 2000 characters"],
  },
  contactedDate: {
    type: Date,
    default: Date.now,
  },
});

const ContactUs =
  mongoose.models.Contacts || mongoose.model("Contacts", ContactSchema);
export default ContactUs;
