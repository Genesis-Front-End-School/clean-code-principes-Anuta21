import styled from "styled-components";
import { Colors } from "../../common/assets";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const PaginationWrapper = styled.div`
  background-color: ${Colors.Grey};
  margin: 20px 0px 20px 0px;
`;

export const CircularProgressWrapper = styled.div`
  transform: translateY(40vh);
`;

export const CourseCardComponentWrapper = styled.div`
  margin-top: 20px;
`;
