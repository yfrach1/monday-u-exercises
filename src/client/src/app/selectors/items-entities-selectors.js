import { createSelector } from "@reduxjs/toolkit";
// import {
//   getItemsFilter,
//   getSortType,
//   getSearchKey,
// } from "./items-view-selectors";
// import { compareItemName } from "../../utils/utils";
// import sortType from "../actions/constants/SortType";
// import filterType from "../actions/constants/Filter";
const getItemsEntities = (state) => state.itemsEntities;

export const getItemsObj = (state) => getItemsEntities(state).items;

// export const getFilteredItems = createSelector(
//   [getItemsObj, getItemsFilter, getSortType, getSearchKey],
//   (itemsObj, filter, sort, searchKey) => {
//     let itemsToBeView = Object.keys(itemsObj).map((key) => itemsObj[key]);
//     switch (filter) {
//       case filterType.DONE: {
//         itemsToBeView = itemsToBeView.filter((item) => item.status);
//         break;
//       }
//       case filterType.PENDING: {
//         itemsToBeView = itemsToBeView.filter((item) => !item.status);
//         break;
//       }
//     }

//     switch (sort) {
//       case sortType.DESC: {
//         itemsToBeView.sort(compareItemName);
//         break;
//       }
//       case sortType.ASC: {
//         itemsToBeView.sort(compareItemName).reverse();
//         break;
//       }
//     }
//     if (searchKey) {
//       itemsToBeView = itemsToBeView.filter((item) =>
//         item.itemName.toLowerCase().includes(searchKey)
//       );
//     }

//     return itemsToBeView;
//   }
// );

// export const getViewItemsAmount = createSelector(
//   [getItems],
//   (itemsToBEView) => itemsToBEView.length
// );

// export const getAllItemsAmount = createSelector([getItemsObj], (itemsObj) => {
//   return Object.keys(itemsObj).length;
// });
