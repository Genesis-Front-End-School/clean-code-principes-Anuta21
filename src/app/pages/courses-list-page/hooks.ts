import { useEffect, useState } from "react";
import { Client, ICourse } from "../../services";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { authErrorResponse } from "../../services/controllers/constants";
import { coursesListPageSlice, useAppSelector } from "../../redux";
import { useDispatch } from "react-redux";
import { IArrayBounds, useCoursesListType } from "./models";
import { maxCoursesNumberOnPage } from "./constants";

export const useCoursesList: useCoursesListType = () => {
  const { token } = useAppSelector(
    (state) => state.persistedReducer.coursesListPage
  );
  const { setToken } = coursesListPageSlice.actions;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const client = new Client();

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

  return {
    courses,
    setCourses,
    currentPage,
    setCurrentPage,
    coursesArrayBounds,
    setCoursesArrayBounds,
  };
};
