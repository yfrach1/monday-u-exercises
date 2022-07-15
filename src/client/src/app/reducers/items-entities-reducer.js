import actionTypes from "../actions/constants";

const initialState = {
  items: {},
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA: {
      const itemsDict = {};
      action.data.forEach((item) => (itemsDict[item.id] = item));
      return {
        items: itemsDict,
      };
    }
    case actionTypes.REMOVE_ITEM: {
      const id = action.id;
      const newItems = { ...state.items };
      delete newItems[id];
      return {
        items: newItems,
      };
    }
    case actionTypes.CLEAR_ITEMS: {
      return {
        items: {},
        itemsAmount: 0,
      };
    }
    case actionTypes.ADD_ITEMS: {
      const newItems = { ...state.items };
      action.newItems.forEach((item) => (newItems[item.id] = item));
      return {
        items: newItems,
      };
    }
    case actionTypes.UPDATE_ITEM: {
      const { newValue, id, field } = action.itemData;

      const newItems = { ...state.items };
      newItems[id][field] = newValue;
      return {
        items: newItems,
      };
    }
    default:
      return state;
  }
};

export default itemsEntitiesReducer;
