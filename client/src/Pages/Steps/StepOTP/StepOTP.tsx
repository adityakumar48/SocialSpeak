import Navigation from "@/components/shared/Navigation";
import StepCard from "@/components/shared/StepCard";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { verifyOtp } from "../../../http";
import { useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hook";
import { setAuth } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hook";

const StepOTP = () => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useAppSelector((state) => state.auth.otp);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      // OTP Validation
      if (!otp) return toast("OTP is required!");

      const { data } = await verifyOtp({
        otp,
        phone,
        hash,
      });

      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navigation />
      <div className="w-[30%] pt-20 mx-auto h-[75vh]">
        <StepCard
          title="Enter OTP"
          subText={`Enter the OTP to verify your account.`}
        >
          <div className="px-12 pt-4">
            <h1 className="text-gray-300 pl-8">One-Time Password</h1>
            <div className="py-2 flex justify-center  items-center ">
              <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="pl-8">
              <p className="text-xs text-slate-500 text-start p ">
                Enter Your One-Time Password Here...
              </p>
              <Button
                className="w-[90%] bg-violet-600 mt-8 mb-10 hover:bg-violet-600/50"
                onClick={handleSubmit}
              >
                Verify OTP
              </Button>
            </div>
          </div>
        </StepCard>
      </div>
    </>
  );
};

export default StepOTP;
