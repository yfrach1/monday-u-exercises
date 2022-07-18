import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false,
  showToast: false,
  toastParam: { toastType: null, message: null },
  itemsFilter: "all",
  sortType: "none",
  searchKey: "none",
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER: {
      return {
        showLoader: true,
        showToast: state.showToast,
        toastParam: state.toastParam,
        itemsFilter: state.itemsFilter,
        sortType: state.sortType,
        searchKey: state.searchKey,
      };
    }
    case actionTypes.HIDE_LOADER: {
      return {
        showLoader: false,
        showToast: state.showToast,
        toastParam: state.toastParam,
        itemsFilter: state.itemsFilter,
        sortType: state.sortType,
        searchKey: state.searchKey,
      };
    }
    case actionTypes.SHOW_TOAST: {
      return {
        showLoader: state.showLoader,
        showToast: true,
        toastParam: state.toastParam,
        itemsFilter: state.itemsFilter,
        sortType: state.sortType,
        searchKey: state.searchKey,
      };
    }
    case actionTypes.HIDE_TOAST: {
      return {
        showLoader: state.showLoader,
        showToast: false,
        toastParam: state.toastParam,
        itemsFilter: state.itemsFilter,
        sortType: state.sortType,
        searchKey: state.searchKey,
      };
    }
    case actionTypes.SET_TOAST: {
      return {
        showLoader: state.showLoader,
        showToast: state.showToast,
        toastParam: action.toastParam,
        itemsFilter: state.itemsFilter,
        sortType: state.sortType,
        searchKey: state.searchKey,
      };
    }
    case actionTypes.SET_FILTER: {
      return {
        showLoader: state.showLoader,
        showToast: state.showToast,
        toastParam: state.toastParam,
        itemsFilter: action.filter,
        sortType: state.sortType,
        searchKey: state.searchKey,
      };
    }
    case actionTypes.SET_SORT: {
      return {
        showLoader: state.showLoader,
        showToast: state.showToast,
        toastParam: state.toastParam,
        itemsFilter: state.itemsFilter,
        sortType: action.sortType,
        searchKey: state.searchKey,
      };
    }
    case actionTypes.SEARCH_KEY: {
      return {
        showLoader: state.showLoader,
        showToast: state.showToast,
        toastParam: state.toastParam,
        itemsFilter: state.itemsFilter,
        sortType: state.sortType,
        searchKey: action.searchKey,
      };
    }
    default:
      return state;
  }
};

export default itemsViewReducer;
