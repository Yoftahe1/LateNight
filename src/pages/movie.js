import { useState, useEffect } from "react";

import "swiper/css";
import axios from "axios";
import "swiper/css/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom";
import SwiperCore, { Pagination, Mousewheel, FreeMode } from "swiper";

import Card from "../component/card";
import styles from "./movie.module.css";

SwiperCore.use([Pagination, Mousewheel, FreeMode]);

const Movie = (props) => {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [isShimmer, setIsShimmer] = useState(true);
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();
  let goto=(props.type.slice(9))
  let shimmer = [];
  for (let i = 0; i < 20; i++) {
    shimmer.push(
      <div style={{ height: "360px" }} key={i}>
        <Skeleton baseColor="#c7c9cc" width={"100%"} height={"320px"} />{" "}
        <Skeleton
          baseColor="#c7c9cc"
          count={2}
          width={"100%"}
          height={"20px"}
        />
      </div>
    );
  }
  useEffect(() => {
    setIsShimmer(true);
    axios
      .get(
        `https://api.themoviedb.org/3/${props.type}/week?api_key=${process.env.REACT_APP_API_KEY}&page=${params.page} `
      )
      .then((response) => {
        setIsShimmer(false);
        setMovies(response.data.results);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => {
        setIsShimmer(false);
        setError(error.response.data.status_message);
      });
  }, [params.page,props.type]);
  function detectSize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [width]);
  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(
      <SwiperSlide
        key={i}
        className={parseInt(params.page) === i ? styles.active : styles.pageNO}
        onClick={() => {
          setMovies([]);
          navigate(`/${goto}/` + i);
        }}
      >
        {i}
      </SwiperSlide>
    );
  }
  return (
    <div className={styles.movieContainer}>
      <h2 className={styles.type}>
        <b>Recommended</b> {props.type==='trending/tv'?"Tv-Series":"Movie"}
      </h2>
      {error && (
        <>
          <h4 className={styles.error}>{error}</h4>
          <div className={styles.goBack} onClick={() => navigate("/trending")}>
            Go Back
          </div>
        </>
      )}
      <div className={styles.movieGrid}>
        {isShimmer
          ? shimmer
          : movies.map((element, index) => (
              <Card key={index} element={element} type={props.type==='trending/tv'?"Tv-Series":"Movie"} />
            ))}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignSelf: "end",
        }}
      >
        {!error && (
          <div className={styles.btnContainer}>
            <button
              className={styles.nextAndBack}
              disabled={parseInt(params.page) === 1 && true}
              onClick={() => {
                setMovies([]);
                navigate(`/${goto}/${Number(params.page) - 1}`);
              }}
            >
              Back
            </button>
            <Swiper
              className={styles.Swiper}
              direction={"horizontal"}
              freeMode={true}
              mousewheel={true}
              modules={[FreeMode, Mousewheel]}
              spaceBetween={10}
              slidesPerView={width > 500 ? 5 : 3}
            >
              {pages}
            </Swiper>

            <button
              className={styles.nextAndBack}
              disabled={parseInt(params.page) === totalPage && true}
              onClick={() => {
                setMovies([]);
                // let goto=(props.type.slice(9))
                navigate(`/${goto}/${Number(params.page) + 1}`);
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
