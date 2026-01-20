import React, { useState } from "react";

const ReportSection = ({ onBack }) => {
  const [reports, setReports] = useState([
    {
      id: "RPT-2025-001",
      type: "Complaint",
      message: "My last contribution didn’t reflect yet.",
      date: "10 Oct 2025",
      status: "Pending Review",
    },
    {
      id: "RPT-2025-002",
      type: "Feedback",
      message: "I love the new investment dashboard!",
      date: "7 Oct 2025",
      status: "Reviewed",
    },
  ]);

  const [form, setForm] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.type || !form.message.trim()) {
    return alert("Please select a type and write a message");
  }

  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/user/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.type,
        message: form.message.trim(),
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Report submitted! Admin will respond soon.");
      setForm({ type: "", message: "" });
      // Optional: refresh reports from server
    } else {
      alert(data.message || "Failed to submit");
    }
  } catch (err) {
    alert("Network error. Please try again.");
  }
};



  return (
    <div className="bg-[#14213d] text-white rounded-[32px] m-4 p-6 flex flex-col overflow-y-auto min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Reports & Feedback</h2>
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg text-white"
        >
          ← Back
        </button>
      </header>

      {/* Report Form */}
      <section className="bg-white text-[#14213d] rounded-2xl p-5 shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Submit a Report or Feedback</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Report Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Type</option>
              <option value="Complaint">Complaint</option>
              <option value="Feedback">Feedback</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Issue">Issue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your experience or issue here..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold"
          >
            Submit Report
          </button>
        </form>
      </section>

      {/* Report History */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Your Previous Reports</h3>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white text-[#14213d] p-4 rounded-xl shadow-md flex flex-col sm:flex-row justify-between sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-semibold">{report.type}</p>
                <p className="text-sm text-gray-600">{report.message}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {report.date}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    report.status === "Reviewed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReportSection;
