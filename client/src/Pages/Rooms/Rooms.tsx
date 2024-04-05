import Navigation from "@/components/shared/Navigation";
import RoomHeader from "./RoomHeader";
import RoomCard from "@/components/RoomCard";
import { roomType } from "../../../types/index";
import { useEffect, useState } from "react";
import { getAllRooms } from "@/http";

const Rooms = () => {
  const [rooms, setRooms] = useState<roomType[]>([]);

  console.log(rooms);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Navigation />
      <div className="px-20 pt-5 ">
        <RoomHeader />
        <div className="grid grid-cols-4 py-4 gap-5 px-16 ">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
