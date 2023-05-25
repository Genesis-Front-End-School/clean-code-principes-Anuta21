import { render, screen } from "@testing-library/react";
import { CourseParams } from "../CourseParamsComponent";
import { lessonsNumber, rating, skills } from "./constants";

describe("CourseParams component", () => {
  test("renders component's elements", () => {
    render(
      <CourseParams
        lessonsNumber={lessonsNumber}
        rating={rating}
        skills={skills}
      />
    );

    const ratingTitle = screen.getByText(`Rating: ${rating}`);
    expect(ratingTitle).toBeInTheDocument();

    const lessonsNumberTitle = screen.getByText(
      `Lessons Number: ${lessonsNumber}`
    );
    expect(lessonsNumberTitle).toBeInTheDocument();
  });
});
