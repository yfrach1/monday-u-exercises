import actionTypes from "../actions/constants";
import toastTypes from "../actions/constants/Toast";
import message from "../actions/constants/Message";
const initialState = {
  showLoader: false,
  showToast: false,
  toastParam: { toastType: null, message: null },
  itemsFilter: "all",
  sortType: null,
  searchKey: null,
  inputValue: "",
};

const itemsViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_REQUEST: {
      return {
        ...state,
        showLoader: true,
      };
    }
    case actionTypes.FETCH_REQUEST_SUCCESSED: {
      return {
        ...state,
        showLoader: false,
        showToast: true,
        toastParam: {
          toastType: toastTypes.POSITIVE,
          message: message.FETCH_REQUEST_SUCCESSED,
        },
      };
    }
    case actionTypes.FETCH_REQUEST_FAILED: {
      return {
        ...state,
        showLoader: false,
        showToast: true,
        toastParam: {
          toastType: toastTypes.NEGATIVE,
          message: message.FETCH_REQUEST_FAILED,
        },
      };
    }

    case actionTypes.NEW_INPUT_REQUEST: {
      return {
        ...state,
        showLoader: true,
      };
    }
    case actionTypes.NEW_INPUT_REQUEST_SUCCESSED: {
      return {
        ...state,
        showLoader: false,
        showToast: true,
        toastParam: {
          toastType: toastTypes.POSITIVE,
          message: message.ADD_ITEM_SUCCESSED,
        },
      };
    }
    case actionTypes.ITEM_REQUEST_ALREADY_HAVE: {
      return {
        ...state,
        showLoader: false,
        showToast: true,
        toastParam: {
          toastType: toastTypes.NORMAL,
          message: message.ITEM_ALREADY_HAVE,
        },
      };
    }

    case actionTypes.NEW_INPUT_REQUEST_FAILED: {
      return {
        ...state,
        showLoader: false,
        showToast: true,
        toastParam: {
          toastType: toastTypes.NEGATIVE,
          message: message.ADD_ITEM_FAILED,
        },
      };
    }
    case actionTypes.TOGGLE_STATUS_REQUEST_SUCCESSED: {
      return {
        ...state,
        showToast: true,
        toastParam: {
          toastType: toastTypes.POSITIVE,
          message: action.newStatus
            ? message.TOGGLE_STATUS_CHECKED_SUCCESSED
            : message.TOGGLE_STATUS_UNCHECKED_SUCCESSED,
        },
      };
    }

    case actionTypes.REMOVE_ITEM_REQUEST_SUCCEESSED: {
      return {
        ...state,
        showToast: true,
        toastParam: {
          toastType: toastTypes.POSITIVE,
          message: message.DELETE_ITEM_SUCCESSED,
        },
      };
    }

    case actionTypes.REMOVE_ITEM_REQUEST_FAILED: {
      return {
        ...state,
        showToast: true,
        toastParam: {
          toastType: toastTypes.NEGATIVE,
          message: message.DELETE_ITEM_FAILED,
        },
      };
    }
    case actionTypes.CLEAR_ALL_ITEM_REQUEST_SUCCESS: {
      return {
        ...state,
        showToast: true,
        toastParam: {
          toastType: toastTypes.POSITIVE,
          message: message.CLEAR_ALL_ITEMS_SUCCESSED,
        },
      };
    }
    case actionTypes.CLEAR_ALL_ITEM_REQUEST_FAILED: {
      return {
        ...state,
        showToast: true,
        toastParam: {
          toastType: toastTypes.NEGATIVE,
          message: message.CLEAR_ALL_ITEMS_FAILED,
        },
      };
    }

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
    case actionTypes.SET_INPUT: {
      return {
        ...state,
        inputValue: action.value,
      };
    }
    case actionTypes.INPUT_NOT_VALID: {
      return {
        ...state,
        showToast: true,
        toastParam: { toastType: toastTypes.NEGATIVE, message: null },
      };
    }

    default:
      return state;
  }
};

export default itemsViewReducer;
