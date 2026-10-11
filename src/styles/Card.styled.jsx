import styled, { css } from "styled-components";
import { fadeInUp, shimmer } from "./animations";

const comicPanel = css`
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
`;

export const CardMain = styled.div`
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 0.75rem 1rem 2rem;
  display: ${({ $stack }) => ($stack ? "flex" : "grid")};
  flex-direction: ${({ $stack }) => ($stack ? "column" : undefined)};
  align-items: ${({ $stack }) => ($stack ? "stretch" : "stretch")};
  grid-template-columns: ${({ $stack, $compact }) =>
    $stack
      ? undefined
      : `repeat(auto-fill, minmax(${$compact ? "10.5rem" : "13.5rem"}, 1fr))`};
  gap: ${({ $stack }) => ($stack ? "0.65rem" : "1.1rem")};
  justify-items: stretch;
  overflow-y: ${({ $overflowY }) => $overflowY || "visible"};

  @media (max-width: 640px) {
    padding: 0.35rem 0.15rem 1.5rem;
    gap: ${({ $stack }) => ($stack ? "0.5rem" : "0.55rem")};
    grid-template-columns: ${({ $stack }) =>
      $stack ? undefined : "repeat(2, minmax(0, 1fr))"};
  }
`;

const CardsInfo = styled.article`
  ${comicPanel}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  background-size: 100% 96px, 100% 100%;
  background-repeat: no-repeat;
  background-position: top, center;
  gap: 0;
  width: 100%;
  height: ${({ $compact }) => ($compact ? "22.5rem" : "25.5rem")};
  margin: 0;
  padding: 0.5rem 0.65rem 0.65rem;
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
    top: 96px;
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
    margin: 0;
    padding: 0.18rem 0.35rem;
    text-align: center;
    font-size: 0.95rem;
    line-height: 1.15;
    width: 100%;
    height: 1.95rem;
    z-index: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: ${({ $compact }) => ($compact ? 2 : 3)};
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--color-text-body);
    font-family: var(--font-secondary);
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
    margin: 0;
    min-height: ${({ $compact }) => ($compact ? "1.95rem" : "2.925rem")};
    max-height: ${({ $compact }) => ($compact ? "1.95rem" : "2.925rem")};
    flex: 0 0 auto;
  }

  img {
    transition: transform 0.16s ease;
    filter: drop-shadow(0 6px 0 rgba(11, 10, 18, 0.45));
    border: 3px solid var(--color-ink);
    border-radius: 12px;
    background: var(--color-ink);
    box-shadow: 0 3px 0 #1a1020;
    width: ${({ $compact }) => ($compact ? "96px" : "112px")};
    height: ${({ $compact }) => ($compact ? "96px" : "112px")};
    object-fit: contain;
    flex: 0 0 auto;
  }

  @media (max-width: 640px) {
    height: ${({ $compact }) => ($compact ? "17.5rem" : "19.25rem")};
    background-size: 100% 72px, 100% 100%;
    padding: 0.35rem 0.4rem 0.45rem;

    &::before {
      top: 72px;
    }

    &:hover {
      transform: translateY(-3px);
    }

    h2,
    h3 {
      font-size: 0.78rem;
      height: 1.55rem;
      padding: 0.1rem 0.2rem;
      border-width: 2px;
      border-radius: 8px;
    }

    p {
      -webkit-line-clamp: 2;
      font-size: 0.65rem;
      line-height: 1.25;
      min-height: 1.625rem;
      max-height: 1.625rem;
    }

    img {
      width: ${({ $compact }) => ($compact ? "64px" : "76px")};
      height: ${({ $compact }) => ($compact ? "64px" : "76px")};
      border-width: 2px;
      border-radius: 10px;
      filter: drop-shadow(0 4px 0 rgba(11, 10, 18, 0.4));
    }
  }
`;

export default CardsInfo;

export const CardHeaderBlock = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 5.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  flex: 0 0 5.1rem;
  padding-top: 1.65rem;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 640px) {
    height: 3.85rem;
    flex: 0 0 3.85rem;
    padding-top: 1.25rem;
    gap: 0.15rem;
  }
`;

export const CardBadgeSlot = styled.div`
  min-height: 1.45rem;
  height: 1.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 0 0 1.45rem;
  overflow: hidden;

  @media (max-width: 640px) {
    min-height: 1.2rem;
    height: 1.2rem;
    flex: 0 0 1.2rem;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  padding-top: 0.45rem;

  @media (max-width: 640px) {
    gap: 0.2rem;
    padding-top: 0.3rem;

    & > div:first-child {
      width: 76px !important;
      height: 76px !important;
    }
  }
`;

export const ButtonCard = styled.button`
  padding: 0.55rem 1.15rem;
  cursor: pointer;
  border-radius: 14px;
  position: relative;
  margin: ${({ $static }) => ($static ? "1rem auto" : "0 auto")};
  margin-top: ${({ $static }) => ($static ? "1rem" : "auto")};
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
  flex: 0 0 auto;
  width: calc(100% - 0.5rem);
  max-width: 11rem;

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

  @media (max-width: 640px) {
    padding: 0.4rem 0.55rem;
    font-size: 0.72rem;
    max-width: none;
    width: 100%;
    border-radius: 10px;
  }
`;

export const CardStatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
  min-height: 1.35rem;
  height: 1.35rem;
  margin-top: 0;
  flex: 0 0 1.35rem;
  overflow: hidden;

  @media (max-width: 640px) {
    min-height: 1.1rem;
    height: 1.1rem;
    flex: 0 0 1.1rem;
  }
`;

export const CardSkeleton = styled.div`
  ${comicPanel}
  width: 100%;
  height: 25.5rem;
  margin: 0;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
  background: var(--panel-bg);

  @media (max-width: 640px) {
    height: 19.25rem;
  }

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

  @media (max-width: 640px) {
    top: 6px;
    left: 6px;
    right: 6px;
    gap: 0.3rem;
  }
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

  @media (max-width: 640px) {
    width: 26px;
    height: 26px;
    border-width: 2px;
    border-radius: 8px;
    font-size: 0.72rem;
    box-shadow: 0 2px 0 #1a1020;
  }

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
  margin: 0;
  flex: 0 0 auto;
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
