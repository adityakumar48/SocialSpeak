import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
};

export default GuestRoutes;
