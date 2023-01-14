import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSun } from "react-icons/fa";
import { BsMoonStars } from "react-icons/bs";
import NavigationLinks from "./navigationLinks";
import Context from "../store/contex";
import styles from "./navigation.module.css";
const Navigation = () => {
  const [dropDown, setDropDown] = useState(false);
  const inputRef = useRef("");
  const navigator = useNavigate();
  const ctx = useContext(Context);
  useEffect(() => {
    ctx.setNight(localStorage.getItem("nightMode"));
  }, [ctx]);
  function submit(event) {
    event.preventDefault();
    setDropDown(false);
    if (inputRef.current.value.trim().length > 1) {
      navigator("search/" + inputRef.current.value + "/1");
    }
    inputRef.current.value = "";
  }
  function nightMode() {
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
  }
  return (
    <div
      className={
        ctx.night === "true" ? styles.nightNavigation : styles.navigation
      }
    >
      <div className={styles.forLargeDevice}>
        <div className={styles.hamburgerAndLogo}>
          <div
            className={styles.hamburger}
            onClick={() => setDropDown(!dropDown)}
          >
            <div className={dropDown ? styles.closeBar1 : styles.bar1}></div>
            <div className={dropDown ? styles.closeBar2 : styles.bar2}></div>
            <div className={dropDown ? styles.closeBar3 : styles.bar3}></div>
          </div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLogo : styles.logo
            }
          >
            LateNight
          </NavLink>
        </div>
        <NavigationLinks />
        <div className={styles.inputAndNightMode}>
          <form
            className={styles.inputForm}
            onSubmit={(event) => submit(event)}
          >
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              placeholder="Enter to search"
            />
          </form>
          <div className={styles.nightMode} onClick={nightMode}>
            {ctx.night === "true" ? (
              <FaSun className={styles.sun} />
            ) : (
              <BsMoonStars className={styles.moon} />
            )}
          </div>
        </div>
      </div>
      {dropDown && (
        <div className={styles.forSmallDevice}>
          <NavigationLinks display={"column"} setDropDown={setDropDown}/>
          <form
            className={styles.dropdownForm}
            onSubmit={(event) => submit(event)}
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
