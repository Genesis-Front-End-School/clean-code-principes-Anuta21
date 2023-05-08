import { ICourse } from "../../services";

export interface IArrayBounds {
  start: number;
  end: number | undefined;
}

interface IUseCoursesListReturn {
  courses: ICourse[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  coursesArrayBounds: IArrayBounds;
}

export type useCoursesListType = () => IUseCoursesListReturn;

export interface ICoursesListComponent {
  courses: ICourse[];
  coursesArrayBounds: IArrayBounds;
}
