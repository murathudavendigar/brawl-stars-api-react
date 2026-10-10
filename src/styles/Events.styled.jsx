import styled from "styled-components";

export const EventNotice = styled.p`
  width: min(100%, 720px);
  margin: 0 auto 1.25rem;
  padding: 0.95rem 1.15rem;
  text-align: center;
  color: var(--color-text-body);
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
  font-family: var(--font-secondary);
  font-size: 0.95rem;
  font-weight: 700;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 6px;
    border: 2px solid var(--color-gold);
    border-radius: 8px;
    pointer-events: none;
    opacity: 0.4;
  }
`;

export const EventTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const EventFilters = styled.div`
  width: min(100%, 720px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto 1rem;
`;

export const EventRow = styled.article`
  width: min(100%, 820px);
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 1rem;
  align-items: center;
  margin: 0.65rem auto;
  padding: 0.85rem 1rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 16px;
  box-shadow: var(--shadow-3d);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  img {
    width: 88px;
    height: 88px;
    object-fit: cover;
    border-radius: 12px;
    border: 3px solid var(--color-ink);
    background: var(--color-ink);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }

  @media (max-width: 640px) {
    grid-template-columns: 72px 1fr;
    grid-template-rows: auto auto;

    > :last-child {
      grid-column: 1 / -1;
      justify-self: start;
    }
  }
`;

export const EventRowBody = styled.div`
  display: grid;
  gap: 0.35rem;
  min-width: 0;

  h3 {
    margin: 0;
    font-family: var(--font-primary);
    font-size: 1.2rem;
    color: var(--color-gold);
    text-shadow: 2px 2px 0 var(--color-ink);
  }

  p {
    margin: 0;
    font-family: var(--font-secondary);
    font-weight: 700;
    color: var(--color-text-body);
    font-size: 0.9rem;
  }
`;

export const EventRowMeta = styled.div`
  display: grid;
  gap: 0.35rem;
  justify-items: end;
  text-align: right;

  @media (max-width: 640px) {
    justify-items: start;
    text-align: left;
  }
`;

export const ModeChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-secondary);
  font-weight: 800;
  color: var(--color-text-muted);
  font-size: 0.85rem;

  img {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: 2px solid var(--color-ink);
  }
`;

export const CountdownBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0.3rem 0.7rem;
  border-radius: 10px;
  background: var(--color-ink);
  color: var(--color-gold-light);
  border: 3px solid var(--color-ink);
  box-shadow: 0 3px 0 #1a1020;
  font-family: var(--font-primary);
  font-size: 0.85rem;
  font-weight: 400;
  white-space: nowrap;
`;

const ButtonEventsPage = styled.button`
  outline: none;
  background: ${({ $isActive }) =>
    $isActive ? "var(--color-primary)" : "var(--panel-bg)"};
  padding: 0.75rem 1.8rem;
  border-radius: 14px;
  font-size: 1.25rem;
  font-family: var(--font-primary);
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-white)" : "var(--color-gold-light)"};
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
    color 0.12s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 12px;
    right: 12px;
    height: 38%;
    background: rgba(255, 255, 255, 0.22);
    border-radius: 10px 10px 40% 40%;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;

export default ButtonEventsPage;
