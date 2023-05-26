import { render, screen } from "@testing-library/react";
import { SkillsList } from "../SkillsListComponent";
import { skills } from "./constants";

describe("CourseParams component", () => {
  test("renders component's elements", () => {
    render(<SkillsList skills={skills} />);

    const skillsElements = screen.getAllByLabelText("skill");
    expect(skillsElements).toHaveLength(skills.length);

    for (let skillNumber in skills) {
      expect(skillsElements[skillNumber]).toHaveTextContent(
        skills[skillNumber]
      );
    }
  });
});
