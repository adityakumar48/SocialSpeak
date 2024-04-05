import Navigation from "@/components/shared/Navigation";
import RoomHeader from "./RoomHeader";
import RoomCard from "@/components/RoomCard";
import { roomType } from "../../../types/index";
import { rooms } from "../../../data/index";

const Rooms = () => {
  return (
    <>
      <Navigation />
      <div className="px-24 pt-5 ">
        <RoomHeader />
        <div className="grid grid-cols-4 py-4 gap-5 px-16 ">
          {rooms.map((room: roomType) => (
            <RoomCard key={room.id.toString()} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
