import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const SupportSection = ({ onBack }) => {
  const [issue, setIssue] = useState("");

 const submitIssue = async () => {
  if (!issue.trim()) {
    alert("Please describe your issue first.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: issue.trim() }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Your issue has been submitted.");
      setIssue("");
    } else {
      alert(data.message || "Request failed");
    }
  } catch (err) {
    console.error(err);
    alert("Network error: " + err.message);
  }
};



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <button
          onClick={onBack}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Support Center</h2>
        <div className="w-8" /> {/* Spacer for symmetry */}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Intro */}
        <section className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Need Help?
          </h3>
          <p className="text-sm text-gray-500">
            We’re here to help you resolve issues and answer your questions.
          </p>
        </section>

        {/* Contact Options */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <h4 className="font-semibold text-lg mb-2">Chat with Support</h4>
            <p className="text-sm text-gray-500 mb-3">
              Get real-time help from our support team.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <h4 className="font-semibold text-lg mb-2">Email / Call Us</h4>
            <p className="text-sm text-gray-500 mb-3">
              Reach out via email or phone for quick help.
            </p>
            <p className="text-sm">
              <strong>Email:</strong> support@yourapp.com
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> +234 800 123 4567
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h4 className="font-semibold text-lg mb-4">Frequently Asked Questions</h4>

          <details className="bg-gray-100 rounded-lg p-3 mb-2">
            <summary className="font-medium cursor-pointer">
              How do I make a contribution?
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              Go to the Contribution section, select your plan, and follow the payment process.
            </p>
          </details>

          <details className="bg-gray-100 rounded-lg p-3 mb-2">
            <summary className="font-medium cursor-pointer">
              Can I withdraw my investment anytime?
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              Withdrawals are subject to plan terms. Check the Investment section for details.
            </p>
          </details>

          <details className="bg-gray-100 rounded-lg p-3 mb-2">
            <summary className="font-medium cursor-pointer">
              How do I contact admin directly?
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              Use the “Chat with Support” or “Email Us” options above.
            </p>
          </details>
        </section>

        {/* Report a Problem */}
        <section>
          <h4 className="font-semibold text-lg mb-2">Other Questions</h4>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Ask other questions..."
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          ></textarea>
       <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={submitIssue}>Submit</button>

        </section>
      </main>
    </div>
  );
};

export default SupportSection;
