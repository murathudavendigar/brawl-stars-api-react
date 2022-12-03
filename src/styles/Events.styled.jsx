import styled from "styled-components";

const ButtonEventsPage = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 2rem;
  font-weight: 600;
  font-family: "Lilita One", cursive;
  color: ${({ color }) => (color ? "rgb(240,25,25)" : "rgb(145, 225, 54)")};
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    color: ${({ color }) =>
      color ? "rgba(240,25,25,0.60)" : "rgba(145, 225, 54,0.60)"};
  }
`;

export default ButtonEventsPage;
