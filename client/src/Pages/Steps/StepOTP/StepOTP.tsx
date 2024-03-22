import { Button } from "@/components/ui/button";

const StepOTP = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <div>OTP VERIFICATION STEP</div>
      <Button onClick={onNext}>Next</Button>
    </>
  );
};

export default StepOTP;
