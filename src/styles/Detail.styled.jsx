import styled, { keyframes } from "styled-components";

const inkOnColor = (hex) => {
  if (typeof hex !== "string" || !hex.startsWith("#")) return "#FFFFFF";
  let value = hex.slice(1);
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (value.length !== 6) return "#FFFFFF";
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  const luma = (red * 299 + green * 587 + blue * 114) / 1000;
  return luma >= 165 ? "#0B0A12" : "#FFFFFF";
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
`;

const DetailMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh - 100px);
  animation: ${fadeIn} 0.4s ease-out;
  position: relative;
`;

export default DetailMain;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

export const BrawlerName = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  color: var(--color-gold);
  margin: 0 0 0.5rem 0;
  animation: ${fadeInUp} 0.45s ease-out;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink),
    1px -1px 0 var(--color-ink),
    -1px 1px 0 var(--color-ink);

  img {
    filter: drop-shadow(2px 3px 0 var(--color-ink));
  }
`;

export const RarityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  margin: 0.5rem 0 1.5rem 0;
  background: ${(props) => props.$color || "var(--color-primary)"};
  border: 3px solid var(--color-ink);
  border-radius: 12px;
  font-family: var(--font-primary);
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  animation: ${fadeInUp} 0.5s ease-out;
  box-shadow: var(--shadow-3d);
  text-shadow:
    2px 2px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink);
`;

export const BadgeSeparator = styled.span`
  opacity: 0.85;
`;

export const BrawlerImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 0.5rem 0 1.5rem 0;

  /* Comic burst rays — sits outside the portrait */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-conic-gradient(
      from 12deg,
      var(--color-gold) 0deg 10deg,
      transparent 10deg 22.5deg
    );
    mask: radial-gradient(
      circle at center,
      transparent 108px,
      #000 112px,
      #000 148px,
      transparent 152px
    );
    -webkit-mask: radial-gradient(
      circle at center,
      transparent 108px,
      #000 112px,
      #000 148px,
      transparent 152px
    );
    z-index: 0;
    pointer-events: none;
  }

  /* Thick gold ring */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 214px;
    height: 214px;
    border-radius: 50%;
    border: 7px solid var(--color-gold);
    box-shadow:
      0 0 0 3px var(--color-ink),
      inset 0 0 0 3px var(--color-ink),
      0 5px 0 #1a1020;
    background: radial-gradient(
      circle,
      ${(props) => props.$color || "var(--color-primary)"}55 0%,
      var(--panel-bg) 70%
    );
    z-index: 1;
    pointer-events: none;
  }
`;

export const DetailImage = styled.img`
  position: relative;
  z-index: 2;
  width: 180px;
  height: 180px;
  object-fit: contain;
  animation: ${scaleIn} 0.5s ease-out;
  filter: drop-shadow(0 10px 0 rgba(11, 10, 18, 0.55));
  transition: transform 0.16s ease;

  &:hover {
    transform: scale(1.06);
  }
`;

export const MapDetailImage = styled.img`
  width: min(100%, 520px);
  max-height: 520px;
  object-fit: contain;
  margin: 1rem auto 2rem;
  border-radius: 16px;
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d), 0 0 0 5px var(--color-gold);
  background: var(--color-ink);
  animation: ${scaleIn} 0.5s ease-out;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0;
  animation: ${fadeInUp} 0.55s ease-out;
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.9rem 1.25rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
  min-width: 100px;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-3d-hover);
  }

  .stat-icon {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
  .stat-value {
    font-size: 1.2rem;
    font-weight: 400;
    font-family: var(--font-primary);
    color: var(--color-white);
    text-shadow: 2px 2px 0 var(--color-ink);
  }
  .stat-label {
    font-size: 0.75rem;
    color: var(--color-text-body);
    font-family: var(--font-secondary);
    font-weight: 800;
    margin-top: 0.2rem;
  }
`;

export const StatValue = styled.span`
  color: ${({ $color }) => $color || "var(--color-white)"};
`;

export const DescriptionCard = styled.div`
  max-width: 600px;
  padding: 1.4rem 1.6rem;
  margin: 1rem 0;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 16px;
  box-shadow: var(--shadow-3d);
  animation: ${fadeInUp} 0.5s ease-out;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 7px;
    border: 2px solid var(--color-gold);
    border-radius: 10px;
    pointer-events: none;
    opacity: 0.45;
  }

  p {
    position: relative;
    z-index: 1;
    font-size: 1rem;
    font-family: var(--font-secondary);
    font-weight: 700;
    line-height: 1.65;
    color: var(--color-text-body);
    text-align: center;
    margin: 0;
  }
`;

export const SectionTitle = styled.h2`
  position: relative;
  padding-bottom: 0.75rem;
  margin: 2rem 0 1rem 0;
  color: var(--color-gold);
  font-size: 1.5rem;
  text-align: center;
  text-shadow:
    3px 3px 0 var(--color-ink),
    -1px -1px 0 var(--color-ink);

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 72px;
    height: 6px;
    background: var(--color-primary);
    border: 2px solid var(--color-ink);
    border-radius: 6px;
  }
`;

export const AbilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 700px;
  margin: 0.5rem 0;
`;

export const AbilityCard = styled.div`
  padding: 1.15rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 16px;
  box-shadow: var(--shadow-3d);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  animation: ${fadeInUp} 0.4s ease-out backwards;

  &:nth-child(1) {
    animation-delay: 0.08s;
  }
  &:nth-child(2) {
    animation-delay: 0.12s;
  }
  &:nth-child(3) {
    animation-delay: 0.16s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-3d-hover);
    border-color: var(--color-ink);
  }
`;

export const AbilityType = styled.span`
  display: inline-block;
  padding: 0.2rem 0.65rem;
  font-size: 0.7rem;
  font-family: var(--font-primary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-radius: 10px;
  margin-bottom: 0.6rem;
  background: ${(props) =>
    props.$type === "gadget" ? "var(--color-gold)" : "var(--color-primary)"};
  color: ${(props) =>
    props.$type === "gadget" ? "var(--color-ink)" : "var(--color-white)"};
  border: 3px solid var(--color-ink);
  box-shadow: 0 3px 0 #1a1020;
`;

export const AbilityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  img {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    border: 3px solid var(--color-ink);
    box-shadow: 0 3px 0 #1a1020;
    background: var(--color-ink);
  }

  h4 {
    color: var(--color-white);
    font-size: 1.05rem;
    font-family: var(--font-primary);
    font-weight: 400;
    margin: 0;
    text-shadow: 2px 2px 0 var(--color-ink);
  }
`;

export const AbilityDescription = styled.p`
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
`;

export const BackButton = styled.button`
  margin: 2rem 0;
  padding: 0.8rem 1.8rem;
  background: var(--color-gold);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  color: var(--color-ink);
  font-family: var(--font-primary);
  font-size: 1rem;
  cursor: pointer;
  box-shadow: var(--shadow-3d);
  position: relative;
  overflow: hidden;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease;

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 12px;
    right: 12px;
    height: 38%;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 10px 10px 40% 40%;
    pointer-events: none;
  }

  &:hover {
    background: var(--color-primary);
    color: var(--color-white);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;

export const StatBar = styled.div`
  --fill: ${({ $value }) =>
    typeof $value === "number" ? `${Math.max(0, Math.min(100, $value))}%` : $value || "70%"};
  width: 100%;
  height: 16px;
  background: var(--color-ink);
  border: 3px solid var(--color-ink);
  border-radius: 10px;
  box-shadow: var(--shadow-3d);
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: var(--fill);
    height: 100%;
    background: ${({ $color }) =>
      $color ||
      "linear-gradient(180deg, var(--color-gold-light) 0%, var(--color-gold) 55%, var(--color-brown) 100%)"};
    border-right: 2px solid var(--color-ink);
  }
`;

export const StatMeterList = styled.div`
  display: grid;
  gap: 0.7rem;
  width: 100%;
  max-width: 520px;
  margin: 1rem 0 0.5rem;
`;

export const StatMeterRow = styled.div`
  display: grid;
  gap: 0.3rem;

  span {
    font-family: var(--font-primary);
    font-size: 0.85rem;
    color: var(--color-gold-light);
    text-shadow: 2px 2px 0 var(--color-ink);
  }
`;

export const SkinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 0.85rem;
  width: 100%;
  max-width: 700px;
  margin: 0.5rem 0 1rem;
`;

export const SkinTile = styled.article`
  aspect-ratio: ${({ $hasImage }) => ($hasImage ? "auto" : "1")};
  min-height: 96px;
  display: grid;
  place-items: center;
  padding: ${({ $hasImage }) => ($hasImage ? "1rem 0.35rem 0.45rem" : "0.35rem")};
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 12px;
  box-shadow: var(--shadow-3d);
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    background: ${({ $color }) => $color || "var(--color-gold)"};
    border-bottom: 3px solid var(--color-ink);
  }

  img {
    width: 72px;
    height: 72px;
    object-fit: contain;
    filter: drop-shadow(0 4px 0 rgba(11, 10, 18, 0.45));
  }

  span {
    position: relative;
    z-index: 1;
    padding: 0.6rem 0.2rem 0;
    color: var(--color-white);
    font-family: var(--font-primary);
    font-size: 0.72rem;
    line-height: 1.15;
    text-align: center;
    text-shadow: 2px 2px 0 var(--color-ink);
  }
`;

export const ClassBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.75rem;
  background: ${({ $color }) => $color || "var(--color-primary)"};
  color: ${({ $color }) => inkOnColor($color)};
  font-family: var(--font-primary);
  font-size: 0.85rem;
  border: 3px solid var(--color-ink);
  border-radius: 12px;
  box-shadow: var(--shadow-3d);
  text-shadow: ${({ $color }) =>
    inkOnColor($color) === "#0B0A12"
      ? "none"
      : "2px 2px 0 var(--color-ink)"};
`;
