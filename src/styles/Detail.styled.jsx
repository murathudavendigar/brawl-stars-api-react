import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const rotateGlow = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.7; }
`;

const DetailMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh - 100px);
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 20%;
    left: -5%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(240, 25, 25, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: ${float} 8s ease-in-out infinite;
    pointer-events: none;
    z-index: -1;
  }

  &::after {
    content: "";
    position: fixed;
    bottom: 15%;
    right: -5%;
    width: 350px;
    height: 350px;
    background: radial-gradient(
      circle,
      rgba(33, 134, 255, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: ${float} 10s ease-in-out infinite reverse;
    pointer-events: none;
    z-index: -1;
  }
`;

export default DetailMain;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

export const BrawlerName = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  color: white;
  margin: 0 0 0.5rem 0;
  animation: ${fadeInUp} 0.6s ease-out;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  img {
    animation: ${float} 2s ease-in-out infinite;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
  }
`;

export const RarityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  margin: 0.5rem 0 1.5rem 0;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.$color}25, ${props.$color}10)`};
  border: 2px solid ${(props) => props.$color || "rgba(255, 255, 255, 0.3)"};
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: ${fadeInUp} 0.7s ease-out;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px ${(props) => props.$color}30;
`;

export const BrawlerImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 240px;
  margin: 1rem 0 2rem 0;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 220px;
    height: 220px;
    background: conic-gradient(
      from 0deg,
      transparent,
      ${(props) => props.$color || "#f01919"},
      transparent,
      ${(props) => props.$color || "#ff4757"},
      transparent
    );
    border-radius: 50%;
    animation: ${rotateGlow} 4s linear infinite;
    opacity: 0.4;
    filter: blur(12px);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 180px;
    background: radial-gradient(
      circle,
      ${(props) => props.$color || "rgba(240, 25, 25, 0.2)"} 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

export const DetailImage = styled.img`
  position: relative;
  z-index: 2;
  width: 180px;
  height: 180px;
  object-fit: contain;
  animation: ${scaleIn} 0.7s ease-out;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0;
  animation: ${fadeInUp} 0.8s ease-out;
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  min-width: 100px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .stat-icon {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
  .stat-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
  }
  .stat-label {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 0.2rem;
  }
`;

export const DescriptionCard = styled.div`
  max-width: 600px;
  padding: 1.5rem 2rem;
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  animation: ${fadeInUp} 0.7s ease-out;
  position: relative;

  &::before {
    content: """;
    position: absolute;
    top: -5px;
    left: 15px;
    font-size: 4rem;
    color: rgba(255, 255, 255, 0.05);
    font-family: Georgia, serif;
    line-height: 1;
    pointer-events: none;
  }

  p {
    position: relative;
    z-index: 1;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin: 0;
  }
`;

export const SectionTitle = styled.h2`
  position: relative;
  padding-bottom: 0.75rem;
  margin: 2rem 0 1rem 0;
  color: white;
  font-size: 1.5rem;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #f01919, #ff4757);
    border-radius: 2px;
  }
`;

export const AbilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 700px;
  margin: 0.5rem 0;
`;

export const AbilityCard = styled.div`
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.5s ease-out backwards;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.15s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
    border-color: ${(props) =>
      props.$type === "gadget"
        ? "rgba(255, 200, 50, 0.4)"
        : "rgba(240, 25, 25, 0.4)"};
  }
`;

export const AbilityType = styled.span`
  display: inline-block;
  padding: 0.25rem 0.7rem;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 15px;
  margin-bottom: 0.6rem;
  background: ${(props) =>
    props.$type === "gadget"
      ? "linear-gradient(135deg, #ffdd57, #ff9f43)"
      : "linear-gradient(135deg, #f01919, #ff4757)"};
  color: white;
`;

export const AbilityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  img {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  h4 {
    color: white;
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const AbilityDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
`;

export const BackButton = styled.button`
  margin: 2rem 0;
  padding: 0.9rem 2rem;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 50px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f01919, #ff4757);
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(240, 25, 25, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;
