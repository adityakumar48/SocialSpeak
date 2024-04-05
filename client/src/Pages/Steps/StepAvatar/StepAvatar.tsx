import Loader from "@/components/shared/Loader";
import Navigation from "@/components/shared/Navigation";
import StepCard from "@/components/shared/StepCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { activate } from "@/http";
import { setAvatar } from "@/store/activateSlice";
import { setAuth } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import React, { useState } from "react";

const StepAvatar = () => {
  const { name, avatar } = useAppSelector((state) => state.activate);
  const [image, setImage] = useState<string>("https://github.com/shadcn.png");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const captureImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
        dispatch(setAvatar(reader.result as string));
      };
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });

      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Activating Please Wait Sometime..." />;

  return (
    <>
      <Navigation />
      <div className="w-[30%] pt-20 mx-auto h-[75vh]">
        <StepCard title={` Hello ${name} `} subText="Upload Your Avatar here">
          <div className="px-8 flex items-center flex-col gap-2  ">
            <Avatar className="size-24 border-4 border-violet-800">
              <AvatarImage src={image} />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <div>
              <input
                onChange={(e) => captureImage(e)}
                id="avatarInput"
                type="file"
                className="hidden"
              />
              <label
                className="cursor-pointer text-sm text-violet-300 underline hover:text-violet-400"
                htmlFor="avatarInput"
              >
                Change Avatar!
              </label>
            </div>
          </div>
          <Button
            className="mt-6 mb-10 w-80 mx-auto flex bg-violet-600 hover:bg-violet-600/50"
            onClick={handleClick}
          >
            Submit
          </Button>
        </StepCard>
      </div>
    </>
  );
};

export default StepAvatar;
