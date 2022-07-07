import React from "react";
// import TodoApp from "../TodoApp/TodoApp";
import styles from "./Main.module.css";
import TodoSwitch from "../../navigation/TodoSwitch";

const Main = () => {
  return (
    <div className={styles.appBackground}>
      <div className={styles.navagationBar}>
        <div id={styles.option}>ToDo App</div>
        <div id={styles.option}>Statistics</div>
        <div id={styles.option}>About us</div>
      </div>
      <TodoSwitch />
    </div>
  );
};

export default Main;
