import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
  const isAuth = false;
  return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
};

export default GuestRoutes;
