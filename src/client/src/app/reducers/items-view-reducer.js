import actionTypes from "../actions/constants";

const initialState = {
  showLoader: false,
  showToast: false,
  toastParam: { toastType: null, message: null },
  itemsFilter: "all",
  sortType: null,
  searchKey: null,
  inputValue: null,
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER: {
      return {
        ...state,
        showLoader: true,
      };
    }
    case actionTypes.HIDE_LOADER: {
      return {
        ...state,
        showLoader: false,
      };
    }
    case actionTypes.SHOW_TOAST: {
      return {
        ...state,
        showToast: true,
      };
    }
    case actionTypes.HIDE_TOAST: {
      return {
        ...state,
        showToast: false,
      };
    }
    case actionTypes.SET_TOAST: {
      return {
        ...state,
        toastParam: action.toastParam,
      };
    }
    case actionTypes.SET_FILTER: {
      return {
        ...state,
        itemsFilter: action.filter,
      };
    }
    case actionTypes.SET_SORT: {
      return {
        ...state,
        sortType: action.sortType,
      };
    }
    case actionTypes.SEARCH_KEY: {
      return {
        ...state,
        searchKey: action.searchKey,
      };
    }
    default:
      return state;
  }
};

export default itemsViewReducer;
