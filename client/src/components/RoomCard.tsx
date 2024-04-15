import { roomType } from "@/types";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Mic, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }: { room: roomType }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/room/${room.id}`)}
      className="bg-[#1D1D1D] border-[#1D1D1D]/75 rounded-xl p-5 cursor-pointer text-white"
    >
      <h3 className="pb-4">{room.roomName}</h3>
      <div className="flex items-center relative">
        {/* Left */}
        <div className=" ">
          {/* Speaker */}
          {room.speakers.map((speaker, i) => (
            <div key={speaker.id.toString()} className="">
              <Avatar
                style={{ left: `${i * 20}px`, top: `${i * 20}px` }}
                className={`border-2  absolute top-0 left-0 ${
                  i % 2 == 0 ? "border-violet-600" : "border-green-600"
                } `}
              >
                <AvatarImage src={speaker.avatar} />
                <AvatarFallback>{speaker.name}</AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
        {/* Right */}
        <div className="ml-24">
          <div>
            {room.speakers.map((speaker) => (
              <div className=" flex items-center py-1 gap-1">
                <Mic size={18} /> {speaker.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-end pr-2 mt-4 text-sm ">
        {" "}
        {room.listeners} <User size={13} />
      </div>
    </Card>
  );
};

export default RoomCard;
