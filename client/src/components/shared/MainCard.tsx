import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AuthCard from "./AuthCard";

interface MainCardProps {
  title: string;
  subText: string;
}

const MainCard = ({ title, subText }: MainCardProps) => {
  const navigate = useNavigate();

  const startRegister = () => {
    navigate("/authenticate");
  };

  const startLogin = () => {};

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
      <CardContent className="text-2xl mt-4">
        <div className="flex flex-col gap-3">
          <AuthCard />

          <Card
            onClick={title === "Register" ? startRegister : startLogin}
            className="bg-[#121212]/70 hover:bg-[#121212]/90 hover:cursor-pointer  px-2 py-3 flex items-center justify-center gap-4 border-[#1D1D1D]/75"
          >
            <MdOutlineMail className="text-neutral-200 " />
            <button className="text-gray-300 text-lg ">
              Continue with Email
            </button>
          </Card>

          <p className="text-gray-400 text-xs text-center py-2">OR</p>

          {title === "Register" ? (
            <p className="text-gray-300 text-base text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 cursor-pointer">
                Login
              </Link>
            </p>
          ) : (
            <p className="text-gray-300 text-base text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 cursor-pointer">
                Register
              </Link>
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-400 pt-2 ">
          *By continuing, you agree to the terms and conditions.
        </p>
      </CardFooter>
    </Card>
  );
};

export default MainCard;
