import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./moviesGrid.module.css";
const MoviesGrid = () => {
  const [movies, setMovies] = useState([]);
  const [isShimmer, setIsShimmer] = useState(true);
  let shimmer = [];
  for (let i = 0; i < 20; i++) {
    shimmer.push(
      <div style={{ height: "360px" }} key={i}>
        <Skeleton baseColor="#c7c9cc" width={"100%"} height={"320px"} />{" "}
        <Skeleton baseColor="#c7c9cc" count={2} width={"100%"} height={"20px"} />
      </div>
    );
  }
    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((response) => {
          setIsShimmer(false)
          setMovies(response.data.results);
        })
        .catch((error) => {});
    }, []);
 
  return (
    <div className={styles.container}>
      <div className={styles.show}>Movies</div>
      <div className={styles.grid}>
         {isShimmer
          ? shimmer
          : movies.map((element, index) => (
              <Card key={index} element={element} type={"Movie"} />
            ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
