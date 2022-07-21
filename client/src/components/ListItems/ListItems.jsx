import React, { useEffect } from "react";
import styles from "./ListItems.module.css";
import PropTypes from "prop-types";
import ItemConnector from "../Item/Item-connector";

const ListItem = ({ items, fetchDataAction }) => {
  const checkIfTextAlreadyExist = (taskText) => {
    const taskList = items.map((item) => item.itemName);
    const result = taskList.includes(taskText) ? true : false;
    return result;
  };

  useEffect(() => {
    fetchDataAction();
  }, [fetchDataAction]);
  return (
    <ul className={styles.list} id="list_items">
      {items.length ? (
        items.map((item) => {
          return (
            <ItemConnector
              key={item.id}
              id={item.id}
              itemName={item.itemName}
              status={item.status}
              checkIfTextAlreadyExist={checkIfTextAlreadyExist}
            />
          );
        })
      ) : (
        <div className={styles.noItems}>
          <div style={{ justifySelf: "center" }}>there is no items</div>
        </div>
      )}
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