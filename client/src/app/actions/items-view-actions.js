import actionsTypes from "./constants";

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
    const sortType = isChecked ? "DESC" : "none";
    dispatch(setSort(sortType));
  };
};

export const toggleSortTypeAction = (sortType) => {
  return (dispatch) => {
    const newSortType = sortType === "ASC" ? "DESC" : "ASC";
    dispatch(setSort(newSortType));
  };
};

export const setSearchKeyAction = (input) => {
  const searchKey = input === "" ? "none" : input;
  return (dispatch) => {
    dispatch(setSearchKey(searchKey));
  };
};
