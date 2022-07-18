import { createSelector } from "@reduxjs/toolkit";
import {
  getItemsFilter,
  getSortType,
  getSearchKey,
} from "./items-view-selectors";
import { compareItemName } from "../../utils/utils";
const getItemsEntities = (state) => state.itemsEntities;

const getItemsObj = (state) => getItemsEntities(state).items;

export const getItems = createSelector(
  [getItemsObj, getItemsFilter, getSortType, getSearchKey],
  (itemsObj, filter, sort, searchKey) => {
    let itemsToBeView = Object.keys(itemsObj).map((key) => itemsObj[key]);
    switch (filter) {
      case "done": {
        itemsToBeView = itemsToBeView.filter((item) => item.status);
        break;
      }
      case "pending": {
        itemsToBeView = itemsToBeView.filter((item) => !item.status);
        break;
      }
    }
    switch (sort) {
      case "DESC": {
        itemsToBeView.sort(compareItemName);
        break;
      }
      case "ASC": {
        itemsToBeView.sort(compareItemName).reverse();
        break;
      }
    }
    if (searchKey !== "none") {
      itemsToBeView = itemsToBeView.filter((item) =>
        item.itemName.toLowerCase().includes(searchKey)
      );
    }

    return itemsToBeView;
  }
);

export const getViewItemsAmount = createSelector(
  [getItems],
  (itemsToBEView) => itemsToBEView.length
);

export const getAllItemsAmount = createSelector(
  [getItemsObj],
  (itemsObj) => Object.keys(itemsObj).length
);
