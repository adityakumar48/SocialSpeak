const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/roomService");

class RoomController {
  async create(req, res) {
    // Create a new room
    const { roomName, roomType } = req.body;

    if (!roomName || !roomType) {
      return res.status(400).json({ error: "Room name and type are required" });
    }

    const room = await roomService.create({
      roomName,
      roomType,
      ownerId: req.user._id,
    });
    
    return res.status(201).json(new RoomDto(room));
  }
  
  async index(req, res) {
    const rooms = await roomService.getAllRooms(['open'])
    const allRooms = rooms.map((room) => new RoomDto(room))
    return res.status(200).json(allRooms);
  }
  
  
  async show(req,res){
    const room = await roomService.getRoom(req.params.roomId)
    return res.status(200).json(new RoomDto(room));
  }
  
}

module.exports = new RoomController();
