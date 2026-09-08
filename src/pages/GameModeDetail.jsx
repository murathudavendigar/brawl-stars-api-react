import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../components/common/ErrorMessage";
import MissingState from "../components/common/MissingState";
import SEO from "../components/common/SEO";
import { SkeletonDetail } from "../components/common/Skeleton";
import useFetch from "../hooks/useFetch";
import {
  compareMapsByRecency,
  mapsForGameMode,
  normalizeCatalog,
  normalizeGameMode,
} from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import DetailMain, {
  BackButton,
  BadgeSeparator,
  DescriptionCard,
  DetailImage,
  HeroSection,
  MapDetailImage,
  RarityBadge,
  SectionTitle,
  StatCard,
  StatsContainer,
} from "../styles/Detail.styled";

const ITEMS_PER_PAGE = 12;

const ColorSwatch = styled.span`
  display: inline-block;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 999px;
  background: ${({ $color }) => $color || "#d852ff"};
  border: 3px solid var(--color-ink);
  box-shadow: var(--shadow-3d);
`;

const MapsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 900px;
  margin: 0.5rem 0 1.25rem;
`;

const MapChip = styled.button`
  display: grid;
  gap: 0.45rem;
  padding: 0.7rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
  color: var(--color-text-body);
  text-align: center;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 10px;
    border: 3px solid var(--color-ink);
    background: var(--color-ink);
  }

  strong {
    font-family: var(--font-primary);
    color: var(--color-gold);
    text-shadow: 2px 2px 0 var(--color-ink);
    font-size: 0.95rem;
    line-height: 1.2;
  }

  span {
    font-family: var(--font-secondary);
    font-weight: 800;
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-3d-hover);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: var(--shadow-3d-pressed);
  }
`;

const GameModeDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { modeId } = useParams();
  const [availableCount, setAvailableCount] = useState(ITEMS_PER_PAGE);
  const [retiredCount, setRetiredCount] = useState(8);
  const shouldFetchMode = Boolean(modeId) && !state;
  const {
    data: modeData,
    loading,
    error,
    refetch,
  } = useFetch(shouldFetchMode ? ENDPOINTS.GAME_MODE(modeId) : null);
  const mapsFetch = useFetch(ENDPOINTS.MAPS);

  const mode = useMemo(() => {
    if (state) return normalizeGameMode(state);
    return normalizeGameMode(modeData);
  }, [modeData, state]);

  const modeMaps = useMemo(() => {
    const maps = normalizeCatalog("maps", mapsFetch.data);
    return mapsForGameMode(maps, mode).sort(compareMapsByRecency);
  }, [mapsFetch.data, mode]);

  const availableMaps = modeMaps.filter((map) => !map.disabled);
  const retiredMaps = modeMaps.filter((map) => map.disabled);

  if (loading && shouldFetchMode) {
    return (
      <>
        <SEO title="Loading Game Mode" noIndex />
        <DetailMain>
          <SkeletonDetail />
        </DetailMain>
      </>
    );
  }

  if (error && shouldFetchMode) {
    return (
      <>
        <SEO title="Game Mode Error" noIndex />
        <DetailMain>
          <ErrorMessage
            message="Failed to load this game mode. Please try again."
            onRetry={refetch}
          />
        </DetailMain>
      </>
    );
  }

  if (!mode) {
    return (
      <MissingState
        seoTitle="Game Mode Not Found"
        stamp="NOT IN CATALOG"
        code="KO"
        title="Game mode not found"
        description="BrawlAPI has no game mode for this id. Choose one from the lobby."
        primaryLabel="GO HOME"
        onPrimary={() => navigate("/")}
        secondaryLabel="GO BACK"
        onSecondary={() => navigate(-1)}
      />
    );
  }

  const modeColor = mode.color || "#d852ff";
  const tutorial =
    mode.tutorial && mode.tutorial !== mode.description ? mode.tutorial : null;

  const renderMapChip = (map) => (
    <MapChip
      key={map.id}
      type="button"
      onClick={() => navigate(`/maps/${map.id}`, { state: map })}>
      <img
        src={map.imageUrl}
        alt=""
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <strong>{map.name}</strong>
      <span>{map.disabled ? "Retired" : "Available"}</span>
    </MapChip>
  );

  return (
    <>
      <SEO
        title={mode.name}
        description={mode.shortDescription || mode.description}
        image={mode.imageUrl}
        keywords={`Brawl Stars, ${mode.name}, game mode`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: mode.name, path: `/gamemodes/${mode.id}` },
        ]}
      />
      <DetailMain>
        <HeroSection>
          <h1>{mode.name}</h1>
          <RarityBadge $color={modeColor}>
            <span>{mode.title || "Game Mode"}</span>
            <BadgeSeparator>|</BadgeSeparator>
            <span>{mode.disabled ? "Disabled" : "Active"}</span>
          </RarityBadge>

          {mode.imageUrl && (
            <DetailImage
              src={mode.imageUrl}
              alt={`${mode.name} icon`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
          {mode.imageUrl2 && (
            <MapDetailImage
              src={mode.imageUrl2}
              alt={`${mode.name} header`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}

          <StatsContainer>
            <StatCard>
              <span className="stat-icon">🎮</span>
              <span className="stat-value">{mode.title || "-"}</span>
              <span className="stat-label">Format</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">
                <ColorSwatch $color={modeColor} />
              </span>
              <span className="stat-value">{modeColor}</span>
              <span className="stat-label">Color</span>
            </StatCard>
            {mode.bgColor && (
              <StatCard>
                <span className="stat-icon">
                  <ColorSwatch $color={mode.bgColor} />
                </span>
                <span className="stat-value">{mode.bgColor}</span>
                <span className="stat-label">Background</span>
              </StatCard>
            )}
            <StatCard>
              <span className="stat-icon">{mode.disabled ? "⏸" : "✅"}</span>
              <span className="stat-value">
                {mode.disabled ? "Disabled" : "Active"}
              </span>
              <span className="stat-label">Status</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">🗺️</span>
              <span className="stat-value">{availableMaps.length}</span>
              <span className="stat-label">Maps</span>
            </StatCard>
          </StatsContainer>
        </HeroSection>

        {mode.shortDescription && (
          <DescriptionCard>
            <p>{mode.shortDescription}</p>
          </DescriptionCard>
        )}

        {mode.description && (
          <DescriptionCard>
            <p>{mode.description}</p>
          </DescriptionCard>
        )}

        {tutorial && (
          <DescriptionCard>
            <p>{tutorial}</p>
          </DescriptionCard>
        )}

        {availableMaps.length > 0 && (
          <>
            <SectionTitle>🗺️ Available maps</SectionTitle>
            <MapsGrid>{availableMaps.slice(0, availableCount).map(renderMapChip)}</MapsGrid>
            {availableCount < availableMaps.length && (
              <BackButton
                type="button"
                onClick={() =>
                  setAvailableCount((count) => count + ITEMS_PER_PAGE)
                }>
                Load more maps
              </BackButton>
            )}
          </>
        )}

        {retiredMaps.length > 0 && (
          <>
            <SectionTitle>⏸ Retired maps</SectionTitle>
            <MapsGrid>{retiredMaps.slice(0, retiredCount).map(renderMapChip)}</MapsGrid>
            {retiredCount < retiredMaps.length && (
              <BackButton
                type="button"
                onClick={() => setRetiredCount((count) => count + ITEMS_PER_PAGE)}>
                Load more retired
              </BackButton>
            )}
          </>
        )}

        <BackButton onClick={() => navigate("/")}>← GO HOME</BackButton>
      </DetailMain>
    </>
  );
};

export default GameModeDetail;
