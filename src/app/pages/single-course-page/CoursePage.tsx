import { useNavigate } from "react-router-dom";
import {
  Title,
  Wrapper,
  Description,
  BackButton,
  CircularProgressWrapper,
} from "./styles";
import { LessonCardComponent } from "../../components/lesson-card";
import { CircularProgress } from "@mui/material";
import { useCourse } from "./hooks";
import { CourseParams } from "./components/CourseParamsComponent";
import { ILesson } from "../../services";

export const CoursePage: React.FC = () => {
  const { courseData, videoRef } = useCourse();

  const navigate = useNavigate();

  return Object.keys(courseData).length !== 0 ? (
    <>
      <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
      <Wrapper>
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
        <CourseParams courseData={courseData} />
      </Wrapper>

      {courseData?.lessons.map((lesson: ILesson) => (
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
    </>
  ) : (
    <Wrapper>
      <CircularProgressWrapper>
        <CircularProgress size="100px" />
      </CircularProgressWrapper>
    </Wrapper>
  );
};
