import React, { useCallback, useState, useEffect } from "react";
import styles from "./Item.module.css";
import deleteIcon from "../../assets/images/delete_icon.svg";
import editIcon from "../../assets/images/edit_icon.svg";
import saveIcon from "../../assets/images/save_icon.svg";

import PropTypes from "prop-types";
import noop from "react-props-noop";
import Icon from "../Icon/Icon";

const Item = ({
  item,
  deleteItemByIdAction,
  toggleStatusAction,
  updateItemNameAction,
}) => {
  const { id, itemName, status } = item;
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

    if (itemName !== textAfterEdit) {
      await updateItemNameAction(id, textAfterEdit, itemName);
    }
    setIsEdit(false);
  };

  const onClickDeleteItemHandler = useCallback(async () => {
    await deleteItemByIdAction(id);
  }, [id]);

  const onClickstatusCheckBoxHandler = useCallback(async () => {
    await toggleStatusAction(id);
  }, [id]);

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
  // item: PropTypes.object,
  // deleteItemByIdAction,
  // toggleStatusAction,
  // updateItemNameAction,

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
