import React, { useEffect, useState, useMemo } from "react";
import styles from "./TodoApp.module.css";
import MyToast from "../myToast/MyToast";
import PropTypes from "prop-types";
import OpacityLoading from "../loader/Loader";
import ListItemsConnector from "../listItems/ListItems-connector";
import UserInputConnector from "../UserInput/UserInput-connector";
import ClearAllButtonConnector from "../Buttons/ClearAllButton-connector";
import DisplayOptionConnector from "../displayOption/DisplayOption-connector";

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
    <div className={styles.contentPlacement}>
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
              {`The amount of ${filter} tasks is: ${viewItemsAmount}`}
            </span>
            <ClearAllButtonConnector>Clear All</ClearAllButtonConnector>
          </div>
        ) : null}
      </div>
    </div>
  );
};

TodoApp.propTypes = {
  showLoader: PropTypes.bool,
  showToast: PropTypes.bool,
  toastParam: PropTypes.object,
  viewItemsAmount: PropTypes.number,
  allItesAmount: PropTypes.number,
  fetchDataAction: PropTypes.func,
  hideToastAction: PropTypes.func,
  filter: PropTypes.string,
};

TodoApp.defaultProps = {
  showLoader: false,
  showToast: false,
  toastParam: { toastType: "", message: "" },
  viewItemsAmount: 0,
  allItesAmount: 0,
  fetchDataAction: () => {},
  hideToastAction: () => {},
  filter: "all",
};

export default TodoApp;
