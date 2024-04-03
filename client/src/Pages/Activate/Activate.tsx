import { useState } from "react";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepName from "../Steps/StepName/StepName";

const Steps: {
  [key: number]: ({ onNext }: { onNext: () => void }) => JSX.Element;
} = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = Steps[step];

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  return <Step onNext={onNext} />;
};

export default Activate;
