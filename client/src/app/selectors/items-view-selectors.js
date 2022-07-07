const getItemsView = (state) => state.itemsView;

export const getShowLoader = (state) => getItemsView(state).showLoader;
export const getShowToast = (state) => getItemsView(state).showToast;
export const getToastParam = (state) => getItemsView(state).toastParam;
export const getItemsFilter = (state) => getItemsView(state).itemsFilter;
export const getSortType = (state) => getItemsView(state).sortType;
export const getSearchKey = (state) => getItemsView(state).searchKey;
