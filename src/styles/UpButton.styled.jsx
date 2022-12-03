import styled from "styled-components";

export const Heading = styled.h1`
  text-align: center;
  color: green;
`;

export const Content = styled.div`
  overflow-y: scroll;
  height: 2500px;
`;

export const Button = styled.div`
  position: fixed;
  width: 100%;
  left: 94%;
  bottom: 40px;
  height: 20px;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: white;
  transition: all 0.3s;
  &:hover {
    color: rgb(240, 25, 25);
  }
  @media (max-width: 768px) {
    left: 88%;
    font-size: 1.7rem;
  }
`;
