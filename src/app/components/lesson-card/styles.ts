import styled from "styled-components";
import { Colors } from "../../common/assets";
import { IContent, IErrorMessageProps, ITitleProps } from "./models";
import { LockOutlined } from "@mui/icons-material";

export const Title = styled.div<ITitleProps>`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;

  overflow: hidden;
  background: ${Colors.BlueGrey};

  font-size: 26px;
  text-decoration: ${(props) => (props.unlocked ? "underline" : "default")};
  cursor: ${(props) => (props.unlocked ? "pointer" : "default")};

  @media (max-device-width: 480px) {
    height: 80px;
    max-width: 400px;
  }
`;

export const Content = styled.div<IContent>`
  height: ${(props) => (props.show ? "580px" : "0px")};
  margin: 20px 0px 0px 20px;
  opacity: ${(props) => (props.show ? "1" : "0")};

  @media (max-device-width: 480px) {
    height: ${(props) => (props.show ? "330px" : "0px")};
  }
`;

export const Video = styled.video<IContent>`
  height: ${(props) => (props.show ? "550px" : "0px")};
  position: absolute;
  margin-top: 20px;

  @media (max-device-width: 480px) {
    height: ${(props) => (props.show ? "250px" : "0px")};
    max-width: 90vw;
  }
`;

export const ErrorMessage = styled.div<IErrorMessageProps>`
  color: ${Colors.Red};
  opacity: ${(props) => (props.showErrorMessage ? "1" : "0")};
`;

export const LessonTitle = styled.div`
  margin-left: 20px;
`;

export const Lock = styled(LockOutlined)<ITitleProps>`
  opacity: ${(props) => (props.unlocked ? "0" : "1")};
  margin-left: "10px";
`;
