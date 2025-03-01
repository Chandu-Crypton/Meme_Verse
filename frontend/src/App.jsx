// import { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Explore from "./pages/Explore";
// import Upload from "./pages/Upload";
// import Profile from "./pages/Profile";
// import Leaderboard from "./pages/Leaderboard";
// import NotFound from "./pages/NotFound";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import { MemeProvider } from "./context/MemeContext";
// import { useEffect, useContext } from 'react';
// import { MemeContext } from './context/MemeContext';

// const MemeDetails = lazy(() => import("./pages/MemeDetails"));

// function App() {
//   const { theme } = useContext(MemeContext);

//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme]);
//   return (
//     <MemeProvider>
//     <Router>
//       <Navbar />
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/meme/:id" element={<MemeDetails />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/upload" element={<Upload />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/leaderboard" element={<Leaderboard />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <Footer />
//       </Suspense>
//     </Router>
//     </MemeProvider>
//   );
// }

// export default App;






import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MemeProvider } from "./context/MemeContext";
import { useEffect, useContext } from 'react';
import { MemeContext } from './context/MemeContext';
// Lazy load MemeDetails
const MemeDetails = lazy(() => import("./pages/MemeDetails"));

function ThemeWrapper({ children }) {
  const { theme } = useContext(MemeContext);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return children;
}

function App() {
  return (
    <MemeProvider>
      <ThemeWrapper>
        <Router>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meme/:id" element={<MemeDetails />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </ThemeWrapper>
    </MemeProvider>
  );
}

export default App;
