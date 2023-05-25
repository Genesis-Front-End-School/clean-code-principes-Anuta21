import styled from "styled-components";
import { Colors } from "../../common/assets";
import { IWrapperProps } from "./models";

export const MainWrapper = styled.div<IWrapperProps>`
  background: ${(props) => (props.darkMode ? Colors.Black : Colors.White)};
`;

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  align-items: center;
  flex-direction: column;

  background: ${(props) => (props.darkMode ? Colors.Black : Colors.White)};
  color: ${(props) => (props.darkMode ? Colors.White : Colors.Black)};
  margin-bottom: 50px;
`;

export const SpinnerWrapper = styled.div<IWrapperProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;

  background: ${(props) => (props.darkMode ? Colors.Black : Colors.White)};
`;

export const Title = styled.div`
  margin: 20px 0px 20px 0px;
  font-size: 30px;

  @media (max-device-width: 480px) {
    margin-top: 40px;
    width: 80vw;
  }
`;

export const Description = styled.div`
  @media (max-device-width: 480px) {
    width: 80vw;
  }
`;

export const BackButton = styled.button`
  border: 0px;
  background-color: ${Colors.BlueGrey};
  transform: translate(5vw, 5vh);
  cursor: pointer;

  text-decoration: underline;
  color: ${Colors.Black};
  font-size: 20px;

  @media (max-device-width: 480px) {
    transform: translate(4vw, 2vh);
  }
`;

export const CircularProgressWrapper = styled.div`
  transform: translateY(40vh);
`;

export const CourseParamsWrapper = styled.div`
  margin: 20px 0 20px 0;
`;

export const RatingWrapper = styled.div`
  margin-bottom: 20px;
`;

export const SwitcherContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 30px;
`;
