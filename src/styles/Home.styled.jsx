import styled from "styled-components";
import { fadeIn } from "./animations";

export const HomeMainDiv = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0.75rem 1rem 2.5rem;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 640px) {
    padding: 0.4rem 0.55rem 2rem;
  }
`;

export const CatalogHero = styled.header`
  width: min(100%, 640px);
  display: grid;
  justify-items: center;
  gap: 0.25rem;
  margin: 0.1rem auto 0.55rem;
  text-align: center;

  @media (max-width: 640px) {
    gap: 0.1rem;
    margin: 0 auto 0.35rem;
  }
`;

export const BrandMark = styled.img`
  width: min(160px, 42vw);
  height: auto;
  filter: drop-shadow(3px 4px 0 var(--color-ink));
`;

export const HeaderText = styled.h1`
  font-size: clamp(1.55rem, 3.6vw, 2.15rem);
  text-align: center;
  color: var(--color-gold);
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink),
    1px -1px 0 var(--color-ink),
    -1px 1px 0 var(--color-ink);
  margin: 0;
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: 1.45rem;
  }
`;

export const CatalogLead = styled.p`
  width: min(100%, 30rem);
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 0.88rem;
  line-height: 1.4;

  @media (max-width: 640px) {
    display: none;
  }
`;
