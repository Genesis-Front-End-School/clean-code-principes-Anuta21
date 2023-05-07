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
import { authErrorResponse } from "../../services/constants";
import { unlockedStatus } from "../../components/lesson-card/constants";
import { courseType } from "./models";
import { baseErrorResponse } from "../../services/constants";

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
      let getCourseResponse = await client.getCourse(courseId, token);

      if (getCourseResponse && typeof getCourseResponse !== "string")
        setCourseData(getCourseResponse);
      else if (getCourseResponse === authErrorResponse) {
        const newToken = await client.getToken();
        dispatch(setToken(newToken as string));
        getData();
      } else if (getCourseResponse === baseErrorResponse) navigate("/error/");
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
