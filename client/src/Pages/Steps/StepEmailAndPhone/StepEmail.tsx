import Navigation from "@/components/shared/Navigation";
import StepCard from "@/components/shared/StepCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const StepEmail = ({ onNext }: { onNext: () => void }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleEmailClick = () => {
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

  const handlePhoneClick = () => {
    try {
      // Phone Validation
      if (!phone) return toast("Phone Number is required!");

      // Phone Regex
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;

      if (!phoneRegex.test(phone)) {
        return toast("Invalid Phone Number!");
      }

      // 10 Digit Phone Number Validation
      if (phone.length < 10 || phone.length > 14) {
        return toast("Phone Number must be between 10 to 14 digits!");
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
        {toggle == false ? (
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
              onClick={() => handleEmailClick()}
              className="mt-5 w-96 mx-auto flex bg-violet-600 hover:bg-violet-600/50 "
            >
              Send OTP
            </Button>

            <p className="text-center w-96 mx-auto text-gray-400 text-xs pt-3">
              or
            </p>

            <Button
              variant={"link"}
              className="text-center text-md mx-auto flex text-violet-500/85  tracking-wider"
              onClick={() => setToggle(!toggle)}
            >
              Via Phone Number
            </Button>

            <p className="w-96 pt-12 pb-5 mx-auto text-xs text-gray-500">
              *By Entering your email, you're agreeing to all our terms and
              conditions. After entering the OTP, you must activate your account
              by creating a username. Thanks!
            </p>
          </StepCard>
        ) : (
          <StepCard
            title="Phone Registration"
            subText="Enter your Phone Number to get registered"
          >
            <div className="w-96 pt-4 mx-auto ">
              <label className="pb-2 pl-2 text-gray-400 " htmlFor="phone">
                Phone
              </label>
              <Input
                className="bg-[#121212]/70 mt-1 border-[#1D1D1D]/75"
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 123 456 7890"
              />
            </div>

            <Button
              onClick={() => handlePhoneClick()}
              className="mt-5 w-96 mx-auto flex bg-violet-600 hover:bg-violet-600/50 "
            >
              Send OTP
            </Button>

            <p className="text-center w-96 mx-auto text-gray-400 text-xs pt-3">
              or
            </p>

            <Button
              variant={"link"}
              className="text-center text-md mx-auto flex text-violet-500/85  tracking-wider"
              onClick={() => setToggle(!toggle)}
            >
              Via Email Address
            </Button>

            <p className="w-96 pt-12 pb-5 mx-auto text-xs text-gray-500">
              *By Entering your email, you're agreeing to all our terms and
              conditions. After entering the OTP, you must activate your account
              by creating a username. Thanks!
            </p>
          </StepCard>
        )}
      </div>
    </>
  );
};

export default StepEmail;
