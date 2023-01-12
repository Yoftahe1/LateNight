import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSun } from "react-icons/fa";
import { BsMoonStars } from "react-icons/bs";
import styles from "./navigation.module.css";
import Context from "../store/contex";
const Navigation = () => {
  const [dropDown, setDropDown] = useState(false);
  const inputRef = useRef("");
  const navigator = useNavigate();
  const ctx = useContext(Context);
  useEffect(() => {
    ctx.setNight(localStorage.getItem("nightMode"));
  }, []);

  return (
    <div
      className={
        ctx.night === "true" ? styles.blackNavigation : styles.navigation
      }
    >
      <div className={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className={styles.dropDown}
            onClick={() => setDropDown(!dropDown)}
          >
            <div className={dropDown ? styles.close1 : styles.line1}></div>
            <div className={dropDown ? styles.close2 : styles.line2}></div>
            <div className={dropDown ? styles.close3 : styles.line3}></div>
          </span>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.activeLogo : styles.logo)}
          >
            LateNight
          </NavLink>
        </div>
        <div className={styles.links}>
          <NavLink
            to="/trending"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Home
          </NavLink>
          <NavLink
            to="/movie/1"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Movies
          </NavLink>
          <NavLink
            to="/tv/1"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Tv-series
          </NavLink>
          <NavLink
            to="/top-imdb/1"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Top-IMDB
          </NavLink>
        </div>
        <div className={styles.inputNight}>
          <form
            className={styles.inputForm}
            onSubmit={(e) => {
              e.preventDefault();
              setDropDown(false);
              if (inputRef.current.value.trim().length > 1) {
                navigator("search/" + inputRef.current.value + "/1");
              }
              inputRef.current.value = "";
            }}
          >
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              placeholder="Enter to search"
            />
          </form>
          <div
            onClick={() => {
              if (ctx.night === null) {
                localStorage.setItem("nightMode", "true");
                ctx.setNight("true");
              } else if (ctx.night === "false") {
                localStorage.setItem("nightMode", "true");
                ctx.setNight("true");
              } else if (ctx.night === "true") {
                localStorage.setItem("nightMode", "false");
                ctx.setNight("false");
              }
            }}
          >
            {ctx.night === "true" ? (
              <FaSun className={styles.sun} />
            ) : (
              <BsMoonStars className={styles.moon} />
            )}
          </div>
        </div>
      </div>

      {dropDown && (
        <div className={styles.dropDownItem}>
          <NavLink
            to="/trending"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            onClick={() => {
              setDropDown(false);
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/movie/1"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            onClick={() => {
              setDropDown(false);
            }}
          >
            Movies
          </NavLink>
          <NavLink
            to="/tv/1"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            onClick={() => {
              setDropDown(false);
            }}
          >
            Tv-series
          </NavLink>
          <NavLink
            to="/top-imdb/1"
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            onClick={() => {
              setDropDown(false);
            }}
          >
            Top-IMDB
          </NavLink>
          <form
            className={styles.dropdownForm}
            onSubmit={(e) => {
              e.preventDefault();
              setDropDown(false);
              if (inputRef.current.value.trim().length > 1) {
                navigator("search/" + inputRef.current.value + "/1");
              }
              inputRef.current.value = "";
            }}
          >
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              placeholder="Enter to search"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Navigation;
