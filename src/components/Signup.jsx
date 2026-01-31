import React, { useState } from "react";
import API from "../api/axios";

const Signup = ({ onBackToLogin, onSignupSuccess }) => {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    securityQuestion: "",
    securityAnswer: "",
    idDocument: null,
    profilePicture: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ✅ BACKEND-FRIENDLY PLAN DEFINITIONS */
  const plans = [
    { code: "daily", label: "Daily Contribution Plan" },
    { code: "weekly", label: "Weekly Contribution Plan" },
    { code: "monthly", label: "Monthly Contribution Plan" },
    { code: "investment", label: "Investment Plan" },
    { code: "mogul", label: "Long-Term Growth Plan" },
  ];

  const handleCheckboxChange = (code) => {
    setSelectedPlans((prev) =>
      prev.includes(code)
        ? prev.filter((p) => p !== code)
        : [...prev, code]
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  console.log("Selected plans (state):", selectedPlans);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!formData.dateOfBirth) {
      return setError("Date of birth is required.");
    }

    const dob = new Date(formData.dateOfBirth);
    const age =
      new Date().getFullYear() -
      dob.getFullYear() -
      (new Date() <
      new Date(dob.setFullYear(new Date().getFullYear()))
        ? 1
        : 0);

    if (age < 18) {
      return setError("You must be at least 18 years old to register.");
    }

    if (selectedPlans.length === 0) {
      return setError("Please select at least one plan.");
    }

    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      /* ✅ SEND PLAN CODES */
      payload.append("plans", JSON.stringify(selectedPlans));

      /* ✅ DEBUG: CONFIRM PAYLOAD CONTENT */
      for (let pair of payload.entries()) {
        console.log("FormData:", pair[0], pair[1]);
      }

      const { data } = await API.post("/api/auth/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      onSignupSuccess?.();
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-amber-50">
      <h1 className="mt-10 font-bold text-lg text-blue-950">Create Account</h1>

      <div className="w-full max-w-md bg-blue-950/90 p-6 rounded-t-3xl mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />
          <Input label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          <Input label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} required />

          {/* ✅ BANK DETAILS */}
          <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
          <Input label="Account Name" name="accountName" value={formData.accountName} onChange={handleChange} />
          <Input label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />

          {/* ✅ SECURITY */}
          <Input label="Security Question" name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} />
          <Input label="Security Answer" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} />

          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          {/* ✅ PLANS */}
          <div>
            <p className="text-gray-200 text-sm mb-2">Select your plan(s)</p>
            <div className="bg-white/10 p-3 rounded-lg space-y-2">
              {plans.map((p) => (
                <label key={p.code} className="flex items-center gap-2 text-gray-200">
                  <input
                    type="checkbox"
                    name="plans"
                    checked={selectedPlans.includes(p.code)}
                    onChange={() => handleCheckboxChange(p.code)}
                    className="accent-yellow-400"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <button onClick={onBackToLogin} className="text-yellow-400 hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", ...props }) => (
  <div>
    <label className="block text-sm text-gray-200 mb-1">{label}</label>
    <input type={type} {...props} className="w-full px-4 py-2 rounded-lg" />
  </div>
);

export default Signup;

