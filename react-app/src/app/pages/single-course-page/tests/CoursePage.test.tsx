import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../redux";
import { CoursePage } from "../CoursePage";
import { useCourse } from "../hooks";
import {
  fetchingDataMock,
  lessonsCardsDataMock,
  loadedDataMock,
} from "./constants";

jest.mock("../hooks");
describe("CoursePage component", () => {
  test("renders loading spinner while course data is being fetched", () => {
    (useCourse as jest.Mock).mockReturnValue(fetchingDataMock);

    render(
      <Router>
        <Provider store={store}>
          <CoursePage />
        </Provider>
      </Router>
    );

    const spinner = screen.getByLabelText("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("renders course title and description when data is loaded", () => {
    (useCourse as jest.Mock).mockReturnValue(loadedDataMock);

    render(
      <Router>
        <Provider store={store}>
          <CoursePage />
        </Provider>
      </Router>
    );

    const titleElement = screen.getByText(loadedDataMock.courseData.title);
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(
      loadedDataMock.courseData.description
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders lesson cards when data is loaded", () => {
    (useCourse as jest.Mock).mockReturnValue(lessonsCardsDataMock);

    render(
      <Router>
        <Provider store={store}>
          <CoursePage />
        </Provider>
      </Router>
    );

    const lessonCards = screen.getAllByLabelText("card");
    const lessonsData = lessonsCardsDataMock.courseData.lessons;
    expect(lessonCards).toHaveLength(lessonsData.length);

    let lessonCard;
    for (let lessonNumber in lessonsData) {
      lessonCard = lessonCards[lessonNumber];
      expect(lessonCard).toHaveTextContent(lessonsData[lessonNumber].title);
    }
  });
});
