import React from "react";
import MoviesGrid from "../component/moviesGrid";
import MyCarousel from "../component/carousel";
import styles from "./trending.module.css";
const Movies = () => {
  return (
    <div className={styles.trend}>
      <MyCarousel />
      <div className={styles.movies}>
        <h2>Trending</h2>
        <MoviesGrid type={"movie"}/>
        <MoviesGrid type={"tv"}/>
      </div>
    </div>
  );
};

export default Movies;
