import React from "react";
import { ICardParamsComponentProps, ICourseCardProps } from "./models";
import {
  Description,
  Title,
  Image,
  Wrapper,
  Content,
  ParamsComponent,
  Button,
  DescriptionText,
  TextContainer,
  ButtonText,
  ParamContainer,
} from "./styles";

export const CourseCardComponent: React.FC<ICourseCardProps> = ({
  id,
  title,
  imageLink,
  description,
  lessonsCount,
  skills,
  rating,
  onClickFunction,
}) => {
  return (
    <Wrapper>
      <Title>
        <TextContainer>{title}</TextContainer>
      </Title>
      <Content>
        <Image src={imageLink}></Image>
        <Description>
          <DescriptionText>{description}</DescriptionText>
        </Description>
        <CardParamsComponent
          lessonsCount={lessonsCount}
          skills={skills}
          rating={rating}
        />
        <Button onClick={() => onClickFunction(id)}>
          <ButtonText>Choose</ButtonText>
        </Button>
      </Content>
    </Wrapper>
  );
};

export const CardParamsComponent: React.FC<ICardParamsComponentProps> = ({
  lessonsCount,
  skills,
  rating,
}) => {
  const skillsList = () => {
    return skills ? (
      <>
        Skills:
        {skills.map((skill, id) => (
          <li key={id}>{skill}</li>
        ))}
      </>
    ) : (
      <>No skills</>
    );
  };

  return (
    <ParamsComponent>
      <TextContainer>
        <div>Lessons: {lessonsCount}</div>
        <ParamContainer>{skillsList()}</ParamContainer>
        <ParamContainer>Rating: {rating}</ParamContainer>
      </TextContainer>
    </ParamsComponent>
  );
};
