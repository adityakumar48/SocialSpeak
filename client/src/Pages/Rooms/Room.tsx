import Navigation from "@/components/shared/Navigation";
import { Button } from "@/components/ui/button";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useAppSelector } from "@/store/hook";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ArrowLeft, Hand, LogOut, Mic, MicOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoom } from "@/http";

const Room = () => {
  const colorsArray = [
    "#737373",
    "#a8a29e",
    "#f87171",
    "#fb923c",
    "#fbbf24",
    "#facc15",
    "#a3e635",
    "#4ade80",
    "#34d399",
    "#2dd4bf",
    "#22d3ee",
    "#38bdf8",
    "#60a5fa",
    "#818cf8",
    "#a78bfa",
    "#c084fc",
    "#e879f9",
    "#fb7185",
    "#f472b6",
  ];

  interface RoomType {
    id: string;
    roomName: string;
    roomType: string;
    ownerId: string;
    createdAt: string;
    speakers: string[];
  }

  interface UserType {
    id: string;
    name: string;
    avatar: string;
  }

  const { id: roomId } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.auth.user);
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const [isMute, setIsMute] = useState(true);
  const navigate = useNavigate();
  const [room, setRoom] = useState<RoomType>();
  const randomColor = colorsArray[
    Math.floor(Math.random() * colorsArray.length)
  ] as string;

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  const handleHandRaise = () => {
    console.log("hand raise");
  };

  useEffect(() => {
    handleMute(isMute, (user as UserType)?.id);
  }, [isMute]);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) {
        navigate("/rooms");
      }

      if (roomId) {
        const { data } = await getRoom(roomId);
        console.log(data);
        setRoom(data);

        if (!data) {
          navigate("/rooms");
        }
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleMuteClick = async (clientId: string) => {
    // if the client id is not equal to the user id, return
    // @ts-ignore
    if (clientId !== user?.id) return;
    console.log("mute click");
    setIsMute((isMute) => !isMute);
  };

  return (
    <div>
      <Navigation />
      <div className="pt-12 px-16 container">
        <div className="text-lg">
          <Button
            onClick={() => navigate("/rooms")}
            className="flex items-center  gap-2 justify-center text-gray-300"
            variant={"link"}
          >
            <ArrowLeft size={22} />{" "}
            <span className="text-lg">All Voice Rooms</span>
          </Button>
        </div>
      </div>

      <div className=" bg-[#1D1D1D] min-h-[75vh] mt-5 px-12 rounded-t-2xl  ">
        <div className="flex justify-between pt-8">
          <div>
            {" "}
            <h1 className="text-xl ">{room?.roomName}</h1>{" "}
            <p className="text-xs text-gray-500">{roomId}</p>
          </div>
          <div className="flex gap-12">
            <div
              onClick={handleHandRaise}
              className=" cursor-pointer flex items-center p-3 rounded-full bg-[#262626]"
            >
              <Hand className="text-yellow-200" size={20} />
            </div>
            <div
              onClick={handleManualLeave}
              className="px-4 cursor-pointer py-2 bg-[#262626] items-center rounded-2xl text-sm flex gap-2 text-yellow-200 "
            >
              <LogOut size={20} />{" "}
              <span className="text-white">Leave Quietly</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-8 flex-wrap">
          {clients.map(
            (client: {
              id: string;
              name: string;
              avatar: string;
              muted: boolean;
            }) => (
              <div className="flex" key={client.id}>
                <div
                  className="flex relative flex-col items-center"
                  key={client.id}
                >
                  <audio
                    ref={(instance: HTMLAudioElement | null) =>
                      provideRef(instance, client.id)
                    }
                    controls
                    autoPlay
                    className="hidden"
                  ></audio>

                  <Avatar
                    style={{
                      borderColor: randomColor,
                      borderWidth: "3px",
                      borderStyle: "solid",
                      opacity: 1,
                    }}
                    className={` size-14  `}
                  >
                    <AvatarImage src={client.avatar}></AvatarImage>
                    <AvatarFallback>{client.name}</AvatarFallback>
                  </Avatar>
                  <button onClick={() => handleMuteClick(client.id)}>
                    {client?.muted ? (
                      <MicOff
                        className="absolute bottom-5 right-8 text-red-600 bg-[#121212] p-1 rounded-full "
                        size={24}
                      />
                    ) : (
                      <Mic
                        className="absolute bottom-5 right-8 text-green-600 bg-[#121212] p-1 rounded-full "
                        size={24}
                      />
                    )}
                  </button>
                  <p>{client.name}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
