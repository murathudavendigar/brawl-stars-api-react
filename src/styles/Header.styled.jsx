import styled from "styled-components";
import Flex from "./Flex.styled";
import { fadeInUp } from "./animations";

const HeaderDiv = styled(Flex)`
  gap: 0.65rem;
  padding: 0.5rem 0;
  margin: 0 auto 0.5rem;
  animation: ${fadeInUp} 0.4s ease-out;
  align-items: stretch;
  width: min(100%, 1180px);

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
    padding: 0.25rem 0;
    margin-bottom: 0.35rem;
  }
`;

export default HeaderDiv;

export const SearchInput = styled.input`
  padding: 0.75rem 1.15rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text-body);
  min-width: 0;
  flex: 1 1 12rem;
  transition: box-shadow 0.12s ease, transform 0.12s ease;

  @media (max-width: 640px) {
    grid-column: 1 / -1;
    width: 100%;
    padding: 0.65rem 0.9rem;
    font-size: 0.95rem;
  }

  &::placeholder {
    color: var(--color-text-muted);
    opacity: 0.9;
  }

  &:focus {
    outline: none;
    box-shadow: var(--shadow-3d), 0 0 0 3px var(--color-gold);
  }
`;

export const SearchButton = styled.button`
  padding: 0.75rem 1.35rem;
  border-radius: 14px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 1rem;
  background: var(--color-primary);
  color: var(--color-white);
  border: 3px solid var(--color-ink);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;
  box-shadow: var(--shadow-3d);
  position: relative;
  overflow: hidden;

  @media (max-width: 640px) {
    padding: 0.65rem 0.9rem;
    font-size: 0.88rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 10px;
    right: 10px;
    height: 38%;
    background: rgba(255, 255, 255, 0.28);
    border-radius: 10px 10px 40% 40%;
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    background: var(--color-button-hover);
    color: var(--color-ink);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    transform: none;
    box-shadow: var(--shadow-3d-pressed);
  }
`;

export const SelectList = styled.select`
  padding: 0.75rem 1.15rem;
  border-radius: 14px;
  font-family: var(--font-primary);
  font-size: 1rem;
  background-color: var(--panel-bg);
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  color: var(--color-white);
  cursor: pointer;
  transition: box-shadow 0.12s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23FFB921' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.85rem center;
  background-size: 1rem;
  padding-right: 2.8rem;
  min-width: 0;
  width: 100%;

  @media (max-width: 640px) {
    padding: 0.6rem 2.2rem 0.6rem 0.75rem;
    font-size: 0.88rem;
    background-position: right 0.65rem center;
  }

  option {
    background: var(--nav-bg);
    color: var(--color-white);
    padding: 0.5rem;
  }

  &:focus {
    outline: none;
    box-shadow: var(--shadow-3d), 0 0 0 3px var(--color-gold);
  }
`;

export const ControlBar = styled.div`
  width: min(100%, 1180px);
  display: grid;
  gap: 0.55rem;
  padding: 0.65rem;
  margin: 0 auto 0.45rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-3d);

  @media (max-width: 640px) {
    gap: 0.45rem;
    padding: 0.55rem;
    margin-bottom: 0.35rem;
  }
`;

export const ControlBarRow = styled.div`
  display: grid;
  gap: 0.5rem;
  align-items: end;
  grid-template-columns: ${({ $cols }) =>
    $cols === "actions"
      ? "repeat(3, minmax(0, 1fr))"
      : "repeat(2, minmax(0, 1fr))"};

  @media (max-width: 640px) {
    gap: 0.4rem;
  }
`;

export const ControlsPanel = styled.div`
  width: min(100%, 1180px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  margin: 0.25rem auto 0.75rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-3d);
  animation: ${fadeInUp} 0.35s ease-out;
`;

export const FilterLabel = styled.label`
  display: grid;
  gap: 0.35rem;
  color: var(--color-gold-light);
  font-family: var(--font-secondary);
  font-size: 0.82rem;
  font-weight: 800;
  text-shadow: 1px 1px 0 var(--color-ink);
`;

export const ControlButton = styled(SearchButton)`
  border-radius: 14px;
  padding: 0.75rem 0.85rem;
  align-self: end;
  height: fit-content;
  white-space: nowrap;
  font-size: 0.92rem;

  @media (max-width: 640px) {
    padding: 0.7rem 0.25rem;
    min-height: 2.75rem;
    font-size: 0.78rem;
    white-space: nowrap;
    line-height: 1.1;
    text-align: center;
  }
`;

export const ResultMeta = styled.div`
  width: min(100%, 1180px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0 auto 0.5rem;
  padding: 0 1.25rem;
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-size: 0.9rem;
  font-weight: 700;

  @media (max-width: 640px) {
    margin: 0 auto 0.25rem;
    padding: 0 0.25rem;
    font-size: 0.8rem;
    gap: 0.4rem;
  }
`;
