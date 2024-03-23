import { Navigate, Outlet } from "react-router-dom";

const SemiProtectedRoutes = () => {
  const isAuth = false;
  const user = {
    activated: false,
  };

  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Outlet />
  ) : (
    <Navigate to={"/rooms"} />
  );
};

export default SemiProtectedRoutes;
