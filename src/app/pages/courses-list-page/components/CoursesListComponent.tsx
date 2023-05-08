import { CourseCardComponent } from "../../../components/course-card";
import { CourseCardComponentWrapper } from "../styles";
import { useNavigate } from "react-router-dom";
import { coursesListPageSlice } from "../../../redux";
import { useDispatch } from "react-redux";
import { ICoursesListComponent } from "../models";

export const CoursesListComponent: React.FC<ICoursesListComponent> = ({
  courses,
  coursesArrayBounds,
}) => {
  const { setCourseId } = coursesListPageSlice.actions;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick: (courseId: string) => void = (courseId) => {
    dispatch(setCourseId(courseId));
    navigate(`/courses/course?courseId=${courseId}`);
  };

  return (
    <>
      {courses
        .slice(coursesArrayBounds.start, coursesArrayBounds.end)
        .map((course) => (
          <CourseCardComponentWrapper key={course.id}>
            <CourseCardComponent
              id={course.id}
              title={course.title}
              imageLink={`${course.previewImageLink}/cover.webp`}
              description={course.description}
              lessonsCount={course.lessonsCount}
              skills={course.meta.skills}
              rating={course.rating}
              onClickFunction={() => handleClick(course.id)}
            />
          </CourseCardComponentWrapper>
        ))}
    </>
  );
};
