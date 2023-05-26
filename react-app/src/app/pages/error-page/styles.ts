import styled from "styled-components";
import { Colors } from "../../common/assets";
import { IWrapperProps } from "./models";

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  background: ${(props) => (props.darkMode ? Colors.Black : Colors.White)};
  color: ${(props) => (props.darkMode ? Colors.White : Colors.Black)};
  font-size: 45px;
`;

export const BackButton = styled.button`
  margin-top: 40px;
  border: 0px;
  background-color: ${Colors.BlueGrey};
  cursor: pointer;

  text-decoration: underline;
  color: ${Colors.Black};
  font-size: 25px;
`;

export const ErrorMessage = styled.div`
  margin-top: 40vh;
  width: 80vw;
  text-align: center;
`;
