import { SkillsList } from "../../skills-list";
import { ICardParamsComponentProps } from "../models";
import { ParamContainer, ParamsComponent, TextContainer } from "../styles";

export const CardParamsComponent: React.FC<ICardParamsComponentProps> = ({
  lessonsCount,
  skills,
  rating,
}) => {
  return (
    <ParamsComponent>
      <TextContainer>
        <div>Lessons: {lessonsCount}</div>
        <ParamContainer>
          <SkillsList skills={skills} />
        </ParamContainer>
        <ParamContainer>Rating: {rating}</ParamContainer>
      </TextContainer>
    </ParamsComponent>
  );
};
