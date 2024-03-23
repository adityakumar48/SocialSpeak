import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuth = false;
  const user = {
    activated: false,
  };

  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Navigate to={"/activate"} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
