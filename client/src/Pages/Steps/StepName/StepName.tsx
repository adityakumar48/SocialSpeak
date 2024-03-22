import { Button } from "@/components/ui/button";

const StepName = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <div>ENTER Name STEP</div>
      <Button onClick={onNext}>Next</Button>
    </>
  );
};

export default StepName;
