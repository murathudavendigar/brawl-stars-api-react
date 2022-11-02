import styled from "styled-components";
import Flex from "./Flex.styled";
import "./GlobalStyles";

const HeaderDiv = styled(Flex)`
  gap: 1rem;
`;

export default HeaderDiv;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  background: transparent;
  border-radius: 5px;
  font-family: "Lilita One", cursive;
  transition: all 0.4s;
  font-weight: 600;
  &:focus {
    background-color: white;
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s;
  font-family: "Lilita One", cursive;

  &:active {
    transform: scale(0.97);
  }
  &:hover {
    background-color: rgb(240, 25, 25);
    color: white;
  }
`;
