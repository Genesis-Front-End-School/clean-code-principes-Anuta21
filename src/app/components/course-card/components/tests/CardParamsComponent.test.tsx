import { render, screen } from "@testing-library/react";
import { CardParamsComponent } from "../CardParamsComponent";
import { lessonsNumber, rating, skills } from "./constants";

describe("CardParams component", () => {
  test("renders component's elements", () => {
    render(
      <CardParamsComponent
        lessonsCount={lessonsNumber}
        skills={skills}
        rating={rating}
      />
    );

    const ratingTitle = screen.getByText(`Rating: ${rating}`);
    expect(ratingTitle).toBeInTheDocument();

    const lessonsNumberTitle = screen.getByText(`Lessons: ${lessonsNumber}`);
    expect(lessonsNumberTitle).toBeInTheDocument();
  });
});
