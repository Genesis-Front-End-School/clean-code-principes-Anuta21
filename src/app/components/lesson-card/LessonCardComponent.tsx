import Hls from "hls.js";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { unlockedStatus } from "./constants";
import { ILesson } from "../../services";
import { Title, Content, Video } from "./styles";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { coursePageSlice, useAppSelector } from "../../redux";
import { Colors } from "../../common/assets";

export const LessonCardComponent: React.FC<ILesson> = ({
  id,
  link,
  order,
  previewImageLink,
  status,
  title,
}) => {
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
    if (showVideo) {
      if (Hls.isSupported() && videoRef.current instanceof HTMLMediaElement) {
        var hls = new Hls();

        try {
          hls.loadSource(link);
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              setShowErrorMessage(true);
            }
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
    }
  }, [downloadVideo]);

  const handleClick = () => {
    if (status === unlockedStatus) {
      setShowVideo(!showVideo);
      setDownloadVideo(true);
    }
  };

  return (
    <>
      <Title unlocked={status === unlockedStatus}>
        <div style={{ marginLeft: "20px" }} onClick={handleClick}>
          Lesson {order} - {title}
        </div>
        <LockOutlined
          style={{
            opacity: status === unlockedStatus ? "0" : "1",
            marginLeft: "10px",
          }}
        />
      </Title>

      <Content show={showVideo}>
        {status === unlockedStatus && (
          <>
            <Video
              show={showVideo}
              ref={videoRef}
              poster={`${previewImageLink}/lesson-${order}.webp`}
              controls
            />
            <div
              style={{
                color: Colors.Red,
                opacity: showErrorMessage ? "1" : "0",
              }}
            >
              Failed to load media content
            </div>
          </>
        )}
      </Content>
    </>
  );
};
