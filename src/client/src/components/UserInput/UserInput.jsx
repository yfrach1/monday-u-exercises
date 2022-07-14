import { useRef } from "react";
import AddButton from "../Buttons/AddButton";
import styles from "./UserInput.module.css";
import PropTypes from "prop-types";

const UserInput = ({ newInputAction }) => {
  const userInputRef = useRef();
  const onClickAddButtun = () => {
    const userInput = userInputRef.current.value;

    try {
      newInputAction(userInput);
      userInputRef.current.value = "";
    } catch (err) {}
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onClickAddButtun();
    }
  };
  return (
    <div className={styles.listControls}>
      <input
        className={styles.listItemInput}
        type="text"
        id="user_input"
        placeholder="Add your new todo"
        ref={userInputRef}
        onKeyPress={handleKeypress}
      />

      <AddButton onClickHandler={onClickAddButtun} />
    </div>
  );
};

UserInput.propTypes = {
  newInputAction: PropTypes.func,
};

UserInput.defaultProps = {
  newInputAction: () => {},
};

export default UserInput;
