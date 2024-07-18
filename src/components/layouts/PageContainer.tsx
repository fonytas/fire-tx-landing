// import styled from 'styled-components';

import { Container } from "@radix-ui/themes"
import { FC } from "react"

// export const PageContainer = styled.div`
//   width: 100vw;
//   max-width: 1600px;
//   padding: 0 22px;
//   margin: 0 auto;
//   box-sizing: border-box;
// `;

interface PageContainer {
  children?: any;
  maxWidth?: string;
}

export const PageContainer: FC<PageContainer> = ({ children,  maxWidth}) => {
  return (
    <Container maxWidth={maxWidth || "1100px"}>
      {children}
    </Container>
  )
}