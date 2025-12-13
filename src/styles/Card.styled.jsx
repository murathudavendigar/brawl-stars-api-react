import styled, { css } from "styled-components";
import Flex from "./Flex.styled";
import { fadeInUp, float, shimmer } from "./animations";

// Glassmorphism mixin
const glassMorphism = css`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

export const CardMain = styled(Flex)`
  padding: 1.5rem;
  width: 100%;
  gap: 1.5rem;
`;

const CardsInfo = styled(Flex)`
  ${glassMorphism}
  flex-direction: column;
  width: 14rem;
  height: 34rem;
  margin: 0.5rem;
  padding: 1.5rem 1.2rem 3.5rem;
  font-size: 1rem;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeInUp} 0.6s ease-out backwards;

  /* Stagger animation for children */
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.15s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.25s;
  }
  &:nth-child(5) {
    animation-delay: 0.3s;
  }
  &:nth-child(6) {
    animation-delay: 0.35s;
  }

  /* Gradient border effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.2)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  /* Shine effect on hover */
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(30deg);
    transition: all 0.6s ease;
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 255, 255, 0.1);

    &::before {
      opacity: 1;
    }

    &::after {
      animation: ${shimmer} 1.5s ease;
      opacity: 1;
    }

    img {
      transform: scale(1.1);
    }
  }

  h2 {
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    margin-bottom: 0.5rem;
    text-align: center;
    font-size: 1.3rem;
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    font-family: "Poppins", sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.4;
    text-align: center;
  }

  img {
    transition: transform 0.4s ease;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  }
`;

export default CardsInfo;

export const ButtonCard = styled.button`
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  border-radius: 25px;
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-primary);
  font-size: 0.9rem;
  background: linear-gradient(135deg, #f01919, #ff4757);
  color: white;
  border: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(240, 25, 25, 0.3);
  overflow: hidden;
  z-index: 10;
  pointer-events: auto;

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
    pointer-events: none;
  }

  &:hover {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(240, 25, 25, 0.5);
    background: linear-gradient(135deg, #ff4757, #f01919);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateX(-50%) scale(0.95);
  }
`;

// New: Loading skeleton for cards
export const CardSkeleton = styled.div`
  ${glassMorphism}
  width: 14rem;
  height: 34rem;
  margin: 0.5rem;
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    animation: ${shimmer} 1.5s infinite;
    background-size: 200% 100%;
  }
`;

// New: Badge component for cards
export const CardBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.3rem 0.8rem;
  background: linear-gradient(135deg, #f01919, #ff4757);
  color: white;
  font-size: 0.7rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 10px rgba(240, 25, 25, 0.4);
  animation: ${float} 3s ease-in-out infinite;
`;
