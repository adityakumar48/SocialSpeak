import { useState } from "react";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepEmail from "../Steps/StepEmailAndPhone/StepEmail";
import StepName from "../Steps/StepName/StepName";
import StepOTP from "../Steps/StepOTP/StepOTP";
import StepUserName from "../Steps/StepUserName/StepUserName";

const Steps: {
  [key: number]: ({ onNext }: { onNext: () => void }) => JSX.Element;
} = {
  1: StepEmail,
  2: StepOTP,
  3: StepName,
  4: StepAvatar,
  5: StepUserName,
};

const CustomRegister = () => {
  useState(() => {});
  const [step, setStep] = useState(1);
  const Step = Steps[step];

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
};

export default CustomRegister;
