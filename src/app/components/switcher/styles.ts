import styled from "styled-components";
import { IWrapperProps } from "./models";
import { Colors } from "../../common/assets";

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  align-items: center;
  flex-direction: column;

  color: ${(props) => (props.darkMode ? Colors.White : Colors.Black)};
`;
