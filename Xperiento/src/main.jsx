import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./store/User_Context.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
    <ToastContainer />
  </UserProvider>
);
