import { useState } from "react";
import StepEmail from "../Steps/StepEmailAndPhone/StepEmail";
import StepOTP from "../Steps/StepOTP/StepOTP";

const Steps: {
  [key: number]: ({ onNext }: { onNext: () => void }) => JSX.Element;
} = {
  1: StepEmail,
  2: StepOTP,
};

const Auth = () => {
  const [step, setStep] = useState(1);
  const Step = Steps[step];

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  return <Step onNext={onNext} />;
};

export default Auth;
