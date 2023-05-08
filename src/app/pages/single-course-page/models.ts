import { IGetCourse } from "../../services";

interface ICourseReturn {
  courseData: IGetCourse;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

export type courseType = () => ICourseReturn;

export interface ICourseParams {
  lessonsNumber: number;
  rating: number;
  skills: Array<string>;
}
