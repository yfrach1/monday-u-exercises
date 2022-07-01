import styles from "./Button.module.css";
import PropTypes from "prop-types";
import noop from "react-props-noop";

const Button = ({ onClickHandler, buttonClass, value }) => {
  return (
    <button className={styles[buttonClass]} onClick={() => onClickHandler()}>
      {value}
    </button>
  );
};

Button.propTypes = {
  buttonClass: PropTypes.string,
  value: PropTypes.string,
  onClickHandler: PropTypes.func,
};

Button.defaultProps = {
  buttonClass: "",
  value: "Button",
  onClickHandler: noop,
};
export default Button;
