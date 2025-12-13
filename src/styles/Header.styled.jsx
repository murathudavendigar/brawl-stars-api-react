import styled from "styled-components";
import Flex from "./Flex.styled";
import { fadeInUp } from "./animations";

const HeaderDiv = styled(Flex)`
  gap: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  animation: ${fadeInUp} 0.5s ease-out;
`;

export default HeaderDiv;

export const SearchInput = styled.input`
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: white;
  min-width: 250px;
  transition: all 0.4s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(240, 25, 25, 0.5);
    box-shadow: 0 0 20px rgba(240, 25, 25, 0.2);
  }

  @media (max-width: 768px) {
    min-width: 200px;
  }
`;

export const SearchButton = styled.button`
  padding: 0.8rem 1.8rem;
  border-radius: 30px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 1rem;
  background: linear-gradient(135deg, #f01919, #ff4757);
  color: white;
  border: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(240, 25, 25, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(240, 25, 25, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export const SelectList = styled.select`
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-family: var(--font-primary);
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 3rem;

  option {
    background: #1a1a2e;
    color: white;
    padding: 0.5rem;
  }

  &:focus {
    outline: none;
    border-color: rgba(240, 25, 25, 0.5);
    box-shadow: 0 0 20px rgba(240, 25, 25, 0.2);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;
