const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refreshModel");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({ token, userId });
    } catch (err) {
      console.log(err.message);
    }
  }
  
  async verifyAccessToken(token){
    return await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  }
}

module.exports = new TokenService();
