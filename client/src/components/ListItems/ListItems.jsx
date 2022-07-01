import React from "react";
import Item from "../Item/Item";
import styles from "./ListItems.module.css";
import PropTypes from "prop-types";
import noop from "react-props-noop";
const ListItem = ({
  data,
  removeIdFromDataHandler,
  onChangeValueUpdateData,
  setToastProps,
  checkIfTextAlreadyExist,
  displayToast,
  setShowToast,
  killToast,
}) => {
  return (
    <ul className={styles.list}>
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Item
              itemName={item.itemName}
              id={item.id}
              removeIdFromDataHandler={removeIdFromDataHandler}
              status={item.status}
              onChangeValueUpdateDataHandler={onChangeValueUpdateData}
              displayToast={displayToast}
              setShowToast={setShowToast}
              setToastProps={setToastProps}
              checkIfTextAlreadyExist={checkIfTextAlreadyExist}
              killToast={killToast}
            ></Item>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

ListItem.propTypes = {
  data: PropTypes.array,
  removeIdFromDataHandler: PropTypes.func,
  onChangeValueUpdateData: PropTypes.func,
  setToastProps: PropTypes.func,
  displayToast: PropTypes.func,
  setShowToast: PropTypes.func,
  killToast: PropTypes.func,
};

ListItem.defaultProps = {
  data: [],
  removeIdFromDataHandler: noop,
  onChangeValueUpdateData: noop,
  setToastProps: noop,
  displayToast: noop,
  setShowToast: noop,
  killToast: noop,
};

export default ListItem;
