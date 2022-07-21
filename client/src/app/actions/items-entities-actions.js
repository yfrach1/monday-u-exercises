import actionsTypes from "./constants";
import {
  inputNotValid,
  fetchDataRequest, //same 1
  fetchRequestSuccessed,
  fetchRequestFailed,
  setInput,
  newInputRequest, //same 1
  inputRequestSuccessed,
  inputRequestFailed,
  itemRequestAlreadyHave,
  toggleStatusRequestSuccessed,
  toggleStatusRequestFailed,
  updateItemTextRequestSuccessed,
  updateItemTextRequestFailed,
  removeIdRequestSuccessed,
  removeIdRequestFailed,
  clearAllRequestSuccessed,
  clearAllRequestFailed,
  hideToast,
  setSort,
} from "./items-view-actions";
import {
  getAllTasks,
  deleteTaskById,
  handleNewItem,
  toggleStatus,
  clearAllItems,
  updateTaskText,
} from "../services/itemClient";
import { checkIfInputIsNotValid } from "../../utils/utils";

const setData = (data) => {
  return {
    type: actionsTypes.SET_DATA,
    data,
  };
};

const removeItem = (id) => {
  return {
    type: actionsTypes.REMOVE_ITEM,
    id,
  };
};
const removeAllItems = () => {
  return {
    type: actionsTypes.CLEAR_ITEMS,
  };
};

const addItems = (newItems) => {
  return {
    type: actionsTypes.ADD_ITEMS,
    newItems,
  };
};

const updateItem = (itemData) => {
  return {
    type: actionsTypes.UPDATE_ITEM,
    itemData,
  };
};

export const fetchDataAction = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const data = await getAllTasks();
      dispatch(setData(data));
      dispatch(fetchRequestSuccessed());
      // const successToastTimer = setTimeout(() => {
      //   dispatch(hideToast());
      // }, 5000);
      // successToastTimer();
      // this throw an error, why?
      // Im sure there is a better way to do this
    } catch (err) {
      dispatch(fetchRequestFailed());
    }
  };
};

export const deleteItemByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const data = await deleteTaskById(id);

      dispatch(removeItem(data));
      dispatch(removeIdRequestSuccessed());
    } catch (err) {
      dispatch(removeIdRequestFailed());
    }
  };
};

export const deleteAllItemsAction = () => {
  return async (dispatch) => {
    try {
      await clearAllItems();
      dispatch(removeAllItems());
      dispatch(clearAllRequestSuccessed());
      dispatch(setSort(null));
    } catch (err) {
      dispatch(clearAllRequestFailed());
    }
  };
};

export const newInputAction = (input) => {
  return async (dispatch) => {
    if (checkIfInputIsNotValid(input)) {
      return dispatch(inputNotValid());
    }
    dispatch(newInputRequest());
    try {
      const data = await handleNewItem(input);
      if (data.length) {
        // check it which way is better
        dispatch(addItems(data));
        dispatch(inputRequestSuccessed());
      } else {
        dispatch(itemRequestAlreadyHave());
      }
      dispatch(setInput(""));
    } catch (err) {
      dispatch(inputRequestFailed());
    }
  };
};

export const toggleStatusAction = (id) => {
  return async (dispatch) => {
    //check if loader is needed
    try {
      const data = await toggleStatus(id);
      dispatch(updateItem(data));
      dispatch(toggleStatusRequestSuccessed(data.newValue));
    } catch (err) {
      dispatch(toggleStatusRequestFailed());
    }
  };
};

export const updateItemNameAction = (id, textAfterEdit) => {
  return async (dispatch) => {
    try {
      const data = await updateTaskText(id, textAfterEdit);
      if (data.newValue) {
        dispatch(updateItem(data));
        dispatch(updateItemTextRequestSuccessed());
      } else {
        dispatch(itemRequestAlreadyHave());
      }
    } catch (err) {
      dispatch(updateItemTextRequestFailed());
    }
  };
};
