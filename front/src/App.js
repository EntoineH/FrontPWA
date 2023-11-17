import React from "react";
import "./App.css";
import LoginPage from "./pages/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/resetPassword";
import ConfirmResetPasswordPage from "./pages/confirmResetPassword";
import SuccessResetPassPage from "./pages/successResetPassword";
import withSplashScreen from "./pages/splashScreen";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
          <Route
            path="/confirmresetpassword"
            element={<ConfirmResetPasswordPage />}
          />
          <Route
            path="/successresetpassword"
            element={<SuccessResetPassPage />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
