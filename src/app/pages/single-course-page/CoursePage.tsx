import { useNavigate } from "react-router-dom";
import {
  Title,
  Wrapper,
  SpinnerWrapper,
  Description,
  BackButton,
  CircularProgressWrapper,
  MainWrapper,
  SwitcherContainer,
} from "./styles";
import { LessonCardComponent } from "../../components/lesson-card";
import { CircularProgress } from "@mui/material";
import { useCourse } from "./hooks";
import { CourseParams } from "./components/CourseParamsComponent";
import { ILesson } from "../../services";
import { useAppSelector } from "../../redux";
import { Switcher } from "../../components";

export const CoursePage: React.FC = () => {
  const { courseData, videoRef } = useCourse();

  const { darkMode } = useAppSelector((state) => state.persistedReducer.common);

  const navigate = useNavigate();

  return Object.keys(courseData).length !== 0 ? (
    <MainWrapper darkMode={darkMode}>
      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      <SwitcherContainer>
        <Switcher />
      </SwitcherContainer>

      <Wrapper darkMode={darkMode}>
        <Title>{courseData?.title}</Title>
        {courseData?.meta?.courseVideoPreview && (
          <video
            ref={videoRef}
            width="400px"
            poster={`${courseData?.meta?.courseVideoPreview?.previewImageLink}/preview.webp`}
            controls
          />
        )}

        <Description>{courseData?.description}</Description>
        <CourseParams
          lessonsNumber={courseData?.lessons?.length}
          rating={courseData?.rating}
          skills={courseData?.meta?.skills}
        />
      </Wrapper>

      {courseData?.lessons?.map((lesson: ILesson) => (
        <LessonCardComponent
          key={lesson.id}
          id={lesson.id}
          title={lesson.title}
          status={lesson.status}
          link={lesson.link}
          order={lesson.order}
          previewImageLink={lesson.previewImageLink}
        />
      ))}
    </MainWrapper>
  ) : (
    <SpinnerWrapper darkMode={darkMode}>
      <CircularProgressWrapper>
        <CircularProgress size="100px" aria-label="spinner" />
      </CircularProgressWrapper>
    </SpinnerWrapper>
  );
};
