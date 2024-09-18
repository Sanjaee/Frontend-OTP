import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { otp } = useParams<{ otp: string }>();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        `http://localhost:8000/auth/reset-password/${otp}`,
        {
          newPassword,
        }
      );
      setMessage(response.data.message);
      navigate("/");
    } catch (error: any) {
      setError("URL Expired to reset password,Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Reset Password
        </h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-6 relative">
          <label
            htmlFor="newPassword"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showNewPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="mb-6 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showNewPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-full py-3 text-lg font-medium text-white bg-black hover:bg-gray-700 rounded-lg transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
