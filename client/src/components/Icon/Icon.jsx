import styles from "./Icon.module.css";
import PropTypes from "prop-types";
import noop from "react-props-noop";
const Icon = ({ iconClassName, style, src, onClickIconHandler }) => {
  return (
    <img
      className={styles[iconClassName]}
      style={style}
      src={src}
      alt={""}
      onClick={onClickIconHandler}
    />
  );
};

Icon.propTypes = {
  iconClassName: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string,
  onClickIconHandler: PropTypes.func,
};

Icon.defaultProps = {
  iconClassName: "",
  style: {},
  src: "",
  onClickIconHandler: noop,
};

export default Icon;
