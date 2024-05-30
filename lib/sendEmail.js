import nodemailer from "nodemailer";
import Users from "../models/Users";
import bcryptjs from "bcryptjs";

async function sendEmail({ email, emailType, userId }) {
  try {
    // Create a hash token based on the user's ID
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await Users.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
      });
    } else if (emailType === "RESET") {
      await Users.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 60 * 60 * 1000,
      });
    }

    // Create a nodemailer transport
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a71a804fcdeed7",
        pass: "a042cfc3adbe94",
      },
    });

    // Compose email options
    const mailOptions = {
      from: "ashlythomas@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN_HOST
      }/VerifyEmail?token=${hashedToken}">here</a> to 
                ${
                  emailType === "VERIFY"
                    ? " verify your email."
                    : " reset your password."
                }</p>`,
    };

    // Send the email
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default sendEmail;
