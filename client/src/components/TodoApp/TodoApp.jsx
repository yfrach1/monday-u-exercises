import React from "react";
import styles from "./TodoApp.module.css";
import MyToast from "../MyToast/MyToast";
import PropTypes from "prop-types";
import OpacityLoading from "../Loader/Loader";
import ListItemsConnector from "../ListItems/ListItems-connector";
import UserInputConnector from "../UserInput/UserInput-connector";
import ClearAllButtonConnector from "../Buttons/ClearAllButton-connector";
import DisplayOptionConnector from "../DisplayOption/DisplayOption-connector";

const TodoApp = ({
  showLoader,
  showToast,
  toastParam,
  viewItemsAmount,
  allItemsAmount,
  hideToastAction,
  filter,
}) => {
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
        {allItemsAmount ? (
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
  allItemsAmount: PropTypes.number,
  fetchDataAction: PropTypes.func,
  hideToastAction: PropTypes.func,
  filter: PropTypes.string,
};

TodoApp.defaultProps = {
  showLoader: false,
  showToast: false,
  toastParam: { toastType: "", message: "" },
  viewItemsAmount: 0,
  allItemsAmount: 0,
  fetchDataAction: () => {},
  hideToastAction: () => {},
  filter: "all",
};

export default TodoApp;
