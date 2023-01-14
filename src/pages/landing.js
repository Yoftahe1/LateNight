import React, { useContext } from "react";
import styles from "./landing.module.css";
import { useNavigate } from "react-router-dom";
import Context from "../store/contex";
const Landing = () => {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  return (
    <div className={styles.landing}>
      <h1 className={styles.title}>LateNight</h1>
      <p className={ctx.night === "true" ? styles.blackDescription : styles.description}>
        LateNight is one of the best site to watch movies trailer online for
        free. We give full access to a database of over 20000 movies and 5000 Tv
        series in high quality for free streaming trailer, with no registration
        required. LateNight updates new content on a daily basis and with our
        huge database, you can find new movies and shows easily.
      </p>
      <button
        className={ctx.night === "true" ? styles.blackButton : styles.button}
        onClick={() => navigate("/trending")}
      >
        Go to homepage
      </button>
      <p className={ctx.night === "true" ? styles.blackDescription : styles.description}>
        Want to find movies and TV shows? LateNight has got you! LateNight has a
        huge collection of movies and TV shows trailer with a wide range of
        genres including Action, Animation, Comedy, Documentary, History,
        Horror, Thriller, Sci-fi, TV shows, Game-Show, etc. No matter what you
        are looking for, be it the latest releases or all-time classics,
        Hollywood blockbusters or Bollywood dramas, English series or Japanese
        anime, you are most likely to find it on LateNight. We update new titles
        on a daily basis to make sure our valued users can catch up with the
        cinematic world. You can access to our full content library without any
        engagements.
      </p>
    </div>
  );
};

export default Landing;
