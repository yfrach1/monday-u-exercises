import { useRef } from "react";
import AddButton from "../Buttons/AddButton";
import styles from "./UserInput.module.css";
import PropTypes from "prop-types";

const UserInput = ({ newInputAction, setInputAction, inputValue }) => {
  const onClickAddButtun = () => {
    newInputAction(inputValue);
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
        id="input"
        type="text"
        id="user_input"
        placeholder="Add your new todo"
        value={inputValue}
        onChange={(e) => setInputAction(e.target.value)}
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
