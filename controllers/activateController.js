const Jimp = require("jimp");
const path = require("path");
const userService = require("../services/userService");
const UserDto = require("../dtos/user-dto");

class ActivateController {
  async activate(req, res) {
    // Logic
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Image base64 decode
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    try {
      const jimpRes = await Jimp.read(buffer);
      jimpRes
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Something went wrong" });
    }

    // Update User
    try {
      const userId = req.user._id;
      const user = await userService.findUser({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDto(user) , auth:true});
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Something went wrong" });
    }

  }
}

module.exports = new ActivateController();
