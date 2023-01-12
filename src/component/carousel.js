import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Context from "../store/contex";
import styles from "./carousel.module.css";

const MyCarousel = () => {
  const [movies, setMovies] = useState([]);
  const ctx = useContext(Context);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setMovies(response.data.results.slice(5, 10));
      })
      .catch((error) => {});
  }, []);
  return (
    <div className={styles.carousel}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
      >
        {movies.map((element, index) => {
          let src =
            "https://www.themoviedb.org/t/p/original" + element.backdrop_path;
          return (
            <div key={index} className={styles.images}>
              <div
                className={ctx.night === "true" ? styles.black : styles.fade}
              ></div>
              <div className={styles.titleAndDescription}>
                <div className={styles.title}>
                  {element.hasOwnProperty("original_title")
                    ? element.original_title
                    : element.original_name}
                </div>
                <div className={styles.description}>{element.overview}</div>
              </div>
              <img src={src} className="poster" alt={element.original_name} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default MyCarousel;
