import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/landing.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
<<<<<<< HEAD
);
=======
);
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
