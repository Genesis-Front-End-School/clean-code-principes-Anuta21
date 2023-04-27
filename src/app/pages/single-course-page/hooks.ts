import { AxiosError } from "axios";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  coursePageSlice,
  coursesListPageSlice,
  useAppSelector,
} from "../../redux";
import { Client, IGetCourse } from "../../services";
import { authErrorResponse } from "../../services/controllers/constants";
import { unlockedStatus } from "../../components/lesson-card/constants";
import { courseType } from "./models";

export const useCourse: courseType = () => {
  const { token, courseId } = useAppSelector(
    (state) => state.persistedReducer.coursesListPage
  );
  const { coursesProgress } = useAppSelector(
    (state) => state.persistedReducer.coursePage
  );

  const { setToken } = coursesListPageSlice.actions;
  const { setCourseProgress, setLessonProgress } = coursePageSlice.actions;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const client = new Client();

  const [courseData, setCourseData] = useState({} as IGetCourse);

  const videoRef = useRef<HTMLVideoElement | null>(null);

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

      async function getCourse(token: string) {
        try {
          const responseData = (await client.courses.getCourse(courseId, token))
            .data;
          const lessons = responseData.lessons.sort(
            (a, b) => a.order - b.order
          );
          responseData.lessons = lessons.slice();
          setCourseData(responseData);
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

      const response = await getCourse(token);
      if (response === authErrorResponse) {
        const newToken = await getToken();
        await getCourse(newToken);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (courseData.lessons) {
      if (!coursesProgress[courseId]) {
        const unlockedLessons = courseData.lessons.filter(
          (lesson) => lesson.status === unlockedStatus
        );
        const courseProgress = unlockedLessons.reduce(
          (arr, lesson) => ({ ...arr, [lesson.id]: 0 }),
          { preview: 0 }
        );
        dispatch(setCourseProgress({ courseId, courseProgress }));
      }
    }

    if (Hls.isSupported() && videoRef.current) {
      var hls = new Hls();
      hls.loadSource(courseData.meta.courseVideoPreview.link);
      hls.attachMedia(videoRef.current);
      videoRef.current.currentTime = coursesProgress[courseId]
        ? coursesProgress[courseId]["preview"]
        : 0;

      videoRef.current.addEventListener("timeupdate", function () {
        dispatch(
          setLessonProgress({
            courseId,
            lessonId: "preview",
            lessonProgressTime: this.currentTime,
          })
        );
      });
    }
  }, [courseData]);

  return { courseData, videoRef };
};
