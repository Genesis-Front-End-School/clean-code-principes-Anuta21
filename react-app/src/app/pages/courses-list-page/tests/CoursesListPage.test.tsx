import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../redux";
import { CoursesListPage } from "../CoursesListPage";
import { useCoursesList } from "../hooks";
import { fetchingDataMock, loadedDataMock } from "./constants";

jest.mock("../hooks");

describe("CoursesListPage component", () => {
  test("renders loading spinner while courses data is being fetched", () => {
    (useCoursesList as jest.Mock).mockReturnValue(fetchingDataMock);

    render(
      <Router>
        <Provider store={store}>
          <CoursesListPage />
        </Provider>
      </Router>
    );

    const spinner = screen.getByLabelText("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("renders courses list with pagination when data is loaded", () => {
    (useCoursesList as jest.Mock).mockReturnValue(loadedDataMock);

    render(
      <Router>
        <Provider store={store}>
          <CoursesListPage />
        </Provider>
      </Router>
    );

    const coursesList = screen.getByLabelText("courses-list");
    expect(coursesList).toBeInTheDocument();

    const paginationElement = screen.getByLabelText("pagination");
    expect(paginationElement).toBeInTheDocument();
  });
});
