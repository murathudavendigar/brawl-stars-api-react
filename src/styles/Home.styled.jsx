import styled from "styled-components";
import { fadeIn } from "./animations";

export const HomeMainDiv = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const HeaderText = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
`;
