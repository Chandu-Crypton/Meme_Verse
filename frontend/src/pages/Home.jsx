import { useContext } from "react";
import { MemeContext } from "../context/MemeContext";
import MemeCard from "../components/MemeCard";

const Home = () => {
  const { memes, loading } = useContext(MemeContext);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Trending Memes</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {memes.slice(0, 10).map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
