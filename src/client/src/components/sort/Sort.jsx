import styles from "./Sort.module.css";
import upArrow from "../../assets/images/up_arrow.svg";
import downArrow from "../../assets/images/down_arrow.svg";
import PropTypes from "prop-types";

const Sort = ({ setSortAction, toggleSortTypeAction, sortType }) => {
  return (
    <div className={styles.listSortControl}>
      <input
        className={styles.sortCheckBox}
        type="checkbox"
        checked={sortType === null ? false : true}
        value
        onChange={(event) => {
          const isChecked = event.target.checked;
          setSortAction(isChecked);
        }}
      />
      <div
        className={styles.listSortButton}
        style={{ marginRight: "5px", fontSize: "18px" }}
      >
        sort
      </div>
      {sortType !== null ? (
        <img
          className={styles.sortIcon}
          src={sortType === "DESC" ? downArrow : upArrow}
          alt={""}
          onClick={() => {
            toggleSortTypeAction(sortType);
          }}
        />
      ) : null}
    </div>
  );
};

Sort.propTypes = {
  setSortAction: PropTypes.func,
  toggleSortTypeAction: PropTypes.func,
  sortType: PropTypes.string,
};

Sort.defaultProps = {
  setSortAction: () => {},
  toggleSortTypeAction: () => {},
  sortType: null,
};

export default Sort;
