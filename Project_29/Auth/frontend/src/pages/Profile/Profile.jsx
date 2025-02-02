// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ProfilePage = () => {
  const { authUser, setAuthUser } = useAuthContext(); // Get user details from context
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
    age: authUser?.age || "",
    address: authUser?.address || "",
    gender: authUser?.gender || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setAuthUser({ ...authUser, ...formData });
    localStorage.setItem("user", JSON.stringify({ ...authUser, ...formData }));
    setIsEditing(false);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // Format the date in a readable way
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-grey">
      <div className="bg-white shadow-xl rounded-lg p-6 w-96 text-center flex flex-col justify-between">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={authUser?.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">{formData.fullName}</h1>
        
        {/* Join Date Displayed near Name */}
        <p className="text-gray-600 text-sm"><strong>Since:</strong> {formatDate(authUser?.createdAt)}</p>

        <p className="text-gray-600">{formData.email}</p>

        {/* Profile Details */}
        <div className="mt-4 text-left">
          <p className="text-gray-700"><strong>Phone:</strong> {formData.phone || "Not provided"}</p>
          <p className="text-gray-700"><strong>Age:</strong> {formData.age || "Not provided"}</p>
          <p className="text-gray-700"><strong>Gender:</strong> {formData.gender || "Not provided"}</p>
          <p className="text-gray-700"><strong>Address:</strong> {formData.address || "Not provided"}</p>
          </div>

        {/* Edit Profile Button */}
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </button>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

              {/* Form Fields */}
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Full Name" />
              <input type="email" name="email" value={formData.email} readOnly className="w-full p-2 border rounded mb-2 bg-gray-100 cursor-not-allowed" />
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Phone" />
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Age" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Address" />

              {/* Save & Cancel Buttons */}
              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

        <Link to="/" className="mt-6 text-blue-500 text-sm hover:underline hover:text-black self-center">
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default ProfilePage;
