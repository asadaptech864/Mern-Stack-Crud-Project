import nodemailer from 'nodemailer';
import Users from '../modals/userModal.mjs'
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

const sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    //const user = await Users.findOne({ where: { email } });
    const user = await Users.findOne({ email }); // ✅ Mongoose syntax
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 60 * 1000); // 1 minute from now

    // Save OTP to user
   // await user.update({ otp, otpExpiresAt });
   user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `<p>Your verification code is: <strong>${otp}</strong>. It is valid for 1 minute.</p>`;

    await transporter.sendMail({
      from: `"Verify Email" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification Code",
      html,
    });

    return res.status(200).json({ message: "Verification code sent to email." });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const VerificationEmailController = {sendVerificationEmail};
export default VerificationEmailController;