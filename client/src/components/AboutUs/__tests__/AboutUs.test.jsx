import React from "react";
import renderer from "react-test-renderer";
import AboutUs from "../AboutUs";

describe("AboutUs Snapshot ", () => {
  test("renders AboutUs component", () => {
    const tree = renderer.create(<AboutUs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
