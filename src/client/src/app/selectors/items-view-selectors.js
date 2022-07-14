import sortType from "../actions/constants/SortType";
import filterType from "../actions/constants/Filter";
import { getItemsObj } from "./items-entities-selectors";
import { createSelector } from "@reduxjs/toolkit";
import { compareItemName } from "../../utils/utils";
const getItemsView = (state) => state.itemsView;

export const getShowLoader = (state) => getItemsView(state).showLoader;
export const getShowToast = (state) => getItemsView(state).showToast;
export const getToastParam = (state) => getItemsView(state).toastParam;
export const getItemsFilter = (state) => getItemsView(state).itemsFilter;
export const getSortType = (state) => getItemsView(state).sortType;
export const getSearchKey = (state) => getItemsView(state).searchKey;

export const getFilteredItems = createSelector(
  [getItemsObj, getItemsFilter, getSortType, getSearchKey],
  (itemsObj, filter, sort, searchKey) => {
    let itemsToBeView = Object.keys(itemsObj).map((key) => itemsObj[key]);
    switch (filter) {
      case filterType.DONE: {
        itemsToBeView = itemsToBeView.filter((item) => item.status);
        break;
      }
      case filterType.PENDING: {
        itemsToBeView = itemsToBeView.filter((item) => !item.status);
        break;
      }
    }

    switch (sort) {
      case sortType.DESC: {
        itemsToBeView.sort(compareItemName);
        break;
      }
      case sortType.ASC: {
        itemsToBeView.sort(compareItemName).reverse();
        break;
      }
    }
    if (searchKey) {
      itemsToBeView = itemsToBeView.filter((item) =>
        item.itemName.toLowerCase().includes(searchKey)
      );
    }

    return itemsToBeView;
  }
);

export const getViewItemsAmount = createSelector(
  [getFilteredItems],
  (itemsToBEView) => itemsToBEView.length
);

export const getAllItemsAmount = createSelector([getItemsObj], (itemsObj) => {
  return Object.keys(itemsObj).length;
});
