import actionsTypes from "./constants";
import {
  showLoader,
  hideLoader,
  showToast,
  hideToast,
  setToast,
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
import reaulstType from "../actions/constants/Results";
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

const setLoaderOff = async (dispatch, action, time) => {
  setTimeout(() => {
    dispatch(action());
  }, time);
};

const handelActionResult = (response, dispatch, action) => {
  const { result, message, data } = response;
  switch (result) {
    case reaulstType.SUCCESS: {
      dispatch(action(data));
      dispatch(setToast("POSITIVE", message));
      dispatch(showToast());
      if (message.includes("delete all")) {
        dispatch(setSort(null));
      }
      setLoaderOff(dispatch, hideToast, 5000);

      break;
    }
    case reaulstType.FAILED: {
      dispatch(setToast("NEGATIVE", message));
      dispatch(showToast());
      break;
    }
    case reaulstType.ALREADY_HAVE: {
      dispatch(setToast("", message));
      dispatch(showToast());
      break;
    }
  }
};

export const fetchDataAction = () => {
  return async (dispatch) => {
    dispatch(showLoader());

    const fetchDataResult = await getAllTasks();
    dispatch(hideLoader());
    return handelActionResult(fetchDataResult, dispatch, setData);
  };
};

export const deleteItemByIdAction = (id) => {
  return async (dispatch) => {
    const deleteItemByIdResult = await deleteTaskById(id);
    return handelActionResult(deleteItemByIdResult, dispatch, removeItem);
  };
};

export const deleteAllItemsAction = (id) => {
  return async (dispatch) => {
    const deleteAllItemsResult = await clearAllItems(id);
    return handelActionResult(deleteAllItemsResult, dispatch, removeAllItems);
  };
};

export const newInputAction = (input) => {
  return async (dispatch) => {
    if (checkIfInputIsNotValid(input)) {
      dispatch(setToast("NEGATIVE", "Input is not valid"));
      dispatch(showToast());
    } else {
      dispatch(showLoader());
      const addNewInputResult = await handleNewItem(input);
      dispatch(hideLoader());
      return handelActionResult(addNewInputResult, dispatch, addItems);
    }
  };
};

export const toggleStatusAction = (id) => {
  return async (dispatch) => {
    dispatch(showLoader());
    const toggleStatusResult = await toggleStatus(id);
    dispatch(hideLoader());
    return handelActionResult(toggleStatusResult, dispatch, updateItem);
  };
};

export const updateItemNameAction = (id, textAfterEdit) => {
  return async (dispatch) => {
    dispatch(showLoader());
    const updateItemNameResult = await updateTaskText(id, textAfterEdit);
    dispatch(hideLoader());
    return handelActionResult(updateItemNameResult, dispatch, updateItem);
  };
};
