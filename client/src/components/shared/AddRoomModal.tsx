import { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { techTitles } from "../../../data";
import { Earth, Lock, Users } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createRoom as create } from "../../http/index";
import { useNavigate } from "react-router-dom";

const AddRoomModal = () => {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("open");
  const navigate = useNavigate();

  const createRoom = async () => {
    console.log(roomName, roomType);

    // Check
    if (!roomName) {
      return toast("Room Name is required!");
    }

    // API Call
    try {
      const { data } = await create({ roomName, roomType });
      navigate(`/room/${data.id}`);
    } catch (error: unknown) {
      toast(error as string);
    }
  };

  return (
    <DialogHeader>
      <DialogTitle className="tracking-normal font-normal">
        Enter the topic to be discussed
      </DialogTitle>
      <DialogDescription className="pt-4">
        <label htmlFor="roomName">Enter Room Name</label>
        <Input
          className="bg-[#121212]/70 mt-1 border-[#1D1D1D]/75"
          type="text"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder={
            techTitles[Math.floor(Math.random() * techTitles.length)]
          }
        />
        <h2 className="pt-5 text-lg font-normal tracking-normal text-white">
          Room Type
        </h2>

        <div className="grid grid-cols-3 place-items-center pt-4">
          <div
            onClick={() => setRoomType("open")}
            className={`flex flex-col items-center px-8 py-6 cursor-pointer gap-1 ${
              roomType === "open" ? "bg-[#262626]" : null
            }  rounded-xl`}
          >
            <Earth size={28} className="text-violet-500" />
            <label htmlFor="open" className="text-white">
              Open
            </label>
          </div>
          <div
            onClick={() => setRoomType("social")}
            className={`flex flex-col items-center px-8 py-6 cursor-pointer gap-1 ${
              roomType === "social" ? "bg-[#262626]" : null
            } rounded-xl`}
          >
            <Users size={28} className="text-green-500" />
            <label htmlFor="social" className="text-white">
              Social
            </label>
          </div>
          <div
            onClick={() => setRoomType("private")}
            className={`flex flex-col items-center px-8 py-6 cursor-pointer gap-1  rounded-xl ${
              roomType === "private" ? "bg-[#262626]" : null
            } `}
          >
            <Lock size={28} className="text-red-500" />
            <label htmlFor="private" className="text-white">
              private
            </label>
          </div>
        </div>

        <hr className="mt-8 min-w-full border border-gray-700 " />

        <h2 className="pt-8 text-center px-0 text-gray-200">
          Start a Room, Open to everyone{" "}
        </h2>

        <Button
          className="w-34 mt-4 mx-auto flex gap-1 items-center rounded-2xl bg-violet-600 hover:bg-violet-600/50"
          onClick={createRoom}
        >
          Start Room
        </Button>
      </DialogDescription>
    </DialogHeader>
  );
};

export default AddRoomModal;
