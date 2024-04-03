import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hook";

const GuestRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
};

export default GuestRoutes;
