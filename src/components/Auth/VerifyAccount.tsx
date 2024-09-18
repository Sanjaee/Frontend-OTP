import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAccount: React.FC = () => {
  const [countdown, setCountdown] = useState(10); // Set initial countdown time (10 detik)
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/"); // Redirect to login page when countdown reaches 0
    }

    // Mengurangi hitungan setiap detik
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Membersihkan interval ketika komponen unmount
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img className="w-48" src="./email.gif" alt="Email sent" />
      <h1 className="text-2xl font-semibold">
        Please check your email to verify your account
      </h1>
      <p className="mt-4 text-red-600">
        Redirecting to login page in {countdown} seconds...
      </p>
    </div>
  );
};

export default VerifyAccount;
