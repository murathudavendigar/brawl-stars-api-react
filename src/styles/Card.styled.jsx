import styled, { css } from "styled-components";
import Flex from "./Flex.styled";
import { fadeInUp, shimmer } from "./animations";

const comicPanel = css`
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
`;

export const CardMain = styled(Flex)`
  padding: 1.5rem;
  width: 100%;
  gap: 1.5rem;
  overflow-y: ${({ $overflowY }) => $overflowY || "visible"};
`;

const CardsInfo = styled(Flex)`
  ${comicPanel}
  flex-direction: column;
  background-color: var(--panel-bg);
  background-image: linear-gradient(
      ${({ $background }) => $background || "var(--color-primary)"},
      ${({ $background }) => $background || "var(--color-primary)"}
    ),
    linear-gradient(
      180deg,
      transparent 0%,
      ${({ $background }) => $background || "var(--color-primary)"}22 100%
    );
  background-size: 100% 148px, 100% 100%;
  background-repeat: no-repeat;
  background-position: top, center;
  gap: ${({ $gap }) => $gap || "0.55rem"};
  width: ${({ $compact }) => ($compact ? "11.5rem" : "14rem")};
  min-height: ${({ $compact }) => ($compact ? "22rem" : "26rem")};
  height: auto;
  margin: 0.5rem;
  padding: 3.1rem 0.9rem 1.15rem;
  font-size: 1rem;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease;
  animation: ${fadeInUp} 0.4s ease-out backwards;

  &:nth-child(-n + 6) {
    animation-delay: 0.06s;
  }

  &:focus-visible {
    outline: 3px solid var(--color-gold-light);
    outline-offset: 4px;
  }

  /* Divider under rarity header strip */
  &::before {
    content: "";
    position: absolute;
    top: 148px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--color-ink);
    pointer-events: none;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-3d-hover);

    img {
      transform: translateY(-3px);
    }
  }

  h2,
  h3 {
    color: var(--color-ink);
    background: var(--color-gold);
    border: 3px solid var(--color-ink);
    border-radius: 10px;
    box-shadow: 0 3px 0 #1a1020;
    text-shadow: none;
    margin: 0 0 0.35rem;
    padding: 0.28rem 0.45rem;
    text-align: center;
    font-size: 1.15rem;
    line-height: 1.15;
    width: 100%;
    z-index: 2;
  }

  p {
    display: ${({ $compact }) => ($compact ? "-webkit-box" : "block")};
    -webkit-line-clamp: ${({ $compact }) => ($compact ? 4 : "initial")};
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--color-text-body);
    font-family: var(--font-secondary);
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
  }

  img {
    transition: transform 0.16s ease;
    filter: drop-shadow(0 6px 0 rgba(11, 10, 18, 0.45));
    border: 3px solid var(--color-ink);
    border-radius: 12px;
    background: var(--color-ink);
    box-shadow: 0 3px 0 #1a1020;
  }
`;

export default CardsInfo;

export const ButtonCard = styled.button`
  padding: 0.55rem 1.15rem;
  cursor: pointer;
  border-radius: 14px;
  position: relative;
  margin: ${({ $static }) => ($static ? "1rem auto" : "0.65rem auto 0")};
  font-family: var(--font-primary);
  font-size: 0.9rem;
  background: var(--color-primary);
  color: var(--color-white);
  border: 3px solid var(--color-ink);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  box-shadow: var(--shadow-3d);
  overflow: hidden;
  z-index: 10;
  pointer-events: auto;
  white-space: nowrap;
  display: block;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 8px;
    right: 8px;
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
`;

export const CardStatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 0.25rem;
`;

export const CardSkeleton = styled.div`
  ${comicPanel}
  width: 14rem;
  min-height: 26rem;
  height: 26rem;
  margin: 0.5rem;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  background: var(--panel-bg);

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
      rgba(255, 185, 33, 0.18),
      transparent
    );
    animation: ${shimmer} 1.5s infinite;
    background-size: 200% 100%;
  }
`;

export const CardActionRow = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  z-index: 12;
`;

export const IconActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: ${({ $active }) =>
    $active ? "var(--color-gold)" : "var(--color-ink)"};
  color: ${({ $active }) => ($active ? "var(--color-ink)" : "var(--color-white)")};
  border: 3px solid var(--color-ink);
  box-shadow: 0 3px 0 #1a1020;
  font-size: 0.9rem;
  opacity: 1;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 #1a1020;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 #1a1020;
  }
`;

export const CardBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.25rem 0.7rem;
  background: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-primary);
  font-size: 0.7rem;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 3px solid var(--color-ink);
  box-shadow: 0 3px 0 #1a1020;
  z-index: 12;
`;

export const EmptyState = styled.div`
  width: min(100%, 520px);
  margin: 3rem auto;
  padding: 2rem 1.5rem 1.6rem;
  text-align: center;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-3d);
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-weight: 700;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 8px;
    border: 2px solid var(--color-gold);
    border-radius: 10px;
    pointer-events: none;
    opacity: 0.55;
  }

  h3 {
    color: var(--color-ink);
    font-family: var(--font-primary);
    font-size: 1.35rem;
    margin: 0 auto 0.7rem;
    display: inline-block;
    background: var(--color-gold);
    border: 3px solid var(--color-ink);
    border-radius: 10px;
    padding: 0.3rem 0.9rem;
    box-shadow: 0 3px 0 #1a1020;
    transform: rotate(-1.5deg);
  }

  p {
    position: relative;
    z-index: 1;
  }
`;

export const CardTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ $compact }) => ($compact ? "0.5rem" : "0")};
`;

export const CardText = styled.p`
  text-align: center;
  margin: ${({ $spaced }) => ($spaced ? "0.5rem 0" : "0")};
`;

export const EventTimeLabel = styled.h4`
  text-align: center;
  margin-top: ${({ $spaced }) => ($spaced ? "0.6rem" : "0")};
  color: var(--color-gold-light);
  text-shadow: 2px 2px 0 var(--color-ink);
`;

export const CardImage = styled.img`
  margin: ${({ $eventIcon }) => ($eventIcon ? "1rem 0" : "0.3rem 0")};
  padding: ${({ $eventIcon }) => ($eventIcon ? "1rem 0" : "0.2rem 0")};
`;

export const ComparePanel = styled.section`
  width: min(100%, 1000px);
  display: grid;
  gap: 1rem;
  margin: 0 auto 1.5rem;
  padding: 1.25rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-3d);

  h2 {
    color: var(--color-ink);
    text-align: center;
    background: var(--color-gold);
    border: 3px solid var(--color-ink);
    border-radius: 12px;
    padding: 0.35rem 0.8rem;
    justify-self: center;
    box-shadow: 0 3px 0 #1a1020;
  }
`;

export const CompareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const CompareCard = styled.article`
  display: grid;
  gap: 0.6rem;
  padding: 1rem;
  border-radius: var(--radius-lg);
  background: var(--nav-bg);
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-weight: 700;
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);

  img {
    width: 88px;
    height: 88px;
    object-fit: contain;
    justify-self: center;
    border: 3px solid var(--color-ink);
    border-radius: 12px;
    background: var(--color-ink);
  }

  h3 {
    text-align: center;
    font-family: var(--font-primary);
    color: var(--color-gold);
    text-shadow: 2px 2px 0 var(--color-ink);
  }
`;
