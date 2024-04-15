const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refreshModel");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
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

  async verifyAccessToken(accessToken) {
    return await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
}

  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({
      userId: userId,
      token: refreshToken,
    });
  }

  async updateRefreshToken(refreshToken, userId) {
    return await refreshModel.updateOne(
      { _id: userId },
      { token: refreshToken }
    );
  }

  async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
