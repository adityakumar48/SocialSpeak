const crypto = require("crypto");
const hashService = require("./hashService");

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;

const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }
  
  async sendBySms(phone, otp) {
    console.log("phone", phone);
    console.log("otp", otp);
    return await twilio.messages.create({
      to: `+91 ${phone}`,
      from: process.env.SMS_PHONE_NUMBER,
      body: `Your One-Time Password (OTP) is: ${otp}.\n\n
      Please do not share this OTP with anyone for security reasons. `,
    });
  }
  
  
  async verifyOtp(data, hashedOtp) {
    let computedhash = await hashService.hashOtp(data);

    return computedhash === hashedOtp;
  }
}

module.exports = new OtpService();
