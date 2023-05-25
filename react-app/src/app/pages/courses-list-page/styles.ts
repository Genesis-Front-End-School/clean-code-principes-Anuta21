import styled from "styled-components";
import { Colors } from "../../common/assets";
import { IWrapperProps } from "./models";

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  align-items: center;
  flex-direction: column;

  min-height: 100vh;

  background: ${(props) => (props.darkMode ? Colors.Black : Colors.White)};
`;

export const PaginationWrapper = styled.div<IWrapperProps>`
  background: ${(props) => (props.darkMode ? Colors.Grey : Colors.LightGrey)};
  margin: 20px 0px 20px 0px;
`;

export const CircularProgressWrapper = styled.div`
  transform: translateY(40vh);
`;

export const CourseCardComponentWrapper = styled.div`
  margin-top: 20px;
`;

export const SwitcherContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 30px;
`;
