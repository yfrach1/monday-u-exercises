import styles from "./AddButton.module.css";
import PropTypes from "prop-types";

const AddButton = ({ onClickHandler }) => {
  return (
    <button className={styles.addButton} onClick={() => onClickHandler()}>
      +
    </button>
  );
};

AddButton.propTypes = {
  onClickHandler: PropTypes.func,
};

AddButton.defaultProps = {
  onClickHandler: () => {},
};
export default AddButton;
