import { ICourseCardProps } from "../models";
import {
  Description,
  Title,
  Image,
  Wrapper,
  Content,
  Button,
  DescriptionText,
  TextContainer,
  ButtonText,
} from "../styles";
import { CardParamsComponent } from "./CardParamsComponent";

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
