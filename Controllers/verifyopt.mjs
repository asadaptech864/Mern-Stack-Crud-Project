import Users from '../modals/userModal.mjs'

const verifyOTP = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const user = await Users.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (!user.otp || !user.otpExpiresAt) {
        return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
      }
  
      if (new Date() > user.otpExpiresAt) {
        return res.status(400).json({ message: 'Code expired. Please resend the code.' });
      }
  
      if (user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid verification code.' });
      }
  
      // OTP is correct and valid
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();
  
      return res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
      console.error('OTP verify error:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  const verifyoptController = {verifyOTP};
  export default verifyoptController;
  