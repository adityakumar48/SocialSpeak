import { Navigate, Outlet } from "react-router-dom";

const SemiProtectedRoutes = ({
  isAuth,
  user,
}: {
  isAuth: boolean;
  user: { activated: boolean };
}) => {
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Outlet />
  ) : (
    <Navigate to={"/rooms"} />
  );
};

export default SemiProtectedRoutes;
