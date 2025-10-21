import React, { useState } from "react";

const LoanSection = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    amount: "",
    reason: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Loan application submitted successfully!");
  };

  return (
    <div className="w-full h-screen flex bg-white text-[#14213d] font-inter overflow-hidden">
      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 bg-[#14213d] text-white rounded-[32px] m-4 p-6 flex flex-col overflow-y-auto">
        <header className="flex justify-between items-center mt-4 mb-8">
          <h2 className="text-2xl font-bold">Loan Application</h2>
          <button
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            ← Back
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-[#14213d] p-6 rounded-xl w-full max-w-md shadow-md mx-auto"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Loan Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Reason for Loan</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="State the reason for applying"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">
              Repayment Duration (in months)
            </label>
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Submit Application
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoanSection;
