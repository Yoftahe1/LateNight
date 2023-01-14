import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navigationLinks.module.css";
const NavigationLinks = (props) => {
  return (
    <div
      className={props.display === "column" ? styles.columnLinks : styles.links}
    >
      <NavLink
        to="/trending"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        onClick={() =>props.display === "column"&& props.setDropDown(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movie/1"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        onClick={() =>props.display === "column"&& props.setDropDown(false)}
      >
        Movies
      </NavLink>
      <NavLink
        to="/tv/1"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        onClick={() =>props.display === "column"&& props.setDropDown(false)}
      >
        Tv-series
      </NavLink>
      <NavLink
        to="/top-imdb/1"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
        onClick={() =>props.display === "column"&& props.setDropDown(false)}
      >
        Top-IMDB
      </NavLink>
    </div>
  );
};

export default NavigationLinks;
