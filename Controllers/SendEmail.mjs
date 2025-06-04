import nodemailer from 'nodemailer'
// Create a test account or replace with real credentials.
const sendEmail = async (req, res) => {
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Wrap in an async IIFE so we can use await.
let sendMailStatus = await transporter.sendMail({
    from: `"Verify Email" <${process.env.EMAIL_USER}>`,
    to:req.body.email,
    subject:req.body.subject,
    html:req.body.html,
});
if (sendMailStatus) {
    res.status(200).json({message: "Email Sent Successfully"})
} else {
    res.status(400).json({message: "Email Sending failed"})
}
}

const EmailController = {sendEmail};
export default EmailController;