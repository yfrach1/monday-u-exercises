import { Toast } from "monday-ui-react-core";
import PropTypes from "prop-types";
import noop from "react-props-noop";
const MyToast = ({ showToast, property, setShowToast }) => {
  const { toastType, message } = property;

  const setToastPropsHandler = () => {
    setShowToast(false);
  };
  return (
    <Toast
      open={showToast}
      type={Toast.types[toastType]}
      className="monday-storybook-toast_wrapper"
      onClose={setToastPropsHandler}
    >
      {message}
    </Toast>
  );
};

MyToast.propTypes = {
  showToast: PropTypes.bool,
  property: PropTypes.object,
  setShowToast: PropTypes.func,
};

MyToast.defaultProps = {
  showToast: false,
  property: { toastType: "", message: "" },
  setShowToast: noop,
};

export default MyToast;
