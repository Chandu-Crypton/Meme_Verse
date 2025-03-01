// import { useState, useEffect } from "react";
// import axios from "axios";

// const Leaderboard = () => {
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         // This is a placeholder API. You can replace it with your actual backend API for leaderboard data.
//         const response = await axios.get("https://api.imgflip.com/get_memes");
//         setLeaderboardData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching leaderboard data:", error);
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-center mb-6">Meme Leaderboard</h1>
//         {loading ? (
//           <p className="text-center">Loading leaderboard...</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="border border-gray-300 p-2">Rank</th>
//                 <th className="border border-gray-300 p-2">User</th>
//                 <th className="border border-gray-300 p-2">Meme Title</th>
//                 <th className="border border-gray-300 p-2">Likes</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaderboardData.map((entry, index) => (
//                 <tr key={entry.id} className="text-center hover:bg-gray-100">
//                   <td className="border border-gray-300 p-2">{index + 1}</td>
//                   <td className="border border-gray-300 p-2">{entry.username}</td>
//                   <td className="border border-gray-300 p-2">{entry.memeTitle}</td>
//                   <td className="border border-gray-300 p-2">{entry.likes}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;





import { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(response.data.data.memes);  // Correct path
        setLoading(false);
      } catch (error) {
        console.error("Error fetching memes:", error);
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Meme Leaderboard</h1>
        {loading ? (
          <p className="text-center">Loading memes...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Rank</th>
                <th className="border border-gray-300 p-2">Meme</th>
                <th className="border border-gray-300 p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {memes.map((meme, index) => (
                <tr key={meme.id} className="text-center hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <img src={meme.url} alt={meme.name} className="h-16 mx-auto" />
                  </td>
                  <td className="border border-gray-300 p-2">{meme.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
