import React from "react";
import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";
const NavigationBar = () => {
  return (
    <div className={styles.navagationBar}>
      <Link id={styles.option} to={"/main"}>
        ToDo App
      </Link>
      <Link id={styles.option} to={"/statistics"}>
        Statistics
      </Link>
      <Link id={styles.option} to={"/aboutUs"}>
        About us
      </Link>
    </div>
  );
};

export default NavigationBar;
