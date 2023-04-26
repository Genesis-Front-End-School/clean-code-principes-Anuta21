import React, { useEffect, useState } from "react";
import { Client, ICourse } from "../../services";
import { CourseCardComponent } from "../../components/course-card";
import { PaginationWrapper, Wrapper } from "./styles";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Pagination } from "@mui/material";
import { AxiosError } from "axios";
import { authErrorResponse } from "../../services/controllers/constants";
import { coursesListPageSlice, useAppSelector } from "../../redux";
import { useDispatch } from "react-redux";
import { IArrayBounds } from "./models";
import { maxCoursesNumberOnPage } from "./constants";

export const CoursesListPage: React.FC = () => {
  const { token } = useAppSelector(
    (state) => state.persistedReducer.coursesListPage
  );
  const { setToken, setCourseId } = coursesListPageSlice.actions;
  const dispatch = useDispatch();

  const client = new Client();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([] as Array<ICourse>);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesArrayBounds, setCoursesArrayBounds] = useState({
    start: 0,
    end: maxCoursesNumberOnPage,
  } as IArrayBounds);

  useEffect(() => {
    setCoursesArrayBounds({
      start: (currentPage - 1) * maxCoursesNumberOnPage,
      end:
        courses.length / maxCoursesNumberOnPage > currentPage
          ? currentPage * maxCoursesNumberOnPage
          : undefined,
    });
  }, [currentPage, courses]);

  useEffect(() => {
    async function getData() {
      async function getToken() {
        try {
          const responseData = (await client.auth.getToken()).data;
          dispatch(setToken(responseData.token));
          return responseData.token;
        } catch (error) {
          return;
        }
      }

      async function getCourses(token: string) {
        try {
          const responseData = (await client.courses.getCourses(token)).data;
          setCourses(responseData.courses.reverse());
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              return authErrorResponse;
            } else {
              navigate("/error/");
            }
          }
        }
      }

      const response = await getCourses(token);
      if (response === authErrorResponse) {
        const newToken = await getToken();
        await getCourses(newToken);
      }
    }

    getData();
  }, []);

  const handleClick = (courseId: string) => {
    dispatch(setCourseId(courseId));
    navigate(`/courses/course?courseId=${courseId}`);
  };

  return (
    <Wrapper>
      {courses.length > 0 ? (
        <>
          <div>
            {courses
              .slice(coursesArrayBounds.start, coursesArrayBounds.end)
              .map((course) => (
                <div key={course.id} style={{ marginTop: "20px" }}>
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
                </div>
              ))}
          </div>

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
        <div style={{ transform: "translateY(40vh)" }}>
          <CircularProgress size="100px" />
        </div>
      )}
    </Wrapper>
  );
};
