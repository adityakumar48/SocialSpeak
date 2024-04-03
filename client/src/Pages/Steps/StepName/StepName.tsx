import Navigation from "@/components/shared/Navigation";
import StepCard from "@/components/shared/StepCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setName } from "@/store/activateSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useState } from "react";
import { toast } from "sonner";

const StepName = ({ onNext }: { onNext: () => void }) => {
  const indianNames: string[] = [
    "Rishi Kapoor",
    "Alia Bhatt",
    "Shah Rukh Khan",
    "Deepika Padukone",
    "Amitabh Bachchan",
    "Priyanka Chopra Jonas",
    "Ranbir Kapoor",
    "Kareena Kapoor Khan",
    "Salman Khan",
    "Akshay Kumar",
    "Katrina Kaif",
    "Ajay Devgn",
    "Madhuri Dixit",
    "Hrithik Roshan",
    "Anushka Sharma",
  ];

  const dispatch = useAppDispatch();
  const { name } = useAppSelector((state) => state.activate);
  const [fullName, setFullName] = useState(name);

  const handleClick = () => {
    if (!fullName) return toast("Name is required!");

    dispatch(setName(fullName));

    onNext();
  };

  return (
    <>
      <Navigation />
      <div className="w-[30%] pt-20 mx-auto h-[75vh]">
        <StepCard title="Name" subText="Enter your name here ">
          <div className="w-96 pt-4 mx-auto ">
            <label className="pb-2 pl-2 text-gray-400 " htmlFor="phone">
              What's Your Full Name?
            </label>
            <Input
              className="bg-[#121212]/70 mt-1 border-[#1D1D1D]/75"
              type="text"
              id="phone"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={
                indianNames[Math.floor(Math.random() * indianNames.length)]
              }
            />
            <Button
              className="mt-6 mb-10 w-96 mx-auto flex bg-violet-600 hover:bg-violet-600/50"
              onClick={handleClick}
            >
              Next
            </Button>
          </div>
        </StepCard>
      </div>
    </>
  );
};

export default StepName;
