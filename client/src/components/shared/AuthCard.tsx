import { FaGoogle, FaGithub } from "react-icons/fa";
import { Card } from "../ui/card";

const AuthCard = () => {
  return (
    <>
      <Card className="bg-red-500/20 hover:bg-red-700/20 hover:cursor-pointer px-2 py-3 flex items-center justify-center gap-4 border-[#1D1D1D]/75">
        <FaGoogle className="text-red-500" />
        <p className="text-gray-300 text-lg">Continue with Google</p>
      </Card>

      <Card className="bg-[#121212]/70 hover:bg-[#121212]/90 hover:cursor-pointer  px-2 py-3 flex items-center justify-center gap-4 border-[#1D1D1D]/75">
        <FaGithub className="text-neutral-200" />
        <p className="text-gray-300 text-lg">Continue with Github</p>
      </Card>
    </>
  );
};

export default AuthCard;
