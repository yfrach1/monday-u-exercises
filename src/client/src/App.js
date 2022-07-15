import styles from "./App.module.css";
import Main from "./components/Main/Main";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import TodoSwitch from "./navigation/TodoSwitch";
import React from "react";
function App() {
  return (
    <div className={styles.appBackground}>
      <NavigationBar />
      <TodoSwitch />
      {/* <Main /> */}
    </div>
  );
}

export default App;
