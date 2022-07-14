import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import Main from "../src/components/main/Main";

test("renders learn react link", () => {
  const res = render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  const linkElement = screen.getAllByText(/Todo App/i);
  expect(linkElement).not.toHaveLength(0);
});
