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

export const CountdownBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0.3rem 0.7rem;
  margin: 0.4rem 0;
  border-radius: 10px;
  background: var(--color-ink);
  color: var(--color-gold-light);
  border: 3px solid var(--color-ink);
  box-shadow: 0 3px 0 #1a1020;
  font-family: var(--font-primary);
  font-size: 0.85rem;
  font-weight: 400;
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
    color: ${({ $isActive }) =>
      $isActive ? "var(--color-white)" : "var(--color-ink)"};
    background: ${({ $isActive }) =>
      $isActive ? "var(--color-primary)" : "var(--color-gold)"};
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;

export default ButtonEventsPage;
