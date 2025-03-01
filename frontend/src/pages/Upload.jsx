// import { useState } from "react";
// import axios from "axios";

// const Upload = () => {
//   const [title, setTitle] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);

//     // Preview image
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleUpload = async () => {
//     if (!file || !title) {
//       alert("Please provide both a title and an image.");
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "nsbbofmt"); // Your Cloudinary upload preset

//     try {
//       const uploadResponse = await axios.post(
//         "https://api.cloudinary.com/v1_1/dn5ezs1fc/image/upload",
//         formData
//       );

//       const memeData = {
//         title: title,
//         imageUrl: uploadResponse.data.secure_url,
//       };

//       // Simulate saving meme data to your backend
//       console.log("Meme uploaded:", memeData);
//       setUploadSuccess(true);
//       setTitle("");
//       setFile(null);
//       setPreview("");
//     } catch (error) {
//       console.error("Error uploading meme:", error);
//       alert("Failed to upload meme. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-4">Upload a Meme</h1>
//         {uploadSuccess && (
//           <p className="text-green-600 text-center mb-4">Meme uploaded successfully!</p>
//         )}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Meme Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-1 p-2 w-full border rounded"
//             placeholder="Enter meme title"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Upload Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="mt-1 p-2 w-full border rounded"
//           />
//         </div>

//         {preview && (
//           <div className="mb-4">
//             <img src={preview} alt="Meme Preview" className="w-full h-auto rounded-lg" />
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           className={`w-full p-2 text-white rounded ${
//             uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Upload Meme"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Upload;









import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!file || !title) {
      alert("Please provide both a title and an image.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nsbbofmt"); // Your Cloudinary upload preset

    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dn5ezs1fc/image/upload",
        formData
      );

      const memeData = {
        id: Date.now(), // Simple ID for demo
        title: title,
        imageUrl: uploadResponse.data.secure_url,
      };

      // Save meme data to localStorage
      const existingMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
      const updatedMemes = [...existingMemes, memeData];
      localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));

      console.log("Meme uploaded:", memeData);
      setUploadSuccess(true);
      setTitle("");
      setFile(null);
      setPreview("");
    } catch (error) {
      console.error("Error uploading meme:", error);
      alert("Failed to upload meme. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Upload a Meme</h1>
        {uploadSuccess && (
          <p className="text-green-600 text-center mb-4">Meme uploaded successfully!</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Meme Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter meme title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {preview && (
          <div className="mb-4">
            <img src={preview} alt="Meme Preview" className="w-full h-auto rounded-lg" />
          </div>
        )}

        <button
          onClick={handleUpload}
          className={`w-full p-2 text-white rounded ${
            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Meme"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
