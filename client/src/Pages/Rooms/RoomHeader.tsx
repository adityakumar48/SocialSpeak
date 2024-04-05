import AddRoomModal from "@/components/shared/AddRoomModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";

const RoomHeader = () => {
  return (
    <div className="flex justify-between w-[90%] mx-auto items-center  gap-4 h-[10vh] ">
      <div className=" flex gap-4">
        <div className="text-lg">
          <h1 className="">All Public Rooms</h1>
          <hr className="w-[6rem] border-violet-500 border-2 rounded-e-md " />
        </div>

        <div className="flex items-center bg-[#1D1D1D] px-4 rounded-xl min-w-[300px] ">
          <Search className="text-gray-300" />
          <Input
            placeholder="Search Rooms"
            className="bg-transparent border-none outline-none focus:bg-none w-full text-white placeholder-white "
          />
        </div>
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            {" "}
            <Button className="w-34 mx-auto flex gap-1 items-center rounded-2xl bg-violet-600 hover:bg-violet-600/50 ">
              <Users size={18} /> Create Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddRoomModal />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RoomHeader;
