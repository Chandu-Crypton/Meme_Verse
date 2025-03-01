import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaThumbsUp, FaComment, FaShareAlt } from "react-icons/fa";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchMemeDetails = async () => {
      try {
        console.log("Current id from URL:", id);
  
        const response = await axios.get(`https://api.imgflip.com/get_memes`);
  
        console.log("Fetched memes:", response.data.data.memes);
  
        const foundMeme = response.data.data.memes.find(
          (m) => m.id.toString() === id
        );
  
        if (foundMeme) {
          setMeme(foundMeme);
          setLikes(foundMeme.likes || 0); // Optional: depends if your backend has `likes`
        } else {
          console.error("Meme not found");
        }
      } catch (error) {
        console.error("Error fetching meme details:", error);
      }
    };
  
    fetchMemeDetails();
  }, [id]);
  

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
   
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        text: newComment,
        id: Date.now(), // temporary ID
      };
      setComments([...comments, comment]);
      setNewComment("");
      // You could also send this to a backend API to persist comments
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  if (!meme) {
    return <div className="text-center p-6">Loading meme details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl  font-bold text-center mb-4">{meme.name}</h1>
        <img src={meme.url} alt={meme.name} className="w-full rounded mb-4" />

        <div className="flex items-center justify-between mb-4">
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLike}
          >
            <FaThumbsUp /> {likes} Likes
          </button>

          <button
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleShare}
          >
            <FaShareAlt /> Share
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Comments</h2>
          <div className="space-y-2">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="p-2 border-b">
                  {comment.text}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 border rounded-l"
            />
            <button
              onClick={handleAddComment}
              className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              <FaComment />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeDetails;

