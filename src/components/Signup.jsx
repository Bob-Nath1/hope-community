import React, { useState } from "react";

const Signup = ({ onBackToLogin, onSignupSuccess }) => {
  const [selectedPlans, setSelectedPlans] = useState([]);

  const plans = [
    "Daily Contribution Plan",
    "Weekly Contribution Plan",
    "Monthly Contribution Plan",
    "Investment Plan",
    "Long-Term Growth Plan",
  ];

  const handleCheckboxChange = (plan) => {
    setSelectedPlans((prev) =>
      prev.includes(plan)
        ? prev.filter((p) => p !== plan)
        : [...prev, plan]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Plans:", selectedPlans);
    onSignupSuccess?.(); // Navigate after sign-up
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 relative">
      {/* Logo */}
      <img
        src="/logo.jpg"
        alt="Logo"
        className="relative z-10 mx-auto w-16 h-16 mt-10"
      />

      <h1 className="font-bold text-lg text-blue-950 mt-4">Create Account</h1>

      {/* Sign-Up Form Container */}
      <div className="relative z-10 w-full max-w-md bg-blue-950/90 p-6 rounded-t-3xl shadow-lg mt-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Plan Selection */}
          <div>
            <p className="block text-sm font-medium text-gray-200 mb-2">
              Select your preferred plan(s)
            </p>
            <div className="bg-white/10 rounded-lg p-3 space-y-2">
              {plans.map((plan, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 text-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedPlans.includes(plan)}
                    onChange={() => handleCheckboxChange(plan)}
                    className="accent-yellow-400"
                  />
                  <span>{plan}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 via-white to-yellow-500 text-gray-900 font-semibold py-2 rounded-lg shadow transition-all duration-300 hover:from-yellow-300 hover:via-white hover:to-yellow-600"
          >
            Create Account
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{" "}
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

export default Signup;
