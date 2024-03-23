import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

const StepCard = ({
  title,
  subText,
  children,
}: {
  title: string;
  subText: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="bg-[#1D1D1D] border-[#1D1D1D]/75 p-2 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Avatar className={`border-2  border-white   `}>
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl tracking-wide text-gray-400">{title}</h1>
        </CardTitle>
        <CardDescription>
          <p className="pt-2">{subText}</p>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
};

export default StepCard;
