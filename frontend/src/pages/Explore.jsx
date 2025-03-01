// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Explore = () => {
//   const [memes, setMemes] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("trending"); // Currently unused
//   const [sort, setSort] = useState("likes"); // Currently unused

//   useEffect(() => {
//     const fetchMemes = async () => {
//       try {
//         const response = await axios.get("https://api.imgflip.com/get_memes");
//         setMemes(response.data.data.memes);
//       } catch (error) {
//         console.error("Error fetching memes:", error);
//       }
//     };
//     fetchMemes();
//   }, []);

//   const filteredMemes = memes.filter((meme) =>
//     meme.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-4">Explore Memes</h1>
//       <div className="flex gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search memes..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         {/* You can keep these dropdowns if you plan to implement filter/sort manually later */}
//         <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
//           <option value="trending">Trending</option>
//           <option value="new">New</option>
//           <option value="classic">Classic</option>
//           <option value="random">Random</option>
//         </select>
//         <select value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 border rounded">
//           <option value="likes">Sort by Likes</option>
//           <option value="date">Sort by Date</option>
//         </select>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {filteredMemes.map((meme) => (
//           <div key={meme.id} className="border rounded p-2">
//             <img src={meme.url} alt={meme.name} className="w-full h-auto" />
//             <p className="text-center mt-2">{meme.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Explore;






// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import debounce from "lodash/debounce";

// const Explore = () => {
//   const [memes, setMemes] = useState([]);
//   const [search, setSearch] = useState("");

//   // Debounced fetch function (pretending the API supports search queries)
//   const fetchMemes = async (query = "") => {
//     try {
//       // In a real API, you could do:
//       // const response = await axios.get(`https://yourapi.com/memes?search=${query}`);
//       const response = await axios.get("https://api.imgflip.com/get_memes");

//       // Filter on client-side (since Imgflip doesn't support search params)
//       const filtered = response.data.data.memes.filter((meme) =>
//         meme.name.toLowerCase().includes(query.toLowerCase())
//       );

//       setMemes(filtered);
//     } catch (error) {
//       console.error("Error fetching memes:", error);
//     }
//   };

//   // Create a debounced version of fetchMemes
//   const debouncedFetchMemes = useCallback(
//     debounce((query) => {
//       fetchMemes(query);
//     }, 500), // 500ms debounce time
//     []
//   );

//   // When search input changes, trigger debounced fetch
//   useEffect(() => {
//     debouncedFetchMemes(search);
//     // Cleanup debounce on unmount
//     return () => debouncedFetchMemes.cancel();
//   }, [search, debouncedFetchMemes]);

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-4">Explore Memes</h1>
//       <div className="flex gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search memes..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {memes.map((meme) => (
//           <div key={meme.id} className="border rounded p-2">
//             <img src={meme.url} alt={meme.name} className="w-full h-auto" />
//             <p className="text-center mt-2">{meme.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Explore;





import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [allMemes, setAllMemes] = useState([]); // Store all memes for filtering
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("trending");
  const [sort, setSort] = useState("likes");

  // Fetch memes (only once) - debounced search will filter them locally
  const fetchMemes = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      setAllMemes(response.data.data.memes); // Store all memes for future filtering
      setMemes(response.data.data.memes); // Initial display
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  // Filter memes based on search, filter, and sort options
  const filterAndSortMemes = (query) => {
    let filtered = allMemes.filter((meme) =>
      meme.name.toLowerCase().includes(query.toLowerCase())
    );

    // Example filter logic (you can modify this to match your needs)
    if (filter === "trending") {
      // Pretend trending means all memes (since API has no "trending")
      filtered = filtered;
    } else if (filter === "new") {
      // Simulate new memes — normally you'd use a 'date' field from real API
      filtered = filtered.slice(0, 20); // Example: latest 20 memes
    } else if (filter === "classic") {
      filtered = filtered.slice(-20); // Example: oldest 20 memes
    } else if (filter === "random") {
      filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 20);
    }

    // Sort logic
    if (sort === "likes") {
      // Note: imgflip data doesn't have 'likes', so we can skip this or mock it.
    } else if (sort === "date") {
      // Example mock — you would use actual date field in a real API
      filtered = filtered.reverse(); // Simulate "newest first"
    }

    setMemes(filtered);
  };

  // Debounced filter/search function
  const debouncedFilterAndSort = useCallback(
    debounce((query) => {
      filterAndSortMemes(query);
    }, 500),
    [allMemes, filter, sort] // dependencies
  );

  // Trigger filter & sort whenever search changes
  useEffect(() => {
    debouncedFilterAndSort(search);

    return () => debouncedFilterAndSort.cancel();
  }, [search, filter, sort, debouncedFilterAndSort]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Memes</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search memes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="trending">Trending</option>
          <option value="new">New</option>
          <option value="classic">Classic</option>
          <option value="random">Random</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="likes">Sort by Likes </option>
          <option value="date">Sort by Date</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memes.map((meme) => (
          <div key={meme.id} className="border rounded p-2">
            <img src={meme.url} alt={meme.name} className="w-full h-auto" />
            <p className="text-center mt-2">{meme.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
