import React from "react";
import renderer from "react-test-renderer";
import Item from "../Item";

describe("Item Snapshot ", () => {
  const itemName = "itemName example";
  const id = 99999;
  const status = false;
  const checkIfTextAlreadyExist = (taskText) => {
    taskText ? true : false;
  };

  test("renders Item component with no variable sending via props from parent component", () => {
    const tree = renderer.create(<Item />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Item component with no variable sending via props from parent component", () => {
    const tree = renderer
      .create(
        <Item
          itemName={itemName}
          id={id}
          status={status}
          checkIfTextAlreadyExist={checkIfTextAlreadyExist}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Item component without itemName ", () => {
    const tree = renderer
      .create(
        <Item
          id={id}
          status={true} // check it
          checkIfTextAlreadyExist={checkIfTextAlreadyExist}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Item component without checkIfTextAlreadyExist function ", () => {
    const tree = renderer
      .create(<Item itemName={itemName} status={status} id={id} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
