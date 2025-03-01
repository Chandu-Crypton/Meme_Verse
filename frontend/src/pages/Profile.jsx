import { useState, useEffect } from "react";
import DarkModeToggle from "../components/DarkModeToggle";

const Profile = () => {
  const [user, setUser] = useState({
    username: "MemeMaster",
    bio: "Professional Meme Connoisseur",
    avatar: "https://via.placeholder.com/100",
  });

  const [userMemes, setUserMemes] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // For toggling the edit modal
  const [editUser, setEditUser] = useState({ ...user }); // Temporary state for editing
  const [preview, setPreview] = useState(user.avatar);

  useEffect(() => {
    const savedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUserMemes(savedMemes);

    // Load profile info from localStorage if available (optional)
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
      setUser(savedProfile);
      setEditUser(savedProfile);
      setPreview(savedProfile.avatar);
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setEditUser({ ...editUser, avatar: reader.result }); // Store preview as avatar (base64)
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    setUser(editUser);
    setIsEditing(false);
    localStorage.setItem("userProfile", JSON.stringify(editUser)); // Persist profile data
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Edit Profile Floating Button */}
      <DarkModeToggle/>
      <button
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleEditToggle}
      >
        Edit Profile
      </button>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="absolute top-4 right-4 bg-white p-6 rounded-lg shadow-lg w-80 z-50">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={editUser.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={editUser.bio}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
            </div>
          )}

          <div className="flex justify-between">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleSaveProfile}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Profile Card */}
      
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-md absolute top-4 left-4">
  <div className="flex items-center gap-4">
    <img
      src={user.avatar}
      alt="Profile Avatar"
      className="w-24 h-24 rounded-full object-cover"
    />
    <div>
      <h1 className="text-2xl font-bold">{user.username}</h1>
      <p className="text-gray-600">{user.bio}</p>
    </div>
  </div>

  {/* Uploaded Memes Grid */}
  <div className="mt-6">
    <h2 className="text-xl font-bold mb-4">Your Memes</h2>
    {userMemes.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userMemes.map((meme) => (
          <div key={meme.id} className="border rounded-lg overflow-hidden">
            <img
              src={meme.imageUrl}
              alt={meme.title}
              className="w-full h-32 object-cover"
            />
            <p className="text-center p-2 font-medium">{meme.title}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">You haven't uploaded any memes yet.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default Profile;
