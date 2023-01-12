import React, { useEffect, useState, useContext } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import Card from "../component/card";
import ReadMore from "../component/ReadMore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from './trailer.module.css'
import Context from "../store/contex";
const Trailer = () => {
  const ctx = useContext(Context);
  const [trailer, setTrailer] = useState();
  const [trailerData, setTrailerData] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const [trailerComment, setTrailerComment] = useState();
  let shimmer = [];
  for (let i = 0; i < 9; i++) {
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
    setTrailer(null);
    setTrailerData(null);
    setSimilarMovies(null);
    setTrailerComment(null);
    if (ctx.type === undefined) {
      ctx.changeType(localStorage.getItem("type"));
      ctx.changeId(localStorage.getItem("id"));
    }
    if (ctx.type !== undefined) {
      localStorage.setItem("type", ctx.type);
      localStorage.setItem("id", ctx.id);
    }
    axios
      .get(
        `https://api.themoviedb.org/3/${ctx.type}/${ctx.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
      )
      .then((response) => {
        setTrailerData(response.data);
        let vid = response.data.videos.results;
        let found = vid.filter((e) => e.name.toLowerCase().includes("trailer"));
        if (found.length > 0) {
          setTrailer(found[0].key);
        } else if (vid.length > 0) {
          found = vid.filter((e) => e.key !== null && e.key !== "");
          setTrailer(found[0].key);
        }
      })
      .catch((error) => {
      });

    axios
      .get(
        `https://api.themoviedb.org/3/${ctx.type}/${ctx.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&page=1`
      )
      .then((response) => {
        setSimilarMovies(response.data.results.slice(0, 9));
      })
      .catch((error) => {
      });

    axios
      .get(
        `https://api.themoviedb.org/3/${ctx.type}/${ctx.id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setTrailerComment(response.data.results);
      })
      .catch((error) => {
      });
  }, [ctx]);
  return (
    <>
      {trailer ? (
        <YouTube
          videoId={trailer}
          className={styles.youtube}
          style={{ backgroundColor: "rgba(150,150,150,.1)" }}
        />
      ) : (
        <div className={styles.youtube}>
          <Skeleton baseColor="#c7c9cc" width={"100%"} height={"100%"} />
        </div>
      )}
      <div className={styles.TrailerPage}>
        <div className={styles.trailerDescriptionAndSimilar}>
          <div className={styles.trailerDescriptionAndComment}>
            <div className={styles.TrailerDescriptionAndImage}>
              <div className={styles.trailerImage}>
                {trailerData && (
                  <img
                    className={styles.image}
                    src={
                      "https://www.themoviedb.org/t/p/original" +
                      trailerData.poster_path
                    }
                    alt={trailerData.original_title}
                  />
                )}
              </div>
              <div className={styles.TrailerDescription}>
                <h2>
                  {trailerData &&
                    (trailerData.hasOwnProperty("original_title")
                      ? trailerData.original_title
                      : trailerData.original_name)}
                </h2>
                <div className={styles.description}>
                  <p className={styles.key}>Description:</p>
                  <div className={styles.value}>
                    {trailerData ? (
                      <ReadMore>{trailerData.overview}</ReadMore>
                    ) : (
                      <Skeleton
                        baseColor="#c7c9cc"
                        width={"100px"}
                        height={"20px"}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.description}>
                  <p className={styles.key}>Runtime:</p>
                  <p className={styles.value}>
                    {trailerData ? (
                      trailerData.runtime + " min"
                    ) : (
                      <Skeleton
                        baseColor="#c7c9cc"
                        width={"50px"}
                        height={"20px"}
                      />
                    )}
                  </p>
                </div>
                <div className={styles.description}>
                  <p className={styles.key}>Rating:</p>
                  <p className={styles.value}>
                    {trailerData ? (
                      trailerData.vote_average
                    ) : (
                      <Skeleton
                        baseColor="#c7c9cc"
                        width={"30px"}
                        height={"20px"}
                      />
                    )}
                  </p>
                </div>
                <div className={styles.description}>
                  <p className={styles.key}>Release Date:</p>
                  <p className={styles.value}>
                    {trailerData ? (
                      trailerData.hasOwnProperty("release_date") ? (
                        trailerData.release_date
                      ) : (
                        trailerData.first_air_date
                      )
                    ) : (
                      <Skeleton
                        baseColor="#c7c9cc"
                        width={"100px"}
                        height={"20px"}
                      />
                    )}
                  </p>
                </div>
                <div className={styles.description}>
                  <p className={styles.key}>genres:</p>
                  <p className={styles.value}>
                    {trailerData ? (
                      trailerData.genres.map((element, index) => {
                        return <span key={index}> {element.name},</span>;
                      })
                    ) : (
                      <Skeleton
                        baseColor="#c7c9cc"
                        width={"80px"}
                        height={"20px"}
                      />
                    )}
                  </p>
                </div>
                <div className={styles.description}>
                  <p className={styles.key}>Countries:</p>
                  <p className={styles.value}>
                    {trailerData ? (
                      trailerData.production_countries.map((element, index) => {
                        return <span key={index}> {element.name},</span>;
                      })
                    ) : (
                      <Skeleton
                        baseColor="#c7c9cc"
                        width={"120px"}
                        height={"20px"}
                      />
                    )}
                  </p>
                </div>
                <div className={styles.description}>
                  <p className={styles.key}>Production:</p>
                  <p className={styles.value}>
                    {trailerData ? (
                      trailerData.production_companies.map((element, index) => {
                        return <span key={index}> {element.name},</span>;
                      })
                    ) : (
                      <Skeleton
                        baseColor="#c7c9cc"
                        width={"100px"}
                        height={"20px"}
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.trailerComment}>
              <h3>People review</h3>
              {trailerComment &&
                trailerComment.map((element, index) => {
                  return (
                    <div key={index} className={styles.comment}>
                      <div className={styles.avatar}>
                        <p>{element.author.charAt(0)}</p>
                      </div>
                      <div>
                        <p className={styles.key}>{element.author}</p>
                        <div className={styles.value}>
                          <ReadMore>{element.content}</ReadMore>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.similarTrailer}>
            <h3>You may also like</h3>
            <div className={styles.similar}>
              {similarMovies
                ? similarMovies.map((element, index) => (
                    <Card
                      key={index}
                      element={element}
                      type={ctx.type === "movie" ? "Movie" : "Tv-series"}
                    />
                  ))
                : shimmer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trailer;
