import React, { useCallback, useState } from "react";
import styles from "./Item.module.css";
import deleteIcon from "../../assets/images/delete_icon.svg";
import editIcon from "../../assets/images/edit_icon.svg";
import saveIcon from "../../assets/images/save_icon.svg";
import PropTypes from "prop-types";
import noop from "react-props-noop";
import {
  deleteTaskById,
  flipStatus,
  updateTaskText,
} from "../../serverApi/itemClient";
import Icon from "../Icon/Icon";

const Item = ({
  itemName,
  id,
  status,
  removeIdFromDataHandler,
  onChangeValueUpdateDataHandler,
  checkIfTextAlreadyExist,
  displayToast,
  setShowToast,
  killToast,
}) => {
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [textReadOnly, setTextReadOnly] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [textAfterEdit, setTextAfterEdit] = useState(itemName);

  const onClickEditItemHandler = () => {
    setShowSaveButton(true);
    setShowEditButton(false);
    setTextReadOnly(false);
    setIsEdit(true);
  };

  const onClickSaveItemHandler = async () => {
    setShowSaveButton(false);
    setShowEditButton(true);
    setTextReadOnly(true);
    const textBeforeEdit = itemName;
    const editTaskResult = await updateTaskText(id, textAfterEdit);
    const isNewTextAlreadyExist = checkIfTextAlreadyExist(editTaskResult.data);
    if (editTaskResult.result === "success") {
      if (isNewTextAlreadyExist) {
        if (textBeforeEdit !== textAfterEdit) {
          displayToast("", "Task already exist in ToDO App");
        }
      } else {
        setTextAfterEdit(editTaskResult.data);
        onChangeValueUpdateDataHandler(id, "itemName", editTaskResult.data);
        displayToast("POSITIVE", "Task successfully edited & saved");

        killToast();
      }
    } else {
      displayToast("NEGATIVE", editTaskResult.data);
    }

    setIsEdit(false);
  };

  const onClickDeleteItemHandler = useCallback(async () => {
    const deleteByIdResult = await deleteTaskById(id);
    if (deleteByIdResult.result === "success") {
      removeIdFromDataHandler(id);
      displayToast("POSITIVE", "Task successfully deleted");
      killToast();
    } else {
      displayToast("NEGATIVE", deleteByIdResult.data);
    }
  }, [id, removeIdFromDataHandler, setShowToast, displayToast]);

  const onClickstatusCheckBoxHandler = useCallback(async () => {
    const flipStatusResult = await flipStatus(id);
    if (flipStatusResult.result === "success") {
      onChangeValueUpdateDataHandler(id, "status", flipStatusResult.data);
      const messaeg = flipStatusResult.data
        ? "Task status successfully checked"
        : "Task status successfully unchecked";
      displayToast("POSITIVE", messaeg);

      killToast();
    } else {
      displayToast("NEGATIVE", flipStatusResult.data);
    }
  }, [id, onChangeValueUpdateDataHandler, setShowToast, displayToast]);

  const onChangeTaskTextHandler = (e) => {
    setTextAfterEdit(e.target.value);
  };
  return (
    <div
      className={`${styles.listItem} ${status ? styles.inputTextTaskDone : ""}`}
    >
      <input
        className={styles.itemStatus}
        type="checkbox"
        checked={status}
        onChange={onClickstatusCheckBoxHandler}
      />

      <input
        className={isEdit ? styles.itemTextEditMode : styles.itemText}
        type="text"
        value={!isEdit ? itemName : textAfterEdit}
        readOnly={textReadOnly}
        onChange={onChangeTaskTextHandler}
      />
      {showEditButton && !status && (
        <Icon
          iconClassName={"listItemIcon"}
          style={{ marginLeft: "auto" }}
          src={editIcon}
          onClickIconHandler={onClickEditItemHandler}
        />
      )}
      {showSaveButton && !status && (
        <Icon
          iconClassName={"listItemIcon"}
          style={{ marginLeft: "auto" }}
          src={saveIcon}
          onClickIconHandler={onClickSaveItemHandler}
        />
      )}
      <Icon
        iconClassName={"listItemIcon"}
        style={status ? { marginLeft: "auto" } : {}}
        src={deleteIcon}
        onClickIconHandler={onClickDeleteItemHandler}
      />
    </div>
  );
};

Item.propTypes = {
  itemName: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.bool,
  removeIdFromDataHandler: PropTypes.func,
  onChangeValueUpdateDataHandler: PropTypes.func,
  checkIfTextAlreadyExist: PropTypes.func,
  displayToast: PropTypes.func,
  setShowToast: PropTypes.func,
  killToast: PropTypes.func,
};

Item.defaultProps = {
  itemName: "task text",
  id: 0,
  status: false,
  removeIdFromDataHandler: noop,
  onChangeValueUpdateDataHandler: noop,
  checkIfTextAlreadyExist: noop,
  displayToast: noop,
  setShowToast: noop,
  killToast: noop,
};

export default Item;
