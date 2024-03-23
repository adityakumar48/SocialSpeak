import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import GuestRoutes from "./components/Routes/GuestRoutes.tsx";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes.tsx";
import SemiProtectedRoutes from "./components/Routes/SemiProtectedRoutes.tsx";
import "./index.css";
import Activate from "./Pages/Activate/Activate.tsx";
import Home from "./Pages/Home/Home.tsx";
import CustomLogin from "./Pages/Login/CustomLogin.tsx";
import Login from "./Pages/Login/Login.tsx";
import CustomRegister from "./Pages/Register/CustomRegister.tsx";
import Register from "./Pages/Register/Register.tsx";
import Rooms from "./Pages/Rooms/Rooms.tsx";
import Auth from "./Pages/Auth/Auth.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const user = {
  activated: false,
};

const isAuth = false;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Guest Routes */}

      <Route path="/" element={<GuestRoutes isAuth={isAuth} />}>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="/register" element={<Layout />}>
          <Route path="" element={<Register />} />
          <Route path="custom" element={<CustomRegister />} />
        </Route>

        <Route path="/login" element={<Layout />}>
          <Route path="" element={<Login />} />
          <Route path="custom" element={<CustomLogin />} />
        </Route>
      </Route>

      {/* Semi Protected Routes */}

      <Route path="/authenticate" element={<GuestRoutes isAuth={isAuth} />}>
        <Route path="" element={<Auth />} />
      </Route>

      <Route
        path="/activate"
        element={<SemiProtectedRoutes isAuth={isAuth} user={user} />}
      >
        <Route path="" element={<Activate />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/rooms"
        element={<ProtectedRoutes user={user} isAuth={isAuth} />}
      >
        <Route path="" element={<Rooms />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
