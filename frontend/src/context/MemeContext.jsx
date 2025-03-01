// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const MemeContext = createContext();

// export const MemeProvider = ({ children }) => {
//   const [memes, setMemes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     fetchMemes();
//   }, []);

//   const fetchMemes = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("https://api.imgflip.com/get_memes");
//       setMemes(res.data.data.memes);
//     } catch (error) {
//       console.error("Error fetching memes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MemeContext.Provider value={{ memes, loading, theme, setTheme }}>
//       {children}
//     </MemeContext.Provider>
//   );
// };




import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MemeContext = createContext();

export const MemeProvider = ({ children }) => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Fetch memes only once
  useEffect(() => {
    fetchMemes();
  }, []);

  // Persist theme change to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(res.data.data.memes);
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MemeContext.Provider value={{ memes, loading, theme, setTheme }}>
      {children}
    </MemeContext.Provider>
  );
};
