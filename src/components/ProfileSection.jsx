import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const API_BASE = "https://hope-backend-1-1mpmx.onrender.com";

const ProfileSection = ({ onBack }) => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editedData, setEditedData] = useState(null);

  /* ===============================
     FETCH LOGGED-IN USER
  =============================== */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      setEditedData({ ...userData });
    }
  }, [userData]);

  const handleChange = (e) => {
    setEditedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setUserData({ ...editedData });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedData({ ...userData });
    setEditMode(false);
  };

  /* ===============================
     UPLOAD PROFILE PICTURE
  =============================== */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_BASE}/api/users/profile-picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      setUserData((prev) => ({
        ...prev,
        profilePicture: data.profilePicture,
      }));
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-4"
      >
        <IoArrowBack size={20} /> Back
      </button>

      {/* PROFILE CARD */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto text-center">

        {/* PROFILE IMAGE */}
        {userData.profilePicture ? (
          <img
            src={`${API_BASE}${userData.profilePicture}`}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 mx-auto"
          />
        ) : (
          <FaUserCircle className="text-blue-400 w-28 h-28 mx-auto" />
        )}

        <label className="mt-2 cursor-pointer text-sm text-blue-500 hover:underline block">
          Upload profile photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <h2 className="text-xl font-bold mt-3">{userData.name}</h2>
        <p className="text-gray-500">
          {userData.planName || "No plan selected"}
        </p>

        {/* EDIT BUTTONS */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="mt-3 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mx-auto"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex justify-center gap-3 mt-3">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-5 py-2 rounded-full"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-5 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        )}

        {/* USER DETAILS */}
        <div className="mt-6 text-left space-y-3">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              value={editMode ? editedData?.name ?? "" : userData.name}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full border rounded-md px-3 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={userData.email}
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              value={editMode ? editedData?.phone ?? "" : userData.phone}
              onChange={handleChange}
              readOnly={!editMode}
              className="w-full border rounded-md px-3 py-2 bg-gray-50"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="mt-6 space-y-4 border-t pt-4 text-left">
          <p><strong>Total Contributed:</strong> ₦{userData.totalContribution || 0}</p>
          <p><strong>Total Invested:</strong> ₦{userData.totalInvestment || 0}</p>
          <p><strong>Total Withdrawn:</strong> ₦{userData.totalWithdrawals || 0}</p>
        </div>
      </div>

      {/* BADGES */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto mt-6 text-center">
        <h3 className="font-semibold text-gray-700 mb-3">Badges & Progress</h3>
        <div className="flex justify-center gap-4">
          <div className="bg-yellow-100 px-4 py-2 rounded-full text-yellow-800 text-sm font-semibold">
            Consistent Saver 🏅
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-full text-green-800 text-sm font-semibold">
            Loyal Member 💚
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileSection;







