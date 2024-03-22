import { Button } from "@/components/ui/button";

const StepEmail = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <h1>Setup Email</h1>
      <Button onClick={onNext}>Next</Button>
    </>
  );
};

export default StepEmail;
