import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 16px;
  box-sizing: border-box;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  box-sizing: border-box;
  overflow: hidden;
`;
