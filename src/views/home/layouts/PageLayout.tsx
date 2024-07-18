import { styled } from "styled-components";

const breakpoint = "768px"

const sidebarWidth = "320px"

const scrollBarCss = `
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--gray-6);
    border-radius: 3px;
  }
`

export const PageContainer = styled.div`
  display: flex;
  height: 100vh; /* Full viewport height */
  overflow: hidden; /* Hide overflow on main container */
  
  @media (max-width: 768px) {
    flex-direction: column; /* Vertical layout on smaller screens */
    height: auto; /* Infinite viewport height */
  }
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${sidebarWidth}; /* Example width for sidebar */
  overflow-y: auto; /* Allow sidebar to scroll if content is longer */
  z-index: 1; /* Ensure sidebar is above content */
  ${scrollBarCss}

  @media (max-width: ${breakpoint}) {
    position: static; /* Reset position for smaller screens */
    overflow-y: visible;
    width: 100%; /* Full width on smaller screens */
    height: auto;
  }
`;

export const Content = styled.div`
  flex: 1; /* Takes remaining space */
  margin-left: ${sidebarWidth}; /* Space for sidebar on larger screens */
  overflow-y: auto; /* Allow content to scroll if content is longer */
  ${scrollBarCss}

  @media (max-width: ${breakpoint}) {
    margin-left: 0; /* Remove margin on smaller screens */
    overflow-y: visible;
  }
`;
