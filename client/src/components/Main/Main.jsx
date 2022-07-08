import React from "react";
import styles from "./Main.module.css";
import TodoSwitch from "../../navigation/TodoSwitch";
import { Link } from "react-router-dom";
const Main = () => {
  return (
    <div className={styles.appBackground}>
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

      <TodoSwitch />
    </div>
  );
};

export default Main;
