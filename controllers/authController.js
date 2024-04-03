const hashService = require("../services/hashService");
const otpService = require("../services/otpService");
const tokenService = require("../services/tokenService");
const userService = require("../services/userService");
const UserDto = require("../dtos/user-dto");
class AuthController {
  async sendOtp(req, res) {
    // Logic
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "phone is required" });
    }

    // 123456 - 6 Digit OTP Generation
    const otp = await otpService.generateOtp();

    // Hash OTP
    const ttl = 1000 * 60 * 2; // 2 Minutes
    const expires = Date.now() + ttl; // Current Time + 2 Minutes
    const data = `${phone}.${otp}.${expires}`; // phone.otp.expires
    const hash = await hashService.hashOtp(data); // Hashed OTP

    // Send OTP
    try {
      // await otpService.sendBySms(phone, otp);
      res.json({ hash: `${hash}.${expires}`, phone, otp });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  }

  async verifyOtp(req, res) {
    // Logic
    const { phone, hash, otp } = req.body;
    if (!phone || !hash || !otp) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    
    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      return res.status(400).json({ message: "OTP Expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = await otpService.verifyOtp(data, hashedOtp);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });

      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      res.send(500).json({ message: "DB Error" });
    }

    // Token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    tokenService.storeRefreshToken(refreshToken, user._id);
    
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ user: userDto, authStatus: true });
  }
}

module.exports = new AuthController();
