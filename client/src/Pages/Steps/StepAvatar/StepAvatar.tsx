import { Button } from "@/components/ui/button";

const StepAvatar = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <div>StepAvatar</div>
      <Button onClick={onNext}>Next</Button>;
    </>
  );
};

export default StepAvatar;
