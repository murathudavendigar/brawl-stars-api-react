import styled from "styled-components";
import {
  fadeIn,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  float,
  glow,
  pulse,
} from "./animations";

// Main Container
export const AboutContainer = styled.div`
  min-height: calc(100vh - 150px);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Hero Section
export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  gap: 4rem;
  width: 100%;
  padding: 2rem;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  animation: ${fadeInLeft} 0.8s ease-out;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, #f01919, #ff4757, #2186ff, #f01919);
    background-size: 300% 300%;
    border-radius: 50%;
    z-index: -1;
    animation: ${glow} 4s ease infinite;
  }

  @media (max-width: 900px) {
    animation: ${fadeInUp} 0.8s ease-out;
  }
`;

export const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border: 4px solid rgba(255, 255, 255, 0.1);
  animation: ${float} 4s ease-in-out infinite;
`;

export const ProfileInfo = styled.div`
  flex: 1;
  animation: ${fadeInRight} 0.8s ease-out;

  @media (max-width: 900px) {
    animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  }
`;

export const Name = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Title = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #ff4757;
  margin: 0 0 1rem;
  font-weight: 500;
`;

export const Bio = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin: 0;
`;

// Portfolio Button
export const PortfolioButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #f01919 0%, #ff4757 100%);
  border: none;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(240, 25, 25, 0.4);

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 30px rgba(240, 25, 25, 0.5);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  svg {
    font-size: 1.3rem;
  }
`;

// Skills Section
export const SkillsSection = styled.section`
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
`;

export const SectionTitle = styled.h3`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #f01919, #ff4757);
    margin: 0.75rem auto 0;
    border-radius: 2px;
  }
`;

export const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

export const SkillTag = styled.span`
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(240, 25, 25, 0.2),
      rgba(255, 71, 87, 0.2)
    );
    border-color: rgba(240, 25, 25, 0.5);
    transform: translateY(-2px);
  }
`;

// Social Section
export const SocialSection = styled.section`
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out 0.5s both;
`;

export const SocialGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  color: white;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px) scale(1.1);
    background: ${(props) =>
      props.$color || "linear-gradient(135deg, #f01919, #ff4757)"};
    border-color: transparent;
    box-shadow: 0 10px 30px
      ${(props) => props.$shadow || "rgba(240, 25, 25, 0.4)"};
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

// Project Info Card
export const ProjectCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out 0.7s both;

  h4 {
    font-size: 1.5rem;
    color: white;
    margin: 0 0 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0 0 1.5rem;
  }
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

export const TechBadge = styled.span`
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  background: linear-gradient(
    135deg,
    rgba(33, 134, 255, 0.2),
    rgba(33, 134, 255, 0.1)
  );
  border: 1px solid rgba(33, 134, 255, 0.3);
  border-radius: 20px;
  color: #4da6ff;
`;

// Version Badge
export const VersionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

// Footer
export const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  animation: ${fadeIn} 0.8s ease-out 0.9s both;

  a {
    color: #ff4757;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6b81;
    }
  }
`;

// Legacy export for backwards compatibility
const SocialDiv = SocialGrid;
export default SocialDiv;
