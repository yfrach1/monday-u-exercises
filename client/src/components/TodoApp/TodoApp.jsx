import React, { useEffect, useState, useMemo } from "react";
import styles from "./TodoApp.module.css";
import MyToast from "../MyToast/MyToast";

import OpacityLoading from "../loader/Loader";
import ListItemsConnector from "../ListItems/ListItems-connector";
import UserInputConnector from "../UserInput/UserInput-connector";
import ClearAllButtonConnector from "../Buttons/ClearAllButton-connector";
import DisplayOptionConnector from "../DisplayOption/DisplayOption-connector";

const TodoApp = ({
  showLoader,
  showToast,
  toastParam,
  viewItemsAmount,
  allItesAmount,
  fetchDataAction,
  hideToastAction,
  filter,
}) => {
  useEffect(() => {
    fetchDataAction();
  }, []);

  return (
    <div className={styles.appContainer}>
      {showLoader && <OpacityLoading />}
      <MyToast
        showToast={showToast}
        property={toastParam}
        hideToastAction={hideToastAction}
      />
      <div className={styles.appTitle}>Todo App</div>
      <UserInputConnector />
      <DisplayOptionConnector />

      <ListItemsConnector />
      {allItesAmount ? (
        <div className={styles.buttomBarContainer}>
          <span>
            {" "}
            {`The amount of ${filter} task${
              viewItemsAmount > 1 ? "s" : ""
            } is:`}{" "}
            {viewItemsAmount}
          </span>
          <ClearAllButtonConnector>Clear All</ClearAllButtonConnector>
        </div>
      ) : null}
    </div>
  );
};

export default TodoApp;
