import {
  CircularProgressWrapper,
  PaginationWrapper,
  SwitcherContainer,
  Wrapper,
} from "./styles";
import { CircularProgress, Pagination } from "@mui/material";
import { maxCoursesNumberOnPage } from "./constants";
import { useCoursesList } from "./hooks";
import { CoursesListComponent } from "./components/CoursesListComponent";
import { Switcher } from "../../components";
import { useAppSelector } from "../../redux";

export const CoursesListPage: React.FC = () => {
  const { courses, currentPage, setCurrentPage, coursesArrayBounds } =
    useCoursesList();

  const { darkMode } = useAppSelector((state) => state.persistedReducer.common);

  return (
    <Wrapper darkMode={darkMode}>
      <SwitcherContainer>
        <Switcher />
      </SwitcherContainer>
      {courses.length > 0 ? (
        <>
          <CoursesListComponent
            courses={courses}
            coursesArrayBounds={coursesArrayBounds}
            darkMode={darkMode}
          />
          <PaginationWrapper darkMode={darkMode}>
            <Pagination
              aria-label="pagination"
              count={Math.ceil(courses.length / maxCoursesNumberOnPage)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              showFirstButton
              showLastButton
            />
          </PaginationWrapper>
        </>
      ) : (
        <CircularProgressWrapper>
          <CircularProgress size="100px" aria-label="spinner" />
        </CircularProgressWrapper>
      )}
    </Wrapper>
  );
};
