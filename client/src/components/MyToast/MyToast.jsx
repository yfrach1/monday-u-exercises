import { Toast } from "monday-ui-react-core";
import styles from "./MyToast.module.css";
import PropTypes from "prop-types";
const MyToast = ({ showToast, property, hideToastAction }) => {
  const { toastType, message } = property;

  return (
    <Toast
      open={showToast}
      type={Toast.types[toastType]}
      className={`monday-storybook-toast_wrapper ${styles.mondayStyleToast}`}
      onClose={hideToastAction}
    >
      {message}
    </Toast>
  );
};

MyToast.propTypes = {
  showToast: PropTypes.bool,
  property: PropTypes.object,
  hideToastAction: PropTypes.func,
};

MyToast.defaultProps = {
  showToast: false,
  property: { toastType: "", message: "" },
  hideToastAction: () => {},
};

export default MyToast;
