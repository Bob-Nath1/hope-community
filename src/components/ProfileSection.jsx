import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ProfileSection = ({ onBack }) => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+234 800 123 4567",
    plan: "Monthly Mastermind",
    totalContribution: "₦150,000",
    nextDue: "Oct 30, 2025",
    profilePic: null,
  });

  const [editMode, setEditMode] = useState(false);

  // ✅ Load saved profile picture (if any) from localStorage
  useEffect(() => {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
      setUserData((prev) => ({ ...prev, profilePic: savedPic }));
    }
  }, []);

  // ✅ Handle photo upload and save to localStorage
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profilePic: reader.result }));
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file); // convert image to base64 for storage
    }
  };

  // ✅ Handle editing of text fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-4"
      >
        <IoArrowBack size={20} /> Back
      </button>

      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          {userData.profilePic ? (
            <img
              src={userData.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <FaUserCircle className="text-blue-400 w-28 h-28" />
          )}

          <label className="mt-2 cursor-pointer text-sm text-blue-500 hover:underline">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <h2 className="text-xl font-bold mt-3">{userData.name}</h2>
          <p className="text-gray-500">{userData.plan}</p>

          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-3 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            <FaEdit /> {editMode ? "Save" : "Edit"}
          </button>
        </div>

        {/* Editable Info Section */}
        <div className="mt-6 text-left space-y-3">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full border ${
                editMode ? "border-blue-400" : "border-transparent"
              } rounded-md px-3 py-2 bg-gray-50 focus:outline-none`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full border ${
                editMode ? "border-blue-400" : "border-transparent"
              } rounded-md px-3 py-2 bg-gray-50 focus:outline-none`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full border ${
                editMode ? "border-blue-400" : "border-transparent"
              } rounded-md px-3 py-2 bg-gray-50 focus:outline-none`}
            />
          </div>

          <div className="flex justify-between mt-4 border-t pt-3">
            <div>
              <p className="text-gray-600 text-sm">Total Contributed</p>
              <p className="font-bold text-lg text-green-700">
                {userData.totalContribution}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Next Due</p>
              <p className="font-bold text-lg text-red-600">
                {userData.nextDue}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mt-6 text-center">
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
