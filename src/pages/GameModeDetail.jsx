import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CatalogBreadcrumb from "../components/common/CatalogBreadcrumb";
import ErrorMessage from "../components/common/ErrorMessage";
import MissingState from "../components/common/MissingState";
import SEO from "../components/common/SEO";
import { SkeletonDetail } from "../components/common/Skeleton";
import { useMapsCatalog } from "../context/MapsCatalogContext";
import useFetch from "../hooks/useFetch";
import useRecentlyViewed from "../hooks/useRecentlyViewed";
import {
  compareMapsByRecency,
  mapsForGameMode,
  normalizeGameMode,
} from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import DetailMain, {
  BackButton,
  BadgeSeparator,
  DescriptionCard,
  DetailImage,
  HeroSection,
  LoadMoreButton,
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
  background: ${({ $color }) => $color || "var(--color-primary)"};
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

const EventsLink = styled(Link)`
  display: inline-flex;
  padding: 0.55rem 1rem;
  margin: 0.75rem 0 0.25rem;
  border-radius: 12px;
  border: 3px solid var(--color-ink);
  background: var(--color-gold);
  color: var(--color-ink);
  font-family: var(--font-primary);
  box-shadow: var(--shadow-3d);
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
  const { maps } = useMapsCatalog();
  const { pushRecent } = useRecentlyViewed();

  const mode = useMemo(() => {
    if (state) return normalizeGameMode(state);
    return normalizeGameMode(modeData);
  }, [modeData, state]);

  useEffect(() => {
    if (!mode?.id) return;
    pushRecent({
      id: mode.id,
      type: "gamemodes",
      name: mode.name,
      imageUrl: mode.imageUrl,
      path: `/gamemodes/${mode.id}`,
    });
  }, [mode, pushRecent]);

  const modeMaps = useMemo(
    () => mapsForGameMode(maps, mode).sort(compareMapsByRecency),
    [maps, mode]
  );

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
        primaryLabel="Back to Lobby"
        onPrimary={() => navigate("/")}
        secondaryLabel="Go Back"
        onSecondary={() => navigate(-1)}
      />
    );
  }

  const modeColor = mode.color || "var(--color-primary)";
  const tutorial =
    mode.tutorial && mode.tutorial !== mode.description ? mode.tutorial : null;
  const primaryCopy = mode.shortDescription || mode.description;
  const secondaryCopy =
    mode.shortDescription &&
    mode.description &&
    mode.description !== mode.shortDescription
      ? mode.description
      : null;
  const eventsHref = mode.name
    ? `/events?mode=${encodeURIComponent(mode.name)}`
    : "/events";

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
        <CatalogBreadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Game Modes", path: "/?type=gamemodes" },
            { label: mode.name },
          ]}
        />
        <HeroSection>
          <h1>{mode.name}</h1>
          <RarityBadge $color={mode.color || "#d852ff"}>
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

          <EventsLink to={eventsHref}>Open Events · {mode.name}</EventsLink>

          <StatsContainer>
            <StatCard>
              <span className="stat-icon">FMT</span>
              <span className="stat-value">{mode.title || "-"}</span>
              <span className="stat-label">Format</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">
                <ColorSwatch $color={modeColor} />
              </span>
              <span className="stat-value">Mode color</span>
              <span className="stat-label">Accent</span>
            </StatCard>
            {mode.bgColor && (
              <StatCard>
                <span className="stat-icon">
                  <ColorSwatch $color={mode.bgColor} />
                </span>
                <span className="stat-value">Backdrop</span>
                <span className="stat-label">Panel</span>
              </StatCard>
            )}
            <StatCard>
              <span className="stat-icon">{mode.disabled ? "OFF" : "ON"}</span>
              <span className="stat-value">
                {mode.disabled ? "Disabled" : "Active"}
              </span>
              <span className="stat-label">Status</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">MAPS</span>
              <span className="stat-value">{availableMaps.length}</span>
              <span className="stat-label">Available</span>
            </StatCard>
          </StatsContainer>
        </HeroSection>

        {primaryCopy && (
          <DescriptionCard>
            <p>{primaryCopy}</p>
          </DescriptionCard>
        )}

        {secondaryCopy && (
          <DescriptionCard>
            <p>{secondaryCopy}</p>
          </DescriptionCard>
        )}

        {tutorial && (
          <DescriptionCard>
            <p>
              <strong>How to play: </strong>
              {tutorial}
            </p>
          </DescriptionCard>
        )}

        {availableMaps.length > 0 && (
          <>
            <SectionTitle>Available maps</SectionTitle>
            <MapsGrid>
              {availableMaps.slice(0, availableCount).map(renderMapChip)}
            </MapsGrid>
            {availableCount < availableMaps.length && (
              <LoadMoreButton
                type="button"
                onClick={() =>
                  setAvailableCount((count) => count + ITEMS_PER_PAGE)
                }>
                Load more maps
              </LoadMoreButton>
            )}
          </>
        )}

        {retiredMaps.length > 0 && (
          <>
            <SectionTitle>Retired maps</SectionTitle>
            <MapsGrid>
              {retiredMaps.slice(0, retiredCount).map(renderMapChip)}
            </MapsGrid>
            {retiredCount < retiredMaps.length && (
              <LoadMoreButton
                type="button"
                onClick={() =>
                  setRetiredCount((count) => count + ITEMS_PER_PAGE)
                }>
                Load more retired
              </LoadMoreButton>
            )}
          </>
        )}

        <BackButton
          type="button"
          onClick={() => navigate("/?type=gamemodes")}>
          Back to Game Modes
        </BackButton>
      </DetailMain>
    </>
  );
};

export default GameModeDetail;
