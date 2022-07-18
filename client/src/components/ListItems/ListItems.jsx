import React from "react";
import styles from "./ListItems.module.css";
import PropTypes from "prop-types";
import ItemConnector from "../Item/Item-connector";
const ListItem = ({ items }) => {
  const checkIfTextAlreadyExist = (taskText) => {
    const taskList = items.map((item) => item.itemName);
    const result = taskList.includes(taskText) ? true : false;
    return result;
  };
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        return (
          <ItemConnector
            key={item.id}
            itemName={item.itemName}
            id={item.id}
            status={item.status}
            checkIfTextAlreadyExist={checkIfTextAlreadyExist}
          />
        );
      })}
    </ul>
  );
};

ListItem.propTypes = {
  items: PropTypes.array,
};

ListItem.defaultProps = {
  items: [],
};

export default ListItem;
