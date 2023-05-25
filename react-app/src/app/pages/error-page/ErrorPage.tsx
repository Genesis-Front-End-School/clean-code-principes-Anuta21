import { useNavigate } from "react-router-dom";
import { BackButton, ErrorMessage, Wrapper } from "./styles";
import { useAppSelector } from "../../redux";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const { darkMode } = useAppSelector((state) => state.persistedReducer.common);

  return (
    <Wrapper darkMode={darkMode}>
      <ErrorMessage>Something went wrong</ErrorMessage>
      <BackButton onClick={() => navigate("/courses/")}>
        Go back to courses
      </BackButton>
    </Wrapper>
  );
};
