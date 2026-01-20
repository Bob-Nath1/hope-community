// frontend/src/components/Login.jsx
import React, { useState } from "react";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Switch between signup / forgot / login views
  if (view === "signup") {
    return (
      <Signup
        onBackToLogin={() => setView("login")}
        onSignupSuccess={() => setView("login")}
      />
    );
  }

  if (view === "forgot") {
    return <ForgotPassword onBackToLogin={() => setView("login")} />;
  }

  // ⭐ UPDATED LOGIN LOGIC
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data } = await API.post("/api/auth/login", { email, password });

      // Validate account status
      if (data.user.status !== "active") {
        setMessage(`❌ Account is ${data.user.status}. Contact support.`);
        localStorage.clear();
        setLoading(false);
        return;
      }

      // Save user session
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      setMessage("✅ Login successful!");

      // Notify parent component with user data
      onLoginSuccess?.(data.user);

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Invalid email or password");
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 relative">
      <img
        src="/the-logo.jpg"
        alt="Logo"
        className="relative z-10 mx-auto w-16 h-16 mt-27"
      />
      <h1 className="font-bold text-lg text-blue-950 mt-4">Welcome Back!</h1>

      <div className="relative z-10 w-full max-w-md bg-blue-950/90 p-6 rounded-t-3xl shadow-lg mt-30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Sign In</h2>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address / ID
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-400" />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setView("forgot")}
              className="text-yellow-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 via-white to-yellow-500 text-gray-900 font-semibold py-2 rounded-lg shadow transition-all duration-300 hover:from-yellow-300 hover:via-white hover:to-yellow-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-200 mt-3">{message}</p>
        )}

        <p className="text-center text-sm text-gray-300 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => setView("signup")}
            className="text-yellow-400 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
