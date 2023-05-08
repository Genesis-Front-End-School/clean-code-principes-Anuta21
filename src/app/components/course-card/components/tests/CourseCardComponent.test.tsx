import { render, screen } from "@testing-library/react";
import { CourseCardComponent } from "../CourseCardComponent";
import {
  lessonsNumber,
  rating,
  skills,
  id,
  title,
  imageLink,
  description,
  onClickFunction,
} from "./constants";

describe("CourseCard component", () => {
  test("renders component's elements", () => {
    render(
      <CourseCardComponent
        id={id}
        title={title}
        imageLink={imageLink}
        description={description}
        lessonsCount={lessonsNumber}
        skills={skills}
        rating={rating}
        onClickFunction={onClickFunction}
      />
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();

    const chooseButton = screen.getByRole("button", { name: "Choose" });
    expect(chooseButton).toBeInTheDocument();
  });
});
