import { render, screen } from "@testing-library/react";
import itemsEntitiesReducer from "../items-entities-reducer";

const initialState = {
  items: {},
  itemsAmount: 0,
};

describe("items Entities Reducer ", () => {
  const prevState = { ...initialState };
  let newStateAfterSetData;
  test("return prev state when no match case for a given action", () => {
    const action = { type: "ADD_USER" };
    const newState = itemsEntitiesReducer(prevState, action);
    expect(newState).toEqual(prevState);
  });

  test("return new state with 3 new items", () => {
    const data = [
      { id: 676, itemName: "Go to walk", status: false },
      { id: 677, itemName: "Eat some candy", status: true },
      { id: 678, itemName: "Drive to LA", status: false },
    ];
    const action = { type: "SET_DATA", data };
    newStateAfterSetData = itemsEntitiesReducer(prevState, action);
    expect(newStateAfterSetData.itemsAmount).toEqual(3);
  });

  test("return new state without item with id:677 ", () => {
    const action = { type: "REMOVE_ITEM", id: 677 };
    const newStateAfterRemoveItem = itemsEntitiesReducer(
      newStateAfterSetData,
      action
    );
    expect(newStateAfterRemoveItem[676]).toEqual(undefined);
  });

  test("return new empty state after delete all items ", () => {
    const action = { type: "REMOVE_ITEMS" };
    const newStateAfterDeleteAll = itemsEntitiesReducer(
      newStateAfterSetData,
      action
    );
    expect(newStateAfterDeleteAll).toEqual(initialState);
  });

  test("return new state after adding new item  ", () => {
    const newItems = [{ id: 99999, itemName: "Go to walk" }];
    const action = { type: "ADD_ITEMS", newItems };

    const newStateAfterAddItems = itemsEntitiesReducer(
      newStateAfterSetData,
      action
    );
    expect(newStateAfterAddItems.items[99999]).toEqual({
      id: 99999,
      itemName: "Go to walk",
    });
  });

  test("update item field and return new state with updated data  ", () => {
    const itemData = { newValue: true, id: 676, field: "status" };
    const action = { type: "UPDATE_ITEM", itemData };

    const newStateAfterUpdateItem = itemsEntitiesReducer(
      newStateAfterSetData,
      action
    );
    expect(newStateAfterUpdateItem.items[676].status).toEqual(true);
  });
});
