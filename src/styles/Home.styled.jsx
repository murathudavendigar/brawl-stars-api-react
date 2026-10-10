import styled from "styled-components";
import { fadeIn } from "./animations";

export const HomeMainDiv = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const CatalogHero = styled.header`
  width: min(100%, 920px);
  display: grid;
  justify-items: center;
  gap: 0.55rem;
  margin: 0.25rem auto 1rem;
  text-align: center;
`;

export const BrandMark = styled.img`
  width: min(220px, 58vw);
  height: auto;
  filter: drop-shadow(3px 4px 0 var(--color-ink));
`;

export const HeaderText = styled.h1`
  font-size: clamp(1.9rem, 4.8vw, 2.85rem);
  text-align: center;
  color: var(--color-gold);
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink),
    1px -1px 0 var(--color-ink),
    -1px 1px 0 var(--color-ink);
  margin: 0;
  line-height: 1.1;
`;

export const CatalogLead = styled.p`
  width: min(100%, 40rem);
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-weight: 700;
  line-height: 1.5;
`;
