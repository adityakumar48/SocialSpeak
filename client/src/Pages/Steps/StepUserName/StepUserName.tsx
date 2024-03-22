import { Button } from "@/components/ui/button";

const StepUserName = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <div>ENTER USERNAME STEP</div>
      <Button onClick={onNext}>Next</Button>
    </>
  );
};

export default StepUserName;
