import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ token, onBackToLogin }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => onBackToLogin(), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded">Reset Password</button>
        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
