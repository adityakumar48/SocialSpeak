import Navigation from "@/components/shared/Navigation";
import StepCard from "@/components/shared/StepCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const StepEmail = ({ onNext }: { onNext: () => void }) => {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    try {
      // Email Validation
      if (!email) return toast("Email is required!");

      // Email Regex
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!emailRegex.test(email)) {
        return toast("Invalid Email Address!");
      }

      // NEXT Step Call
      onNext();
    } catch (error: unknown) {
      toast(error as string);
    }
  };

  return (
    <>
      <Navigation />
      <div className="w-[30%] pt-20 mx-auto h-[75vh]">
        <StepCard
          title="Email Registration"
          subText="Enter your Email to get registered"
        >
          <div className="w-96 pt-4 mx-auto ">
            <label className="pb-2 pl-2 text-gray-400 " htmlFor="email">
              Email
            </label>
            <Input
              className="bg-[#121212]/70 mt-1 border-[#1D1D1D]/75"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@xyz.com"
            />
          </div>

          <Button
            onClick={() => handleClick()}
            className="mt-5 w-96 mx-auto flex bg-violet-600 hover:bg-violet-600/50 "
          >
            Send OTP
          </Button>

          <p className="w-96 pt-12 pb-5 mx-auto text-xs text-gray-500">
            *By Entering your email, you're agreeing to all our terms and
            conditions. After entering the OTP, you must activate your account
            by creating a username. Thanks!
          </p>
        </StepCard>
      </div>
    </>
  );
};

export default StepEmail;
