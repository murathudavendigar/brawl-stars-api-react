import styled from "styled-components";
import Flex from "./Flex.styled";

export const CardMain = styled(Flex)`
  padding: 1rem;
  width: 100%;
`;

const CardsInfo = styled(Flex)`
  background-color: #edb879;
  flex-direction: column;
  width: 12rem;
  height: 32rem;
  margin: 1rem;
  padding: 1rem 1.1rem 3rem;
  font-size: 1rem;
  border-radius: 5px;
  position: relative;
  overflow-x: hidden;
`;

export default CardsInfo;

export const ButtonCard = styled.button`
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  bottom: 5px;
  transition: all 0.3s;
  font-family: "Lilita One", cursive;
  &:active {
    transform: scale(0.97);
  }
  &:hover {
    background-color: rgb(240, 25, 25);
    color: white;
  }
`;
