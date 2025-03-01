import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">MemeVerse</h3>
          <p className="text-sm">Your daily dose of memes & laughter!</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-4 mt-4 md:mt-0">
          <a href="/" className="text-sm hover:underline">Home</a>
          <a href="/explore" className="text-sm hover:underline">Explore</a>
          <a href="/upload" className="text-sm hover:underline">Upload</a>
          <a href="/leaderboard" className="text-sm hover:underline">Leaderboard</a>
          <a href="/profile" className="text-sm hover:underline">Profile</a>
        </nav>

        {/* Social Media Links */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-5 h-5 hover:text-blue-400" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-5 h-5 hover:text-blue-600" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-5 h-5 hover:text-pink-500" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-4">
        © {new Date().getFullYear()} MemeVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
