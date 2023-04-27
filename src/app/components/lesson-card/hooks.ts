import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coursePageSlice, useAppSelector } from "../../redux";
import { useVideoType } from "./models";

export const useVideo: useVideoType = (id, link) => {
  const [showVideo, setShowVideo] = useState(false);
  const [downloadVideo, setDownloadVideo] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseId } = useAppSelector(
    (state) => state.persistedReducer.coursesListPage
  );
  const { coursesProgress } = useAppSelector(
    (state) => state.persistedReducer.coursePage
  );
  const { setLessonProgress } = coursePageSlice.actions;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (
      showVideo &&
      Hls.isSupported() &&
      videoRef.current instanceof HTMLMediaElement
    ) {
      var hls = new Hls();

      try {
        hls.loadSource(link);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.ERROR, function (event, data) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR)
            setShowErrorMessage(true);
        });
      } catch {
        navigate("/error/");
      }

      videoRef.current.currentTime = coursesProgress[courseId]
        ? coursesProgress[courseId][id]
        : 0;

      videoRef.current.addEventListener("timeupdate", function () {
        dispatch(
          setLessonProgress({
            courseId,
            lessonId: id,
            lessonProgressTime: this.currentTime,
          })
        );
      });
    }
  }, [downloadVideo]);

  return {
    showVideo,
    setShowVideo,
    setDownloadVideo,
    videoRef,
    showErrorMessage,
  };
};
