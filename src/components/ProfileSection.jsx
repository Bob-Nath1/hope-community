import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plans: [],
    profilePicture: null
  });
   const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/api/user/profile");
        setUser(data);

        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          plans: data.plans || [],
          avatar: null
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, avatar: file }));
    setPreview(URL.createObjectURL(file));
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
  try {
         const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      if (formData.avatar) payload.append("avatar", formData.avatar);

      const res = await API.put("/api/user/profile", payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    setUser(res.data); // IMPORTANT
    setEditMode(false);
  } catch (err) {
    console.error(err);
  }
};

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">

      {/* ================= AVATAR ================= */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            preview ||
             user.profilePicture ||
            "https://via.placeholder.com/120"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />

        {editMode && (
          <label className="mt-3 cursor-pointer text-sm text-blue-600 font-medium">
            Change Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* ================= VIEW MODE ================= */}
      {!editMode ? (
        <div className="space-y-4">

          <ProfileItem label="Full Name" value={user.name} />
          <ProfileItem label="Email" value={user.email} />
          <ProfileItem label="Phone" value={user.phone} />

          <div>
            <p className="text-gray-500">Plans</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {user.plans?.map(plan => (
                <span
                  key={plan}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {plan}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>

        </div>
      ) : (

        /* ================= EDIT MODE ================= */

        <div className="space-y-4">

          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

/* ================= COMPONENTS ================= */

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-600 mb-1">{label}</label>
    <input
      {...props}
       className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
    />
  </div>
);

export default Profile;
