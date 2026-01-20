import React, { useState } from "react";
import API from "../api/axios"; // ✅ import your axios instance

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // ✅ Send the email to your backend
      const { data } = await API.post("/api/auth/forgot-password", { email });
      setMessage(data.message || "✅ Password reset link sent to your email.");
      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);
      setMessage(
        err.response?.data?.message ||
          "❌ Failed to send reset link. Please check the email and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 relative">
      {/* Logo */}
      <img
        src="/logo.jpg"
        alt="Logo"
        className="relative z-10 mx-auto w-16 h-16 mt-10"
      />

      <h1 className="font-bold text-lg text-blue-950 mt-4">
        Reset Your Password
      </h1>

      {/* Forgot Password Card */}
      <div className="relative z-10 w-full max-w-md bg-blue-950/90 p-6 rounded-t-3xl shadow-lg mt-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Forgot Password</h2>
          <p className="text-sm text-gray-300 mt-2">
            Enter your registered email to receive a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address / ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 via-white to-yellow-500 text-gray-900 font-semibold py-2 rounded-lg shadow transition-all duration-300 hover:from-yellow-300 hover:via-white hover:to-yellow-600"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Show success or error message */}
        {message && (
          <p className="text-center text-sm text-gray-200 mt-4">{message}</p>
        )}

        {/* Back to login */}
        <p className="text-center text-sm text-gray-300 mt-5">
          Remembered your password?{" "}
          <button
            onClick={onBackToLogin}
            className="text-yellow-400 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
