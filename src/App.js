import { useContext,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Trending from "./pages/trending";
import Landing from "./pages/landing";
import Trailer from "./pages/trailer";
import Navigation from "./component/navigation";
import Movie from "./pages/movie";
import Tv from "./pages/tv";
import Imdb from "./pages/imdb";
import Search from "./pages/search";
import NoFound from "./pages/404";
import Context from "./store/contex";
import { useLocation } from "react-router-dom";
function App() {
  const ctx=useContext(Context)
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={ctx.night==='true'?"nightApp":"App"}>
      <Navigation />
      <Routes>
        <Route path="*" element={<NoFound/>} />
        <Route path="/" element={<Landing />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie/:page" element={<Movie />} />
        <Route path="/tv/:page" element={<Tv />} />
        <Route path="/top-imdb/:page" element={<Imdb />} />
        <Route path="/trailer" element={<Trailer />} />
        <Route path="/search/:name/:page" element={<Search />} />
      </Routes>
      <div
        style={{
          background: "rgb(0, 255, 157,.5)",
          color: "white",
          textAlign: "center",
          padding: "10px 5px",
          fontWeight:"bold"
        }}
      >
        @ all-rights reserved to Yo since 2021 to {new Date().getFullYear()} 
      </div>
    </div>
  );
}

export default App;
