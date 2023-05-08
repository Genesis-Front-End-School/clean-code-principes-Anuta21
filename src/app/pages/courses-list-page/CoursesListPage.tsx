import { CircularProgressWrapper, PaginationWrapper, Wrapper } from "./styles";
import { CircularProgress, Pagination } from "@mui/material";
import { maxCoursesNumberOnPage } from "./constants";
import { useCoursesList } from "./hooks";
import { CoursesListComponent } from "./components/CoursesListComponent";

export const CoursesListPage: React.FC = () => {
  const { courses, currentPage, setCurrentPage, coursesArrayBounds } =
    useCoursesList();

  return (
    <Wrapper>
      {courses.length > 0 ? (
        <>
          <CoursesListComponent
            courses={courses}
            coursesArrayBounds={coursesArrayBounds}
          />
          <PaginationWrapper>
            <Pagination
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
          <CircularProgress size="100px" />
        </CircularProgressWrapper>
      )}
    </Wrapper>
  );
};
