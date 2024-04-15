const RoomModel = require("../models/roomModel");

class RoomService {
  async create(payload) {
    const { roomName, roomType, ownerId } = payload;
    const room = await RoomModel.create({
      roomName,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  }

  async getAllRooms(types) {
    const rooms = await RoomModel.find({
      roomType: { $in: types },
    })
      .populate("speakers")
      .populate("ownerId")
      .exec();
    return rooms;
  }

  async getRoom(roomId) {
    const room = await RoomModel.findOne({ _id: roomId });
    return room;
  }
}

module.exports = new RoomService();
