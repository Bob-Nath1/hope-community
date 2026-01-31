import React, { useState } from "react";

const InvestmentSection = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    { name: "Starter Plan", amount: 50000, duration: "3 Months", returns: "₦65,000 (30% ROI)" },
    { name: "Pro Plan", amount: 100000, duration: "6 Months", returns: "₦140,000 (40% ROI)" },
    { name: "Elite Plan", amount: 250000, duration: "12 Months", returns: "₦400,000 (60% ROI)" },
  ];

 const handlePaymentMade = async () => {
  if (!selectedPlan || !selectedMethod) {
    alert("Please select a plan and payment method");
    return;
  }

  setIsProcessing(true);

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/investment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        planName: selectedPlan.name,
        amount: selectedPlan.amount,
        duration: selectedPlan.duration,
        expectedReturn: selectedPlan.returns,
        paymentMethod: selectedMethod,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert(
        `${data.message}\n\nPlan: ${selectedPlan.name}\nAmount: ₦${selectedPlan.amount.toLocaleString()}\nWe'll notify you once verified!`
      );
      setSelectedPlan(null);
      setSelectedMethod("");
    } else {
      alert(data.message || "Investment failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error. Check your connection and try again.");
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <div className="w-full min-h-screen bg-[#14213d] text-white flex flex-col items-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 bg-white text-[#14213d] px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200"
      >
        ← Back
      </button>

      <div className="text-center mb-8 mt-14">
        <h1 className="text-2xl font-bold">Investment Plans</h1>
        <p className="text-gray-300 text-sm mt-1">
          Choose a plan and start growing your wealth today.
        </p>
      </div>

      {/* Investment Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border-2 p-6 transition-all duration-300 ${
              selectedPlan?.name === plan.name
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-white/20 hover:border-yellow-300"
            }`}
          >
            {/* Clickable plan card */}
            <div
              onClick={() => {
                setSelectedPlan(plan);
                setSelectedMethod("");
              }}
              className="cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-1 text-gray-300 text-sm">{plan.duration}</p>
              <p className="mt-3 text-xl font-bold text-yellow-400">
                ₦{plan.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-300 mt-1">{plan.returns}</p>
            </div>

            {/* Show payment form directly below this plan */}
            {selectedPlan?.name === plan.name && (
              <div className="bg-white text-[#14213d] p-6 rounded-2xl shadow-lg mt-6">
                <h1 className="text-lg font-bold mb-3 text-center">
                  Confirm Investment
                </h1>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium">Plan</label>
                    <input
                      type="text"
                      value={selectedPlan.name}
                      readOnly
                      className="w-full border p-2 rounded-md bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Amount (₦)</label>
                    <input
                      type="text"
                      value={selectedPlan.amount}
                      readOnly
                      className="w-full border p-2 rounded-md bg-gray-100"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium">Payment Method</label>
                    <select
                      className="w-full border p-2 rounded-md"
                      value={selectedMethod}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="card">Card Payment</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>

                  {/* Card Payment */}
                  {selectedMethod === "card" && (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm font-semibold">ATM Card Details</p>
                      <input type="text" placeholder="Card Number" className="w-full border p-2 rounded-md" />
                      <div className="flex gap-2">
                        <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded-md" />
                        <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded-md" />
                      </div>
                      <input type="text" placeholder="Card Holder Name" className="w-full border p-2 rounded-md" />
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {selectedMethod === "bank" && (
                    <div className="mt-3 bg-gray-100 p-4 rounded-lg">
                      <p className="font-semibold text-sm">Transfer to:</p>
                      <p className="text-sm">Account No: <b>7088071833</b></p>
                      <p className="text-sm">Account Name: <b>Ogunbunmi Bob</b></p>
                      <p className="text-sm">Bank Name: <b>Opay</b></p>
                      <p className="text-xs mt-2 text-gray-600">
                        After transfer, click “Payment Made” below.
                      </p>
                    </div>
                  )}

                  {/* PAYMENT MADE */}
                  {selectedMethod && (
                    <button
                      onClick={handlePaymentMade}
                      disabled={isProcessing}
                      className={`w-full mt-4 ${
                        isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                      } text-white py-2 rounded-lg font-semibold`}
                    >
                      {isProcessing ? "Verifying..." : "PAYMENT MADE"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentSection;
