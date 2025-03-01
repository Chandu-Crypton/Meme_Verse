// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import DarkModeToggle from "./DarkModeToggle";

// const Navbar = () => {
  
//   const navigate = useNavigate();
//   const memeIds = ["181913649", "87743020", "112126428", "129242436", "217743513"];

//   const goToRandomMeme = () => {
//     const randomId = memeIds[Math.floor(Math.random() * memeIds.length)];
//     navigate(`/meme/${randomId}`);
//   };

//   return (
//     <nav className="p-4 shadow flex justify-between bg-white dark:bg-gray-900">
//       <Link to="/" className="text-2xl font-bold text-blue-500">MemeVerse</Link>
//       <div className="space-x-4">
//         <Link to="/explore" className="hover:underline">Explore</Link>
//         <Link to="/upload" className="hover:underline">Upload</Link>
//         <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
//         <button onClick={goToRandomMeme} className="px-4 py-2 rounded hover:underline cursor-pointer">
//         Meme Details
//       </button>
//         <Link to="/profile" className="hover:underline">Profile</Link>
//         <DarkModeToggle />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const memeIds = ["181913649", "87743020", "112126428", "129242436", "217743513"];

  const goToRandomMeme = () => {
    const randomId = memeIds[Math.floor(Math.random() * memeIds.length)];
    navigate(`/meme/${randomId}`);
  };

  return (
    <nav className="p-4 shadow bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          MemeVerse
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden block p-2 rounded focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖️" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4 items-center">
          <Link to="/explore" className="hover:underline">
            Explore
          </Link>
          <Link to="/upload" className="hover:underline">
            Upload
          </Link>
          <Link to="/leaderboard" className="hover:underline">
            Leaderboard
          </Link>
          <button
            onClick={goToRandomMeme}
            className="px-4 py-2 rounded hover:underline cursor-pointer"
          >
Meme Details
          </button>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
  <div className="lg:hidden flex flex-col space-y-2 mt-2">
    <Link to="/explore" className="w-full text-left px-4 py-2 hover:underline" onClick={() => setMenuOpen(false)}>
      Explore
    </Link>
    <Link to="/upload" className="w-full text-left px-4 py-2 hover:underline" onClick={() => setMenuOpen(false)}>
      Upload
    </Link>
    <Link to="/leaderboard" className="w-full text-left px-4 py-2 hover:underline" onClick={() => setMenuOpen(false)}>
      Leaderboard
    </Link>
    <button
      onClick={() => {
        goToRandomMeme();
        setMenuOpen(false);
      }}
      className="w-full text-left px-4 py-2 hover:underline"
    >
      Meme Details
    </button>
    <Link to="/profile" className="w-full text-left px-4 py-2 hover:underline" onClick={() => setMenuOpen(false)}>
      Profile
    </Link>
    <div className="mt-2">
      <DarkModeToggle />
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
