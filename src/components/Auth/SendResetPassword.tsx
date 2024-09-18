import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

const SendResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle send reset password OTP
  const handleSendOTP = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/send-reset-otp`,
        { email }
      );
      setMessage(response.data.message);
      
      navigate("/verify-password");

      toast({
        title: "Success",
        description: response.data.message,
        variant: "success",
      })
    } catch (error: any) {
      if(error.response.status == 403) {
        toast({
            
          title: "Error",
          description: "email tidak terdaftar",
          variant: "destructive",
        })
    }
      setMessage(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Send Reset Password OTP</h1>

        {message && (
          <p
            className={`mb-4 ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Enter your email"
          />
        </div>

        <button
          onClick={handleSendOTP}
          disabled={loading}
          className={`w-full py-2 px-4 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending To Email..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default SendResetPassword;
