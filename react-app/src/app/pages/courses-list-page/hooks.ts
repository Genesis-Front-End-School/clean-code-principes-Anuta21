import { useEffect, useState } from "react";
import { Client, ICourse } from "../../services";
import { useNavigate } from "react-router-dom";
import { authErrorResponse, baseErrorResponse } from "../../services/constants";
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
    async function getData(): Promise<void> {
      let getCoursesResponse = await client.getCourses(token);

      if (getCoursesResponse && typeof getCoursesResponse !== "string")
        setCourses(getCoursesResponse);
      else if (getCoursesResponse === authErrorResponse) {
        const newToken = await client.getToken();
        dispatch(setToken(newToken as string));
        getData();
      } else if (getCoursesResponse === baseErrorResponse) navigate("/error/");
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
