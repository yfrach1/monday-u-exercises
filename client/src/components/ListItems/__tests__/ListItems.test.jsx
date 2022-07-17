import { render, screen } from "@testing-library/react";
import ListItems from "../ListItems";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

const items = [
  {
    id: 56,
    name: "Take dog out for a walk",
    status: false,
  },
  {
    id: 32,
    name: "Do the dishes",
    status: true,
  },
];

describe("ListContainer", () => {
  test("should render both items (one done and one not)", () => {
    const fetchItems = jest.fn(() => items);
    render(
      <Provider store={store}>
        <ListItems items={items} fetchDataAction={fetchItems} />
      </Provider>
    );

    expect(fetchItems).toHaveBeenCalledTimes(1);

    // TODO: test that both items are rendered at the list
  });
});
