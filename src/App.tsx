import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { InputOTPForm } from "./components/Auth/Verify";
import { Toaster } from "./components/ui/toaster";
import Login from "./components/Auth/Login";
import Dashboard from "./Pages/Dashboard";
import ResetPassword from "./components/Auth/ResetPassword";
import SendResetPassword from "./components/Auth/SendResetPassword";
import VerifyPassword from "./components/Auth/VerifyPassword";
import VerifyAccount from "./components/Auth/VerifyAccount";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify-email" element={<VerifyAccount />} />
          <Route path="/verify" element={<InputOTPForm />} />
          <Route path="/register" element={<Home />} />
          <Route path="/forgot-password" element={<SendResetPassword />} />
          <Route path="/verify-password" element={<VerifyPassword />} />
          <Route path="/reset-password/:otp" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
