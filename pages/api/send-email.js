// API route: /pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, phone, companyName, industry, goals, contentReady, features, budget, timeline, comments } = req.body;

    const ownerEmail = "thompsontahjay34@gmail.com"; // Replace with your email

    const transporter = nodemailer.createTransport({
      service: "gmail", // Or your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Website Inquiry Confirmation",
      text: `Thank you for reaching out to us at Dosnine. We have received your inquiry and will get back to you shortly.`,
    };

    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: "New Website Development Inquiry",
      text: `You have received a new inquiry:

Email: ${email}
Phone: ${phone}
Business Name: ${companyName}
Industry: ${industry}
Goals: ${goals}
Content Ready: ${contentReady}
Features: ${features}
Budget: ${budget}
Timeline: ${timeline}
Comments: ${comments}`,
    };

    try {
      await transporter.sendMail(customerMailOptions);
      await transporter.sendMail(ownerMailOptions);
      res.status(200).json({ message: "Emails sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
