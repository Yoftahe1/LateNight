import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/inside.png";
import styles from "./404.module.css";
const NoFound = () => {
    const  navigate=useNavigate()
  return (
    <div className={styles.noFound}>
      <img src={image} alt="not found" className={styles.notFoundImg} />

      <div className={styles.notFoundDescription}>
        <h1>AWWW..... DON'T CRY.</h1>
        <p>its just a 404 error!</p>
        <p>sorry. the page never returned from a walk in daye</p>
        <div className={styles.goBack} onClick={()=>navigate("/trending")}>GO BACK</div>
      </div>
    </div>
  );
};

export default NoFound;
