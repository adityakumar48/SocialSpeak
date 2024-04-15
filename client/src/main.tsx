import ReactDOM from "react-dom/client";

import "./index.css";

import { Toaster } from "./components/ui/sonner.tsx";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App.tsx";

// const user = {
//   activated: false,
// };

// const isAuth = false;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
