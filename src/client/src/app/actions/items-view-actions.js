import actionTypes from "./constants";
import sortType from "../actions/constants/SortType";
export const showLoader = () => ({
  type: actionTypes.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: actionTypes.HIDE_LOADER,
});

export const showToast = () => ({
  type: actionTypes.SHOW_TOAST,
});

export const hideToast = () => ({
  type: actionTypes.HIDE_TOAST,
});

const setFilter = (filter) => ({
  type: actionTypes.SET_FILTER,
  filter,
});

export const setSort = (sortType) => ({
  type: actionTypes.SET_SORT,
  sortType,
});

const setSearchKey = (searchKey) => ({
  type: actionTypes.SEARCH_KEY,
  searchKey,
});

export const setInput = (value) => ({
  type: actionTypes.SET_INPUT,
  value,
});

export const inputNotValid = () => ({
  type: actionTypes.INPUT_NOT_VALID,
});
export const fetchDataRequest = () => ({
  type: actionTypes.FETCH_DATA_REQUEST,
});

export const fetchRequestSuccessed = () => ({
  type: actionTypes.FETCH_REQUEST_SUCCESSED,
});

export const fetchRequestFailed = () => ({
  type: actionTypes.FETCH_REQUEST_FAILED,
});

export const newInputRequest = () => ({
  type: actionTypes.NEW_INPUT_REQUEST,
});

export const inputRequestSuccessed = () => ({
  type: actionTypes.NEW_INPUT_REQUEST_SUCCESSED,
});
export const itemRequestAlreadyHave = () => ({
  type: actionTypes.ITEM_REQUEST_ALREADY_HAVE,
});
export const inputRequestFailed = () => ({
  type: actionTypes.NEW_INPUT_REQUEST_FAILED,
});
export const toggleStatusRequestSuccessed = (newStatus) => ({
  type: actionTypes.TOGGLE_STATUS_REQUEST_SUCCESSED,
  newStatus,
});
export const toggleStatusRequestFailed = () => ({
  type: actionTypes.TOGGLE_STATUS_REQUEST_FAILED,
});

export const updateItemTextRequestSuccessed = () => ({
  type: actionTypes.UPDTAE_ITEM_TEXT_REQUEST_SUCCESSED,
});
export const updateItemTextRequestAlreadyHave = () => ({
  type: actionTypes.UPDTAE_ITEM_TEXT_REQUEST_ALREADY_HAVE,
});
export const updateItemTextRequestFailed = () => ({
  type: actionTypes.UPDTAE_ITEM_TEXT_REQUEST_FAILED,
});
export const removeIdRequestSuccessed = () => ({
  type: actionTypes.REMOVE_ITEM_REQUEST_SUCCEESSED,
});
export const removeIdRequestFailed = () => ({
  type: actionTypes.REMOVE_ITEM_REQUEST_FAILED,
});
export const clearAllRequestSuccessed = () => ({
  type: actionTypes.CLEAR_ALL_ITEM_REQUEST_SUCCESS,
});
export const clearAllRequestFailed = () => ({
  type: actionTypes.CLEAR_ALL_ITEM_REQUEST_FAILED,
});

export const setToast = (toastType, message) => {
  return {
    type: actionTypes.SET_TOAST,
    toastParam: {
      toastType,
      message,
    },
  };
};

export const showLoaderAction = () => {
  return (dispatch) => dispatch(showLoader());
};

export const hideLoaderAction = () => {
  return (dispatch) => dispatch(hideLoader());
};

export const showToastAction = () => {
  return (dispatch) => dispatch(showToast());
};

export const hideToastAction = () => {
  return (dispatch) => dispatch(hideToast());
};

export const setFilterAction = (filter) => {
  return (dispatch) => dispatch(setFilter(filter));
};

export const setSortAction = (isChecked) => {
  return (dispatch) => {
    const newSortType = isChecked ? sortType.DESC : null;
    dispatch(setSort(newSortType));
  };
};

export const toggleSortTypeAction = (currentSortType) => {
  return (dispatch) => {
    const newSortType =
      currentSortType === sortType.ASC ? sortType.DESC : sortType.ASC;
    dispatch(setSort(newSortType));
  };
};

export const setSearchKeyAction = (input) => {
  const searchKey = input === "" ? null : input;
  return (dispatch) => {
    dispatch(setSearchKey(searchKey));
  };
};

export const setInputAction = (value) => {
  return (dispatch) => dispatch(setInput(value));
};
