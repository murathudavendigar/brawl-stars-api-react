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
  font-family: "Nougat", sans-serif;
  transition: all 0.4s;
  font-weight: 800;
  font-size: 1.2rem;
  &:focus {
    background-color: white;
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s;
  font-family: "Nougat", sans-serif;
  font-size: 1.2rem;

  &:active {
    transform: scale(0.97);
  }
  &:hover {
    background-color: rgb(240, 25, 25);
    color: white;
  }
`;

export const SelectList = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-family: "Nougat", sans-serif;
  font-size: 1.2rem;
`;
