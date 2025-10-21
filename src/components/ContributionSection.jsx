import React, { useState } from "react";

const ContributionSection = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState("");
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFrequencySelect = (type) => {
    setFrequency(type);
    if (type === "Monthly") {
      setStep(2);
    } else {
      setStep(3);
      setPlan(type);
      setAmount(type === "Daily" ? 500 : 2000);
    }
  };

  const handlePlanSelect = (planName, planAmount) => {
    setPlan(planName);
    setAmount(planAmount);
    setStep(3);
  };

  // ✅ Improved Back Logic
  const handleBack = () => {
    if (step === 3 && frequency === "Monthly") setStep(2);
    else if (step === 3 && frequency !== "Monthly") setStep(1);
    else if (step === 2) setStep(1);
    else onBack();
  };

  // ✅ Simulated Payment Verification
  const handlePaymentMade = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate
      setIsProcessing(false);

      if (isSuccess) {
        alert(
          `✅ Payment Verified!\n\nContribution Successful!\n\nType: ${frequency}\nPlan: ${plan}\nAmount: ₦${amount.toLocaleString()}\n\nReceipt sent to user and admin.`
        );
        onBack();
      } else {
        alert("❌ Payment not successful. Please retry or contact support.");
      }
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#14213d] text-white flex flex-col items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 text-sm bg-white text-[#14213d] px-4 py-1 rounded-full hover:bg-gray-100"
      >
        ← Back
      </button>

      {/* Step 1: Frequency Selection */}
      {step === 1 && (
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold mb-6">Choose Contribution Type</h1>
          <div className="grid grid-cols-3 gap-4">
            {["Daily", "Weekly", "Monthly"].map((type) => (
              <button
                key={type}
                onClick={() => handleFrequencySelect(type)}
                className="bg-blue-500 hover:bg-blue-600 rounded-xl py-4 px-6 font-semibold transition-all"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Monthly Plan Selection */}
      {step === 2 && (
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold mb-6">Select Monthly Plan</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handlePlanSelect("Monthly Mastermind", 50000)}
              className="bg-yellow-400 hover:bg-yellow-500 text-[#14213d] rounded-xl py-5 px-6 font-semibold shadow-md"
            >
              Monthly Mastermind <br /> ₦50,000
            </button>

            <button
              onClick={() => handlePlanSelect("Monthly Mogul", 10000)}
              className="bg-green-400 hover:bg-green-500 text-[#14213d] rounded-xl py-5 px-6 font-semibold shadow-md"
            >
              Monthly Mogul <br /> ₦10,000
            </button>

            <button
              onClick={() => handlePlanSelect("Elite Contributor", 100000)}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-5 px-6 font-semibold shadow-md"
            >
              Elite Contributor <br /> ₦100,000
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Form */}
      {step === 3 && (
        <div className="bg-white text-[#14213d] p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-center">
            Confirm Contribution
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Plan Type</label>
              <input
                type="text"
                value={plan}
                readOnly
                className="w-full border p-2 rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Amount (₦)</label>
              <input
                type="number"
                value={amount}
                readOnly
                className="w-full border p-2 rounded-md bg-gray-100"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium">
                Payment Method
              </label>
              <select
                className="w-full border p-2 rounded-md"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
              >
                <option value="">Select Payment Method</option>
                <option value="card">Card Payment</option>
                <option value="bank">Bank Transfer</option>
                <option value="wallet">Wallet Balance</option>
              </select>
            </div>

            {/* Conditional Payment Details */}
            {selectedMethod === "card" && (
              <div className="mt-4 space-y-3">
                <p className="text-sm font-semibold">ATM Card Details</p>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border p-2 rounded-md"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 border p-2 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 border p-2 rounded-md"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full border p-2 rounded-md"
                />
              </div>
            )}

            {selectedMethod === "bank" && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold text-sm">Transfer to:</p>
                <p className="text-sm">Account No: <b>7088071833</b></p>
                <p className="text-sm">Account Name: <b>Ogunbunmi Bob</b></p>
                <p className="text-sm">Bank Name: <b>Opay</b></p>
                <p className="text-xs mt-2 text-gray-600">
                  After transfer, click “Payment Made” below.
                </p>
              </div>
            )}

            {selectedMethod === "wallet" && (
              <p className="mt-4 text-sm text-center text-green-600 font-semibold">
                Payment will be deducted from your wallet balance.
              </p>
            )}

            {/* PAYMENT MADE BUTTON */}
            {selectedMethod && (
              <button
                onClick={handlePaymentMade}
                disabled={isProcessing}
                className={`w-full mt-6 ${
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
  );
};

export default ContributionSection;
