import styles from "./ClearAllButton.module.css";
import PropTypes from "prop-types";

const ClearAllButton = ({ deleteAllItemsAction }) => {
  return (
    <button className={styles.clearAllButton} onClick={deleteAllItemsAction}>
      Clear All
    </button>
  );
};

ClearAllButton.propTypes = {
  deleteAllItemsAction: PropTypes.func,
};

ClearAllButton.defaultProps = {
  deleteAllItemsAction: () => {},
};
export default ClearAllButton;
