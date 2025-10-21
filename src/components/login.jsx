import React, { useState } from "react";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

const Login = ({ onLoginSuccess }) => {
  const [view, setView] = useState("login"); // login | signup | forgot

  if (view === "signup") {
    return (
      <Signup
        onBackToLogin={() => setView("login")}
        onSignupSuccess={onLoginSuccess}
      />
    );
  }

  if (view === "forgot") {
    return <ForgotPassword onBackToLogin={() => setView("login")} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 relative">
      {/* Logo */}
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

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onLoginSuccess();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address / ID
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            className="w-full bg-gradient-to-r from-yellow-400 via-white to-yellow-500 text-gray-900 font-semibold py-2 rounded-lg shadow transition-all duration-300 hover:from-yellow-300 hover:via-white hover:to-yellow-600"
          >
            Login
          </button>
        </form>

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
