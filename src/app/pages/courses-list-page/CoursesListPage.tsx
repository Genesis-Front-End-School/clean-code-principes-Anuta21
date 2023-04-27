import React from "react";
import { CourseCardComponent } from "../../components/course-card";
import {
  CircularProgressWrapper,
  CourseCardComponentWrapper,
  PaginationWrapper,
  Wrapper,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Pagination } from "@mui/material";
import { coursesListPageSlice } from "../../redux";
import { useDispatch } from "react-redux";
import { maxCoursesNumberOnPage } from "./constants";
import { useCoursesList } from "./hooks";
import { ICoursesListComponent } from "./models";

export const CoursesListPage: React.FC = () => {
  const { courses, currentPage, setCurrentPage, coursesArrayBounds } =
    useCoursesList();

  return (
    <Wrapper>
      {courses.length > 0 ? (
        <>
          <CoursesListComponent
            courses={courses}
            coursesArrayBounds={coursesArrayBounds}
          />
          <PaginationWrapper>
            <Pagination
              count={Math.ceil(courses.length / maxCoursesNumberOnPage)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              showFirstButton
              showLastButton
            />
          </PaginationWrapper>
        </>
      ) : (
        <CircularProgressWrapper>
          <CircularProgress size="100px" />
        </CircularProgressWrapper>
      )}
    </Wrapper>
  );
};

export const CoursesListComponent: React.FC<ICoursesListComponent> = ({
  courses,
  coursesArrayBounds,
}) => {
  const { setCourseId } = coursesListPageSlice.actions;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (courseId: string) => {
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
