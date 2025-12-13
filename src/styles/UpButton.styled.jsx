import styled from "styled-components";
import { fadeInUp, float } from "./animations";

export const Heading = styled.h1`
  text-align: center;
  color: white;
  animation: ${float} 4s ease-in-out infinite;
`;

export const Content = styled.div`
  overflow-y: scroll;
  height: 2500px;
`;

export const Button = styled.div`
  position: fixed;
  right: 30px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f01919, #ff4757);
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 5px 20px rgba(240, 25, 25, 0.4);
  animation: ${fadeInUp} 0.4s ease-out;

  svg {
    font-size: 1.5rem;
    color: white;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 30px rgba(240, 25, 25, 0.5);

    svg {
      transform: translateY(-2px);
    }
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }

  @media (max-width: 768px) {
    right: 20px;
    bottom: 30px;
    width: 45px;
    height: 45px;
  }
`;
