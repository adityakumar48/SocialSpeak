import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navigation from "./components/shared/Navigation";
import Register from "./Pages/Register/Register";
import CustomRegister from "./Pages/Register/CustomRegister";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/custom" element={<CustomRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
