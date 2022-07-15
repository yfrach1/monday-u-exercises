import React, { useCallback, useState } from "react";
import styles from "./Item.module.css";
import deleteIcon from "../../assets/images/delete_icon.svg";
import editIcon from "../../assets/images/edit_icon.svg";
import saveIcon from "../../assets/images/save_icon.svg";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import { capitalizeFirstLetter } from "../../utils/utils";

const Item = ({
  id,
  itemName,
  status,
  deleteItemByIdAction,
  toggleStatusAction,
  updateItemNameAction,
  checkIfTextAlreadyExist,
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
    console.log(!checkIfTextAlreadyExist(capitalizeFirstLetter(textAfterEdit)));
    if (!checkIfTextAlreadyExist(capitalizeFirstLetter(textAfterEdit))) {
      await updateItemNameAction(id, textAfterEdit, itemName);
    } else {
      setTextAfterEdit(itemName);
    }
    setIsEdit(false);
  };

  const onClickDeleteItemHandler = useCallback(async () => {
    await deleteItemByIdAction(id);
  }, [id, deleteItemByIdAction]);

  const onClickstatusCheckBoxHandler = useCallback(async () => {
    await toggleStatusAction(id);
  }, [id, toggleStatusAction]);

  const onChangeTaskTextHandler = (e) => {
    setTextAfterEdit(e.target.value);
  };
  return (
    <li
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
        id={"delete_icon"}
        style={status ? { marginLeft: "auto" } : {}}
        src={deleteIcon}
        onClickIconHandler={onClickDeleteItemHandler}
      />
    </li>
  );
};

Item.propTypes = {
  itemName: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.bool,
  deleteItemByIdAction: PropTypes.func,
  toggleStatusAction: PropTypes.func,
  updateItemNameAction: PropTypes.func,
  checkIfTextAlreadyExist: PropTypes.func,
};

Item.defaultProps = {
  itemName: "itemName",
  id: 0,
  status: false,
  deleteItemByIdAction: () => {},
  toggleStatusAction: () => {},
  updateItemNameAction: () => {},
  checkIfTextAlreadyExist: () => {},
};

export default Item;
