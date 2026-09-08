import styled from "styled-components";
import { fadeInUp } from "./animations";

export const Heading = styled.h1`
  text-align: center;
  color: var(--color-gold);
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink);
`;

export const Content = styled.div`
  overflow-y: scroll;
  height: 2500px;
`;

export const Button = styled.div`
  position: fixed;
  right: 30px;
  bottom: 40px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
  cursor: pointer;
  z-index: 100;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  animation: ${fadeInUp} 0.3s ease-out;

  svg {
    font-size: 1.5rem;
    color: var(--color-white);
    transition: transform 0.12s ease;
  }

  &:hover {
    background: var(--color-gold);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);

    svg {
      color: var(--color-ink);
      transform: translateY(-2px);
    }
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  @media (max-width: 768px) {
    right: 20px;
    bottom: 30px;
    width: 46px;
    height: 46px;
  }
`;
