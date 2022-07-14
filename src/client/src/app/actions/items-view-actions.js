import actionsTypes from "./constants";
import sortType from "../actions/constants/SortType";
export const showLoader = () => ({
  type: actionsTypes.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: actionsTypes.HIDE_LOADER,
});

export const showToast = () => ({
  type: actionsTypes.SHOW_TOAST,
});

export const hideToast = () => ({
  type: actionsTypes.HIDE_TOAST,
});

const setFilter = (filter) => ({
  type: actionsTypes.SET_FILTER,
  filter,
});

export const setSort = (sortType) => ({
  type: actionsTypes.SET_SORT,
  sortType,
});

const setSearchKey = (searchKey) => ({
  type: actionsTypes.SEARCH_KEY,
  searchKey,
});

const setInput = (value) => ({
  type: actionsTypes.SET_INPUT,
  value,
});

export const setToast = (toastType, message) => {
  return {
    type: actionsTypes.SET_TOAST,
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
