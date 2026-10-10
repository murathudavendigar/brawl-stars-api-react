import { FaExchangeAlt, FaLink, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Tray = styled.aside`
  position: fixed;
  left: 50%;
  bottom: 1.25rem;
  transform: translateX(-50%);
  z-index: 90;
  width: min(calc(100% - 1.5rem), 520px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 16px;
  box-shadow: var(--shadow-3d-hover);
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  font-family: var(--font-primary);
  color: var(--color-gold);
  text-shadow: 2px 2px 0 var(--color-ink);
  font-size: 0.95rem;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TrayButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: 12px;
  border: 3px solid var(--color-ink);
  background: ${({ $primary }) =>
    $primary ? "var(--color-primary)" : "var(--nav-bg)"};
  color: ${({ $primary }) =>
    $primary ? "var(--color-white)" : "var(--color-gold-light)"};
  font-family: var(--font-primary);
  font-size: 0.85rem;
  box-shadow: 0 3px 0 #1a1020;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 #1a1020;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 #1a1020;
  }
`;

const TrayLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: 12px;
  border: 3px solid var(--color-ink);
  background: var(--color-gold);
  color: var(--color-ink);
  font-family: var(--font-primary);
  font-size: 0.85rem;
  box-shadow: 0 3px 0 #1a1020;
`;

const CompareTray = ({
  count,
  maxCompare,
  names = [],
  onClear,
  onJump,
  sharePath,
}) => {
  if (!count) return null;

  const handleCopy = async () => {
    const url = `${window.location.origin}${sharePath}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard can be blocked; ignore.
    }
  };

  return (
    <Tray aria-label="Compare tray">
      <Meta>
        <FaExchangeAlt aria-hidden="true" />
        <span>
          Compare {count}/{maxCompare}
          {names.length ? ` · ${names.join(" vs ")}` : ""}
        </span>
      </Meta>
      <Actions>
        {onJump && (
          <TrayButton type="button" $primary onClick={onJump}>
            Open
          </TrayButton>
        )}
        <TrayLink to={sharePath}>Lobby</TrayLink>
        <TrayButton type="button" onClick={handleCopy} aria-label="Copy compare link">
          <FaLink aria-hidden="true" />
          Copy
        </TrayButton>
        <TrayButton type="button" onClick={onClear} aria-label="Clear compare">
          <FaTimes aria-hidden="true" />
          Clear
        </TrayButton>
      </Actions>
    </Tray>
  );
};

export default CompareTray;
