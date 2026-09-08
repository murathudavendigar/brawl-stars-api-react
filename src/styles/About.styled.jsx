import styled from "styled-components";
import { fadeIn, fadeInLeft, fadeInRight, fadeInUp } from "./animations";

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

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  gap: 4rem;
  width: 100%;
  padding: 1.5rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 16px;
  box-shadow: var(--shadow-3d);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  animation: ${fadeInLeft} 0.5s ease-out;
  border-radius: 50%;
  border: 6px solid var(--color-gold);
  box-shadow:
    0 0 0 3px var(--color-ink),
    0 5px 0 #1a1020;

  @media (max-width: 900px) {
    animation: ${fadeInUp} 0.5s ease-out;
  }
`;

export const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--nav-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border: 3px solid var(--color-ink);
`;

export const ProfileInfo = styled.div`
  flex: 1;
  animation: ${fadeInRight} 0.5s ease-out;

  @media (max-width: 900px) {
    animation: ${fadeInUp} 0.5s ease-out 0.15s both;
  }
`;

export const Name = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 0.5rem;
  color: var(--color-gold);
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink),
    1px -1px 0 var(--color-ink),
    -1px 1px 0 var(--color-ink);
`;

export const Title = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: var(--color-primary);
  margin: 0 0 1rem;
  font-weight: 400;
  text-shadow: 2px 2px 0 var(--color-ink);
`;

export const Bio = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-weight: 700;
  line-height: 1.7;
  margin: 0;
`;

export const PortfolioButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding: 0.85rem 1.6rem;
  font-size: 1.1rem;
  font-family: var(--font-primary);
  color: var(--color-white);
  background: var(--color-primary);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: var(--shadow-3d);
  position: relative;
  overflow: hidden;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 12px;
    right: 12px;
    height: 38%;
    background: rgba(255, 255, 255, 0.28);
    border-radius: 10px 10px 40% 40%;
    pointer-events: none;
  }

  &:hover {
    background: var(--color-button-hover);
    color: var(--color-ink);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  svg {
    font-size: 1.3rem;
  }
`;

export const SkillsSection = styled.section`
  width: 100%;
  animation: ${fadeInUp} 0.5s ease-out 0.15s both;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-gold);
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink);

  &::after {
    content: "";
    display: block;
    width: 72px;
    height: 6px;
    background: var(--color-primary);
    border: 2px solid var(--color-ink);
    margin: 0.75rem auto 0;
    border-radius: 6px;
  }
`;

export const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

export const SkillTag = styled.span`
  padding: 0.55rem 1.15rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 12px;
  box-shadow: var(--shadow-3d);
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--color-white);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;

  &:hover {
    background: var(--color-gold);
    color: var(--color-ink);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }
`;

export const SocialSection = styled.section`
  width: 100%;
  animation: ${fadeInUp} 0.5s ease-out 0.25s both;
`;

export const SocialGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  color: var(--color-white);
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
  text-decoration: none;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;

  &:hover {
    transform: translateY(-4px);
    background: ${(props) => props.$color || "var(--color-primary)"};
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;

export const ProjectCard = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 1.75rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 16px;
  box-shadow: var(--shadow-3d);
  text-align: center;
  animation: ${fadeInUp} 0.5s ease-out 0.3s both;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 8px;
    border: 2px solid var(--color-gold);
    border-radius: 10px;
    pointer-events: none;
    opacity: 0.4;
  }

  h4 {
    font-size: 1.5rem;
    color: var(--color-gold);
    margin: 0 0 1rem;
    text-shadow: 2px 2px 0 var(--color-ink);
    position: relative;
  }

  p {
    color: var(--color-text-body);
    font-family: var(--font-secondary);
    font-weight: 700;
    line-height: 1.6;
    margin: 0 0 1.25rem;
    position: relative;
  }

  p:last-child {
    margin-bottom: 0;
  }

  a {
    color: var(--color-gold);
    font-weight: 800;
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: var(--color-primary);
    }
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  margin: 0 auto 1.5rem;
  padding: 0;
  max-width: 38rem;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  li {
    position: relative;
    padding-left: 1.6rem;
    color: var(--color-text-body);
    font-family: var(--font-secondary);
    font-weight: 700;
    line-height: 1.5;
  }

  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.45rem;
    width: 0.7rem;
    height: 0.7rem;
    background: var(--color-gold);
    border: 2px solid var(--color-ink);
    border-radius: 3px;
    box-shadow: 0 2px 0 #1a1020;
  }
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
`;

export const TechBadge = styled.span`
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-family: var(--font-primary);
  background: var(--color-gold);
  border: 3px solid var(--color-ink);
  border-radius: 10px;
  box-shadow: 0 3px 0 #1a1020;
  color: var(--color-ink);
`;

export const VersionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  font-size: 0.9rem;
  font-family: var(--font-primary);
  background: var(--color-primary);
  border: 3px solid var(--color-ink);
  border-radius: 10px;
  box-shadow: 0 3px 0 #1a1020;
  color: var(--color-white);
  margin-top: 1rem;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 2rem;
  color: var(--color-text-muted);
  font-family: var(--font-secondary);
  font-size: 0.9rem;
  font-weight: 700;
  animation: ${fadeIn} 0.5s ease-out 0.35s both;

  a {
    color: var(--color-gold);
    text-decoration: none;
    text-shadow: 1px 1px 0 var(--color-ink);

    &:hover {
      color: var(--color-primary);
    }
  }
`;

const SocialDiv = SocialGrid;
export default SocialDiv;
