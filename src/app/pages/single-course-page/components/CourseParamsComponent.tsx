import { CourseParamsWrapper, RatingWrapper } from "../styles";
import { ICourseParams } from "../models";
import { SkillsList } from "../../../components/skills-list";

export const CourseParams: React.FC<ICourseParams> = ({ courseData }) => {
  return (
    <CourseParamsWrapper>
      <>Lessons Number: {courseData.lessons.length}</>
      <RatingWrapper>Rating: {courseData.rating}</RatingWrapper>
      <SkillsList skills={courseData?.meta?.skills} />
    </CourseParamsWrapper>
  );
};
