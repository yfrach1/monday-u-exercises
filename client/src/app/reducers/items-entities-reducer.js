import actionTypes from "../actions/constants";

const initialState = {
  items: {},
  itemsAmount: 0,
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA: {
      const itemsDict = {};
      const newSize = action.data.length; // check if it's cost more then increment inside for each
      action.data.forEach((item) => (itemsDict[item.id] = item));

      return {
        items: itemsDict,
        itemsAmount: newSize,
      };
    }
    case actionTypes.REMOVE_ITEM: {
      const id = action.id;
      const newItems = { ...state.items };
      delete newItems[id];
      const newSize = state.itemsAmount - 1;
      return {
        items: newItems,
        itemsAmount: newSize,
      };
    }
    case actionTypes.REMOVE_ITEMS: {
      return {
        items: {},
        itemsAmount: 0,
      };
    }
    case actionTypes.ADD_ITEMS: {
      const newItems = { ...state.items };
      const newSize = action.newItems.length;
      action.newItems.forEach((item) => (newItems[item.id] = item));
      return {
        items: newItems,
        itemsAmount: newSize + state.itemsAmount,
      };
    }
    case actionTypes.UPDATE_ITEM: {
      const { newValue, id, field } = action.itemData;
      const newItems = { ...state.items };
      newItems[id][field] = newValue;
      return { items: newItems, itemsAmount: state.itemsAmount };
    }
    default:
      return state;
  }
};

export default itemsEntitiesReducer;
