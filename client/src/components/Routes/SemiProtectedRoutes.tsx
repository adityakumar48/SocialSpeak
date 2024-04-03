import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/hook";

const SemiProtectedRoutes = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !(user as { activated: boolean })?.activated ? (
    <Outlet />
  ) : (
    <Navigate to={"/rooms"} />
  );
};

export default SemiProtectedRoutes;
