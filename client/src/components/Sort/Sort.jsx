import { useState } from "react";
import styles from "./Sort.module.css";
import upArrow from "../../assets/images/up_arrow.svg";
import downArrow from "../../assets/images/down_arrow.svg";
import PropTypes from "prop-types";
import noop from "react-props-noop";
import { sortTasks } from "../../serverApi/itemClient";
const Sort = ({ onClickSortUpdateData, displayToast, killToast }) => {
  const [direction, setDirection] = useState("up");
  const onClickSortHandler = async () => {
    const sortResult = await sortTasks(direction);
    if (sortResult.result === "success") {
      const sortOrderType = direction === "up" ? "descending" : "ascending";
      if (direction === "up") {
        setDirection("down");
      } else {
        setDirection("up");
      }
      onClickSortUpdateData(sortResult.data);
      displayToast(
        "POSITIVE",
        `Your task now displayed in ${sortOrderType} order`
      );

      killToast();
    } else if (sortResult.result === "failed") {
      displayToast("NEGATIVE", sortResult.data);
    } else {
      displayToast("", "You can't sort tasks when you don't have one");
    }
  };
  return (
    <div className={styles.listSortControl}>
      <div
        className={styles.listSortButton}
        style={{ marginRight: "5px", fontSize: "18px" }}
        onClick={onClickSortHandler}
      >
        sort
        <img
          src={direction === "up" ? upArrow : downArrow}
          style={{ height: "20px", width: "20px" }}
          alt={""}
        />
      </div>
    </div>
  );
};

Sort.propTypes = {
  onClickSortUpdateData: PropTypes.func,
  displayToast: PropTypes.func,
  setShowToast: PropTypes.func,
  killToast: PropTypes.func,
};

Sort.defaultProps = {
  onClickSortUpdateData: noop,
  displayToast: noop,
  setShowToast: noop,
  killToast: noop,
};

export default Sort;
