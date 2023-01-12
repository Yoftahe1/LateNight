import React from "react";
import MoviesGrid from "../component/moviesGrid";
import TvGrid from "../component/tvGrid";
import MyCarousel from "../component/carousel";
import styles from "./trending.module.css";
const Movies = () => {
  return (
    <div className={styles.trend}>
      <MyCarousel />
      <div className={styles.movies}>
        <h2>Trending</h2>
        <MoviesGrid />
        <TvGrid />
      </div>
    </div>
  );
};

export default Movies;
