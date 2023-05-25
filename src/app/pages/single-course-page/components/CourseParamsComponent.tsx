import { CourseParamsWrapper, RatingWrapper } from "../styles";
import { ICourseParams } from "../models";
import { SkillsList } from "../../../components/skills-list";

export const CourseParams: React.FC<ICourseParams> = ({
  lessonsNumber,
  rating,
  skills,
}) => {
  return (
    <CourseParamsWrapper>
      <div>Lessons Number: {lessonsNumber}</div>
      <RatingWrapper>Rating: {rating}</RatingWrapper>
      <SkillsList skills={skills} />
    </CourseParamsWrapper>
  );
};
