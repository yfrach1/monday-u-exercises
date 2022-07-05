import React, { useEffect, useState } from "react";
import styles from "./TodoApp.module.css";
import MyToast from "../MyToast/MyToast";
import {
  handleNewItem,
  getAllTasks,
  deleteAllTasks,
} from "../../serverApi/itemClient";
import ListItems from "../ListItems/ListItems";
import UserInput from "../UserInput/UserInput";
import Sort from "../Sort/Sort";
import Button from "../Button/Button";
import { checkIfInputIsNotValid } from "../../utils/utils";

const TodoApp = () => {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState({
    toastType: "",
    message: "",
  });

  const displayToast = (toastType, message) => {
    setShowToast(true);
    setToastProps({
      toastType,
      message,
    });
  };
  const killToast = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };
  const removeIdFromData = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };
  const checkIfTextAlreadyExist = (taskText) => {
    const taskList = data.map((item) => item.itemName);
    const result = taskList.includes(taskText) ? true : false;
    return result;
  };
  const changeItemValueInData = (id, valueName, newValue) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          item[valueName] = newValue;
        }
        return item;
      })
    );
  };

  const NewInputHandler = async (userInputRef) => {
    const userInput = userInputRef.current.value;
    userInputRef.current.value = "";
    if (checkIfInputIsNotValid(userInput)) {
      displayToast("NEGATIVE", "Input is not valid");
    } else {
      const addNewItemsResult = await handleNewItem(userInput);
      if (addNewItemsResult.result === "success") {
        if (addNewItemsResult.data.length) {
          setData([...data, ...addNewItemsResult.data]);
          displayToast("POSITIVE", "Successfully add new items");

          killToast();
        } else if (addNewItemsResult.data.length === 0) {
          displayToast("", "Try to add new tasks :)");
        }
      } else {
        displayToast("NEGATIVE", addNewItemsResult.data);
      }
    }
  };

  const deleteAllHandler = async () => {
    const deleteAllResult = await deleteAllTasks();
    if (deleteAllResult.result === "success") {
      displayToast("POSITIVE", "Successfully delete all items");
      killToast();
      setData([]);
    } else {
      displayToast("NEGATIVE", deleteAllResult.data);
    }
  };

  const getPendingTasksAmount = () => {
    const pendingTasks = data.filter((item) => !item.status);
    return pendingTasks.length;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDataResult = await getAllTasks();
      if (fetchedDataResult.result === "success") {
        setData(fetchedDataResult.data);
        displayToast("POSITIVE", "Successfully get all items");
        killToast();
      } else if (fetchedDataResult.result === "failed") {
        displayToast("NEGATIVE", fetchedDataResult.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.appContainer}>
      <MyToast
        showToast={showToast}
        property={toastProps}
        displayToast={displayToast}
        setShowToast={setShowToast}
        setToastProps={setToastProps}
      />
      <div className={styles.appTitle}>Todo App</div>
      <UserInput onClickAddButtonHandler={NewInputHandler} />
      <Sort
        onClickSortUpdateData={setData}
        displayToast={displayToast}
        setShowToast={setShowToast}
        setToastProps={setToastProps}
        killToast={killToast}
      />
      <ListItems
        data={data}
        removeIdFromDataHandler={removeIdFromData}
        onChangeValueUpdateData={changeItemValueInData}
        displayToast={displayToast}
        setShowToast={setShowToast}
        setToastProps={setToastProps}
        checkIfTextAlreadyExist={checkIfTextAlreadyExist}
        killToast={killToast}
      />
      {data.length ? (
        <div className={styles.buttomBarContainer}>
          <span> The amount of pending task is: {getPendingTasksAmount()}</span>
          <Button
            buttonClass={"clearAllButton"}
            value={"Clear all"}
            onClickHandler={deleteAllHandler}
          >
            Clear All
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default TodoApp;
