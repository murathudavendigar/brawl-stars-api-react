import styled from "styled-components";

const ButtonEventsPage = styled.button`
  border: none;
  outline: none;
  background: ${({ $isActive }) =>
    $isActive
      ? "linear-gradient(135deg, rgba(240, 25, 25, 0.2), rgba(240, 25, 25, 0.1))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: var(--font-primary);
  color: ${({ $isActive }) =>
    $isActive ? "#ff4757" : "rgba(255, 255, 255, 0.6)"};
  border: 2px solid
    ${({ $isActive }) =>
      $isActive ? "rgba(240, 25, 25, 0.5)" : "rgba(255, 255, 255, 0.15)"};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ $isActive }) =>
      $isActive
        ? "linear-gradient(135deg, rgba(240, 25, 25, 0.2), rgba(240, 25, 25, 0.1))"
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))"};
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    color: ${({ $isActive }) => ($isActive ? "#ff4757" : "#ffffff")};
    border-color: ${({ $isActive }) =>
      $isActive ? "#f01919" : "rgba(255, 255, 255, 0.3)"};
    box-shadow: ${({ $isActive }) =>
      $isActive
        ? "0 10px 30px rgba(240, 25, 25, 0.3)"
        : "0 10px 30px rgba(255, 255, 255, 0.1)"};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

export default ButtonEventsPage;
