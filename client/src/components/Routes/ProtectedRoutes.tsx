import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hook";

const ProtectedRoutes = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !(user as { activated: boolean })?.activated ? (
    <Navigate to={"/activate"} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
