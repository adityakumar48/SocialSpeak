import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const Register = () => {
  return (
    <div className="w-[30%] pt-20 mx-auto h-[75vh] ">
      <Card className="bg-[#1D1D1D] border-[#1D1D1D]/75 p-2 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Avatar className={`border-2  border-white   `}>
              <AvatarImage src={"https://github.com/shadcn.png"} />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl tracking-wide text-gray-400">Register</h1>
          </CardTitle>
          <CardDescription>
            <p className="pt-2">
              Register with a Single Click using Social Media.{" "}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-2xl mt-4">
          <div className="flex flex-col gap-3">
            <Card className="bg-red-500/20 hover:bg-red-700/20 hover:cursor-pointer px-2 py-3 flex items-center justify-center gap-4 border-[#1D1D1D]/75">
              <FaGoogle className="text-red-500" />
              <p className="text-gray-300 text-lg">Continue with Google</p>
            </Card>

            <Card className="bg-[#121212]/70 hover:bg-[#121212]/90 hover:cursor-pointer  px-2 py-3 flex items-center justify-center gap-4 border-[#1D1D1D]/75">
              <FaGithub className="text-neutral-200" />
              <p className="text-gray-300 text-lg">Continue with Github</p>
            </Card>

            <Card className="bg-[#121212]/70 hover:bg-[#121212]/90 hover:cursor-pointer  px-2 py-3 flex items-center justify-center gap-4 border-[#1D1D1D]/75">
              <MdOutlineMail className="text-neutral-200 " />
              <Link className="text-gray-300 text-lg " to="/register/custom">
                Continue with Email
              </Link>
            </Card>

            <p className="text-gray-400 text-xs text-center py-2">OR</p>

            <p className="text-gray-300 text-base text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-400 pt-2 ">
            *By continuing, you agree to the terms and conditions.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
