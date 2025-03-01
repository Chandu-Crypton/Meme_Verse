import { motion } from "framer-motion";

const MemeCard = ({ meme }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-gray-100 shadow rounded-lg">
      <img src={meme.url} alt={meme.name} className="w-full h-60 object-cover rounded-lg" />
      <h2 className="text-xl font-semibold mt-2">{meme.name}</h2>
    </motion.div>
  );
};

export default MemeCard;

