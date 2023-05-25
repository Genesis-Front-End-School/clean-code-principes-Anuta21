import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../redux";
import { CoursesListComponent } from "../CoursesListComponent";
import { courses, coursesArrayBounds } from "./constants";

describe("CoursesList component", () => {
  test("renders courses cards", () => {
    render(
      <Router>
        <Provider store={store}>
          <CoursesListComponent
            courses={courses}
            coursesArrayBounds={coursesArrayBounds}
            darkMode={true}
          />
        </Provider>
      </Router>
    );

    const coursesCards = screen.getAllByLabelText("card");
    const coursesDataNumber = courses.length;
    expect(coursesCards).toHaveLength(coursesDataNumber);

    let courseCard;
    for (let courseNumber in courses) {
      courseCard = coursesCards[courseNumber];
      expect(courseCard).toHaveTextContent(courses[courseNumber].title);
    }
  });
});
