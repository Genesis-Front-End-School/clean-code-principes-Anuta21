import React from "react";
import { unlockedStatus } from "./constants";
import { ILesson } from "../../services";
import {
  Title,
  Content,
  Video,
  ErrorMessage,
  LessonTitle,
  Lock,
} from "./styles";
import { useVideo } from "./hooks";

export const LessonCardComponent: React.FC<ILesson> = ({
  id,
  link,
  order,
  previewImageLink,
  status,
  title,
}) => {
  const {
    showVideo,
    setShowVideo,
    setDownloadVideo,
    videoRef,
    showErrorMessage,
  } = useVideo(id, link);

  const handleClick = () => {
    if (status === unlockedStatus) {
      setShowVideo(!showVideo);
      setDownloadVideo(true);
    }
  };

  return (
    <>
      <Title unlocked={status === unlockedStatus}>
        <LessonTitle onClick={handleClick}>
          Lesson {order} - {title}
        </LessonTitle>
        <Lock unlocked={status === unlockedStatus} />
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
            <ErrorMessage showErrorMessage={showErrorMessage}>
              Failed to load media content
            </ErrorMessage>
          </>
        )}
      </Content>
    </>
  );
};
