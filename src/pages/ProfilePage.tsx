import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NavBar from "../Components/layout/Navbar";

const ProfilePage: React.FC = () => {
  const { user, token } = useAuth(); // Assuming token is stored in the AuthContext
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Fetch the user's profile data from the backend when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });
        const data = await response.json();
        setDisplayName(data.displayName || "");
        setDescription(data.description || "");
        setProfileImage(data.profileImage || null);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSaveName = async () => {
    try {
      await fetch("http://localhost:5000/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ displayName }),
      });
      setIsEditingName(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleSaveDescription = async () => {
    try {
      await fetch("http://localhost:5000/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });
      setIsEditingDescription(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await fetch(
          "http://localhost:5000/auth/profile/upload",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          setProfileImage(data.profileImage); // Use the uploaded image URL from the backend response
        } else {
          console.error("Error uploading profile image:", data.message);
        }
      } catch (err) {
        console.error("Error uploading profile image:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 p-8 flex flex-col items-center">
      {/* Include NavBar */}
      <NavBar />

      {/* Profile Section */}
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="max-w-md bg-white p-8 rounded-2xl shadow-lg transform transition hover:scale-105 duration-300">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-md border-4 border-purple-300"
            />
          </div>

          {/* Upload Profile Picture */}
          <div className="flex justify-center mb-6">
            <label className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-purple-700 transition duration-300">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile Information */}
          <h2 className="text-3xl font-bold mb-6 text-gray-700 text-center">
            Profile
          </h2>

          {/* Display Name Field */}
          <div className="mb-4 text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Display Name:
            </h3>
            {isEditingName ? (
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  className="w-3/4 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <button
                  onClick={handleSaveName}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs hover:bg-green-600 focus:outline-none transition duration-300"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-gray-700 text-lg">{displayName}</p>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="ml-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs hover:bg-purple-600 focus:outline-none transition duration-300"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-4 text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Description:
            </h3>
            {isEditingDescription ? (
              <div className="flex items-center justify-center">
                <textarea
                  className="w-3/4 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                <button
                  onClick={handleSaveDescription}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs hover:bg-green-600 focus:outline-none transition duration-300"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-gray-700 text-lg">{description}</p>
                <button
                  onClick={() => setIsEditingDescription(true)}
                  className="ml-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs hover:bg-purple-600 focus:outline-none transition duration-300"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
