import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({
  isAuth,
  user,
}: {
  isAuth: boolean;
  user: { activated: boolean };
}) => {
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Navigate to={"/activate"} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
