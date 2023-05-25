import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../redux";
import { ErrorPage } from "../ErrorPage";

describe("ErrorPage component", () => {
  test("renders its elements", () => {
    render(
      <Router>
        <Provider store={store}>
          <ErrorPage />
        </Provider>
      </Router>
    );

    const messageTitle = screen.getByText("Something went wrong");
    expect(messageTitle).toBeInTheDocument();

    const backButton = screen.getByRole("button", {
      name: "Go back to courses",
    });
    expect(backButton).toBeInTheDocument();
  });
});
