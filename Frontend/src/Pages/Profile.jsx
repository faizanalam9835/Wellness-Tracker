import React, { useState, useEffect } from 'react';

// Simple SVG Icons
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055zM13 21v-5l-1-1-1 1v5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 21v-5l-1-1-1 1v5m0 0H9m4 0h2m-2-5a1 1 0 10-2 0 1 1 0 002 0z" />
  </svg>
);

// Main Profile Component
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State management
  const [userData, setUserData] = useState({
    name: "Loading...",
    email: "Loading...",
    contact: "Loading...",
    goal: "Loading..."
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "", 
    contact: "",
    goal: ""
  });

  // Fetch user profile data - SIMPLE AND RELIABLE
  const fetchUserProfile = async () => {
    console.log("🟢 Starting to fetch user profile...");
    setLoading(true);
    setError(null);
    
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem("id");
      console.log("🟢 User ID from localStorage:", userId);
      
      if (!userId) {
        throw new Error("No user ID found. Please login again.");
      }
      
      // Make API call
      console.log("🟢 Making API call to:", `http://localhost:4300/users/${userId}`);
      const response = await fetch(`http://localhost:4300/users/${userId}`);
      
      console.log("🟢 Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("🟢 API Response data:", data);
      
      // Update state with API data
      const updatedUserData = {
        name: data.name || "User",
        email: data.email || "No email provided",
        contact: data.contact || "No contact provided",
        goal: data.goal || "Stay consistent with wellness habits"
      };
      
      setUserData(updatedUserData);
      setEditData(updatedUserData);
      
      console.log("🟢 User data updated successfully");
      
    } catch (err) {
      console.error("🔴 Error fetching profile:", err);
      setError(err.message || "Failed to load profile data");
      
      // Set default data on error
      setUserData({
        name: "Guest User",
        email: "user@example.com",
        contact: "+91 00000 00000",
        goal: "Start your wellness journey"
      });
    } finally {
      setLoading(false);
      console.log("🟢 Loading set to false");
    }
  };

  // Update user profile
  const updateUserProfile = async () => {
    console.log("🟢 Starting profile update...");
    setLoading(true);
    setError(null);
    
    try {
      const userId = localStorage.getItem("id");
      console.log("🟢 Updating user:", userId);
      
      const response = await fetch(`http://localhost:4300/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });
      
      console.log("🟢 Update response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to update: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("🟢 Update successful:", data);
      
      // Update local state
      setUserData({ ...editData });
      setIsEditing(false);
      
    } catch (err) {
      console.error("🔴 Error updating profile:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = () => {
    console.log("🟢 Entering edit mode");
    setEditData({ ...userData });
    setIsEditing(true);
    setError(null);
  };

  // Handle save button click
  const handleSave = async (e) => {
    e.preventDefault();
    console.log("🟢 Saving profile changes");
    
    // Simple validation
    if (!editData.name.trim()) {
      setError("Name is required");
      return;
    }
    
    if (!editData.email.trim()) {
      setError("Email is required");
      return;
    }
    
    await updateUserProfile();
  };

  // Handle cancel button click
  const handleCancel = () => {
    console.log("🟢 Cancelling edits");
    setEditData({ ...userData });
    setIsEditing(false);
    setError(null);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Load profile data on component mount
  useEffect(() => {
    console.log("🟢 Profile component mounted");
    fetchUserProfile();
  }, []);

  // Show loading state
  if (loading && userData.name === "Loading...") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900 font-bold text-lg"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Debug Info - Remove in production */}
        <div className="mb-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Debug:</strong> User ID: {localStorage.getItem("id") || "Not found"} | 
            Loading: {loading ? "Yes" : "No"} | 
            Editing: {isEditing ? "Yes" : "No"}
          </p>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Profile
          </h1>
          {!isEditing && (
            <button 
              onClick={handleEdit}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-white hover:bg-gray-50 transition-colors font-semibold shadow-lg w-full sm:w-auto justify-center border border-gray-200"
            >
              <EditIcon />
              <span>{loading ? 'Loading...' : 'Edit Profile'}</span>
            </button>
          )}
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Picture Section */}
            <section className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-4xl text-white shadow-lg mb-4">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full text-center bg-gray-100 rounded-lg px-4 py-2 mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold border border-gray-300"
                  placeholder="Enter your name"
                />
              ) : (
                <h2 className="text-xl font-bold text-center">{userData.name}</h2>
              )}
              <p className="text-gray-600 text-center mt-2">Wellness Enthusiast</p>
            </section>
            
            {/* Contact Details Section */}
            <section className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Details</h3>
              
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center space-x-2 mb-2">
                    <UserIcon />
                    <span>Full Name</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-lg">{userData.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center space-x-2 mb-2">
                    <MailIcon />
                    <span>Email Address</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-lg">{userData.email}</p>
                  )}
                </div>

                {/* Contact Field */}
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center space-x-2 mb-2">
                    <PhoneIcon />
                    <span>Contact Number</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                      placeholder="Enter your contact number"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-lg">{userData.contact}</p>
                  )}
                </div>

                {/* Goal Field */}
                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">
                    Wellness Goal
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editData.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                      rows="3"
                      className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                      placeholder="What's your wellness goal?"
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{userData.goal}</p>
                  )}
                </div>
              </div>

              {/* Edit Mode Buttons */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
                  <button 
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors font-semibold text-gray-800 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold text-white disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wellness Stats */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Wellness Stats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200">
                  <TrophyIcon className="mx-auto text-blue-600 h-8 w-8 mb-3" />
                  <p className="text-2xl font-bold text-gray-800">12</p>
                  <p className="text-sm text-gray-600 mt-1">Total Habits</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center border border-green-200">
                  <TrophyIcon className="mx-auto text-green-600 h-8 w-8 mb-3" />
                  <p className="text-2xl font-bold text-gray-800">7</p>
                  <p className="text-sm text-gray-600 mt-1">Current Streak</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center border border-purple-200">
                  <TrophyIcon className="mx-auto text-purple-600 h-8 w-8 mb-3" />
                  <p className="text-2xl font-bold text-gray-800">21</p>
                  <p className="text-sm text-gray-600 mt-1">Longest Streak</p>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Morning Meditation</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Completed</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">30-min Exercise</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">Pending</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Water Intake</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Completed</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}