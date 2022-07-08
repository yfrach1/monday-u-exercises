import styles from "./App.module.css";
import Main from "./components/main/Main";
import React from "react";
function App() {
  return (
    <div className={styles.app}>
      <Main />
    </div>
  );
}

export default App;
