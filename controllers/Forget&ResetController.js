// passwordController.js

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userData = require("../model/UserModel");
const { generateResetPasswordMail, sendMail } = require("../utils/Utils");

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userData.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: res.__('forget.invalid_user') });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const tme = new Date();
    tme.setMinutes(tme.getMinutes() + 10);
    await user.update({ otp: hashedOTP, timeExpire: tme });
    const mailOptions = generateResetPasswordMail(email, otp);
    await sendMail(mailOptions);
    res.json({ message: res.__("forget.email_sent") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await userData.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: res.__('reset.invalid_user') });
    }
    if (user.otp === null) {
      return res.status(403).json({ message: res.__('reset.invlid_otp')})
    }
    const otpMatch = await bcrypt.compare(otp, user.otp);
    if (otpMatch && new Date() < user.timeExpire) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({ password: hashedPassword, otp: null, timeExpire: null });
      return res.status(201).json({ message: res.__("reset.paswrd_success") });
    }
    res.status(400).json({ message: res.__('reset.incorrectOtp') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { forgetPassword, resetPassword };
