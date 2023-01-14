import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../store/contex";
import styles from "./card.module.css";
const Card = (props) => {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  let src =
    "https://www.themoviedb.org/t/p/original" + props.element.poster_path;
  function goToTrailer() {
    let type = "movie";
    if (props.type !== "Movie") {
      type = "tv";
    }
    ctx.changeType(type);
    ctx.changeId(props.element.id);
    navigate("/trailer");
  }
  return (
    <div className={styles.card} onClick={goToTrailer}>
      <div className={styles.description}>{props.element.overview}</div>
      <img
        className={styles.img}
        src={src}
        alt={props.element.original_title}
        loading="lazy"
      />
      <div className={styles.title}>
        {props.element.hasOwnProperty("title")
          ? props.element.title
          : props.element.name}
        <div className={styles.ratingAndType}>
          <div className={styles.rating}>
            Rating: {props.element.vote_average}
          </div>
          <div className={styles.type}>{props.type}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
