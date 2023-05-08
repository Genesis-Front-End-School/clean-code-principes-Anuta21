import { render, fireEvent, screen } from "@testing-library/react";
import { LessonCardComponent } from "../LessonCardComponent";
import { lesson } from "./constants";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../redux";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigate,
}));

describe("Unlocked LessonCard component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Provider store={store}>
          <LessonCardComponent {...lesson} />
        </Provider>
      </Router>
    );
  });

  test("renders the lesson title and lock picture", () => {
    const titleElement = screen.getByText(
      `Lesson ${lesson.order} - ${lesson.title}`
    );
    expect(titleElement).toBeInTheDocument();

    const lockElement = screen.getByLabelText("lock");
    expect(lockElement).toBeInTheDocument();
  });

  test("shows error message when video fails to load", () => {
    const titleElement = screen.getByText(
      `Lesson ${lesson.order} - ${lesson.title}`
    );
    fireEvent.click(titleElement);

    const videoElement = screen.getByLabelText("video");
    fireEvent.error(videoElement);

    const errorMessage = screen.getByText("Failed to load media content");
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("Locked LessonCard component", () => {
  test("hides video player", () => {
    const lockedLesson = { ...lesson, status: "locked" };

    render(
      <Router>
        <Provider store={store}>
          <LessonCardComponent {...lockedLesson} />
        </Provider>
      </Router>
    );

    const titleElement = screen.getByText(
      `Lesson ${lesson.order} - ${lesson.title}`
    );
    fireEvent.click(titleElement);

    const videoElement = screen.queryByLabelText("video");
    expect(videoElement).not.toBeInTheDocument();
  });
});
