// frontend/src/components/LoanSection.jsx
import React, { useState } from "react";

const LoanSection = ({ onBack }) => {
  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/loan/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: formData.amount,
          reason: formData.reason,
          duration: formData.duration,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Loan application submitted successfully!");
        setFormData({ amount: "", reason: "", duration: "" });
      } else {
        alert(data.message || "Error submitting loan");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="w-full h-screen flex bg-white text-[#14213d] font-inter overflow-hidden">
      <main className="flex-1 bg-[#14213d] text-white rounded-[32px] m-4 p-6 flex flex-col overflow-y-auto">
        <header className="flex justify-between items-center mt-4 mb-8">
          <h2 className="text-2xl font-bold">Loan Application</h2>
          <button onClick={onBack} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium">
            ← Back
          </button>
        </header>

        <form onSubmit={handleSubmit} className="bg-white text-[#14213d] p-6 rounded-xl w-full max-w-md shadow-md mx-auto">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Loan Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 100000"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Reason for Loan</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Explain why you need the loan..."
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Repayment Duration (months)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 6"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-bold text-lg transition duration-200"
          >
            Submit Application
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoanSection;
