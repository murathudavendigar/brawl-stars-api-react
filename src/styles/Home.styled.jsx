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

export const HeaderText = styled.h1`
  font-size: clamp(1.8rem, 4.5vw, 2.6rem);
  text-align: center;
  color: var(--color-gold);
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink),
    1px -1px 0 var(--color-ink),
    -1px 1px 0 var(--color-ink);
  margin: 0.35rem 0 0.5rem;
`;

export const CatalogLead = styled.p`
  width: min(100%, 42rem);
  margin: 0 auto 1rem;
  text-align: center;
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-weight: 700;
  line-height: 1.5;
`;
