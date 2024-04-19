"use client";

import React, { useEffect } from "react";
import styles from "./Card.module.css";
import cn from "classnames";
import Trending from "../Trending/Trending";

const Card = ({ children }) => {
  const syncPointer = ({ x, y }) => {
    document.documentElement.style.setProperty("--x", x.toFixed(2));
    document.documentElement.style.setProperty(
      "--xp",
      (x / window.innerWidth).toFixed(2)
    );
    document.documentElement.style.setProperty("--y", y.toFixed(2));
    document.documentElement.style.setProperty(
      "--yp",
      (y / window.innerHeight).toFixed(2)
    );
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", syncPointer);
    return () => {
      document.body.removeEventListener("pointermove", syncPointer);
    };
  }, []);

  return (
    <>
      <div className={cn(styles["card"], styles["glow"], styles["cardItems"])}>
        <div className={styles.glow}> </div>
        {children}
      </div>
    </>
  );
};

export default Card;
