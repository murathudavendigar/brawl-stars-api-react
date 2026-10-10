import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CatalogBreadcrumb from "../components/common/CatalogBreadcrumb";
import ErrorMessage from "../components/common/ErrorMessage";
import MissingState from "../components/common/MissingState";
import SEO from "../components/common/SEO";
import { SkeletonDetail } from "../components/common/Skeleton";
import StatusBadge from "../components/common/StatusBadge";
import { useMapsCatalog } from "../context/MapsCatalogContext";
import useFetch from "../hooks/useFetch";
import useRecentlyViewed from "../hooks/useRecentlyViewed";
import {
  compareMapsByRecency,
  mapsForGameMode,
  normalizeMap,
  parseMapTimestamp,
} from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import DetailMain, {
  BackButton,
  BadgeSeparator,
  DescriptionCard,
  HeroSection,
  LoadMoreButton,
  MapDetailImage,
  RarityBadge,
  SectionTitle,
  StatCard,
  StatsContainer,
} from "../styles/Detail.styled";
import styled from "styled-components";

const RELATED_PAGE = 8;

const ModeJump = styled.button`
  background: none;
  border: 0;
  padding: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const MapsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.85rem;
  width: 100%;
  max-width: 900px;
  margin: 0.5rem 0 1rem;
`;

const MapChip = styled.button`
  display: grid;
  gap: 0.4rem;
  padding: 0.65rem;
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
    font-size: 0.9rem;
    line-height: 1.2;
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

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.75rem 0 0.25rem;
`;

const EventsLink = styled(Link)`
  display: inline-flex;
  padding: 0.55rem 1rem;
  margin: 0.5rem 0 1rem;
  border-radius: 12px;
  border: 3px solid var(--color-ink);
  background: var(--color-gold);
  color: var(--color-ink);
  font-family: var(--font-primary);
  box-shadow: var(--shadow-3d);
`;

const formatLastSeen = (map) => {
  const timestamp = parseMapTimestamp(map?.lastActive);
  if (!timestamp) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(timestamp);
};

const MapDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { mapId } = useParams();
  const [relatedCount, setRelatedCount] = useState(RELATED_PAGE);
  const shouldFetchMap = Boolean(mapId) && !state;
  const {
    data: mapData,
    loading,
    error,
    refetch,
  } = useFetch(shouldFetchMap ? ENDPOINTS.MAP(mapId) : null);
  const { maps } = useMapsCatalog();
  const { pushRecent } = useRecentlyViewed();

  const map = useMemo(() => {
    if (state) return normalizeMap(state);
    return normalizeMap(mapData);
  }, [mapData, state]);

  useEffect(() => {
    if (!map?.id) return;
    pushRecent({
      id: map.id,
      type: "maps",
      name: map.name,
      imageUrl: map.imageUrl,
      path: `/maps/${map.id}`,
    });
  }, [map, pushRecent]);

  const relatedMaps = useMemo(() => {
    if (!map?.gameMode) return [];
    return mapsForGameMode(maps, map.gameMode)
      .filter((entry) => entry.id !== map.id)
      .sort(compareMapsByRecency);
  }, [map, maps]);

  if (loading && shouldFetchMap) {
    return (
      <>
        <SEO title="Loading Map" noIndex />
        <DetailMain>
          <SkeletonDetail />
        </DetailMain>
      </>
    );
  }

  if (error && shouldFetchMap) {
    return (
      <>
        <SEO title="Map Error" noIndex />
        <DetailMain>
          <ErrorMessage
            message="Failed to load this map. Please try again."
            onRetry={refetch}
          />
        </DetailMain>
      </>
    );
  }

  if (!map) {
    return (
      <MissingState
        seoTitle="Map Not Found"
        stamp="NOT IN CATALOG"
        code="KO"
        title="Map not found"
        description="BrawlAPI has no map for this id. Open Events or the maps catalog and pick one."
        primaryLabel="Back to Lobby"
        onPrimary={() => navigate("/")}
        secondaryLabel="Go Back"
        onSecondary={() => navigate(-1)}
      />
    );
  }

  const modeColor = map?.gameMode?.color || "#2186ff";
  const lastSeen = formatLastSeen(map);
  const eventsHref = map?.gameMode?.name
    ? `/events?mode=${encodeURIComponent(map.gameMode.name)}`
    : "/events";

  return (
    <>
      <SEO
        title={map.name}
        description={map.description}
        image={map.imageUrl}
        keywords={`Brawl Stars, ${map.name}, ${
          map?.gameMode?.name || "map"
        }, map`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: map.name, path: `/maps/${map.id}` },
        ]}
      />
      <DetailMain>
        <CatalogBreadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Maps", path: "/?type=maps" },
            { label: map.name },
          ]}
        />
        <HeroSection>
          <h1>{map.name}</h1>
          <RarityBadge $color={modeColor}>
            <span>
              {map?.gameMode?.id ? (
                <ModeJump
                  type="button"
                  onClick={() =>
                    navigate(`/gamemodes/${map.gameMode.id}`, {
                      state: map.gameMode,
                    })
                  }>
                  {map.gameMode.name}
                </ModeJump>
              ) : (
                map?.gameMode?.name || "Game Mode"
              )}
            </span>
            <BadgeSeparator>|</BadgeSeparator>
            <span>{map.disabled ? "Retired" : "Available"}</span>
          </RarityBadge>

          <MetaRow>
            <StatusBadge kind={map.disabled ? "retired" : "available"}>
              {map.disabled ? "Retired" : "Available"}
            </StatusBadge>
            {map?.environment?.name && (
              <StatusBadge kind="favorite">{map.environment.name}</StatusBadge>
            )}
          </MetaRow>

          <MapDetailImage src={map.imageUrl} alt={`${map.name} map`} />

          <StatsContainer>
            <StatCard>
              <span className="stat-icon">MODE</span>
              <span className="stat-value">
                {map?.gameMode?.id ? (
                  <ModeJump
                    type="button"
                    onClick={() =>
                      navigate(`/gamemodes/${map.gameMode.id}`, {
                        state: map.gameMode,
                      })
                    }>
                    {map.gameMode.name}
                  </ModeJump>
                ) : (
                  map?.gameMode?.name || "-"
                )}
              </span>
              <span className="stat-label">Mode</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">THEME</span>
              <span className="stat-value">
                {map?.environment?.name || "-"}
              </span>
              <span className="stat-label">Environment</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">BY</span>
              <span className="stat-value">{map?.credit || "—"}</span>
              <span className="stat-label">Creator</span>
            </StatCard>
            <StatCard>
              <span className="stat-icon">SEEN</span>
              <span className="stat-value">{lastSeen || "—"}</span>
              <span className="stat-label">Last active</span>
            </StatCard>
          </StatsContainer>

          <EventsLink to={eventsHref}>
            View in Events
            {map?.gameMode?.name ? ` · ${map.gameMode.name}` : ""}
          </EventsLink>
        </HeroSection>

        <DescriptionCard>
          <p>{map.description}</p>
        </DescriptionCard>

        {relatedMaps.length > 0 && (
          <>
            <SectionTitle>
              More maps in {map?.gameMode?.name || "this mode"}
            </SectionTitle>
            <MapsGrid>
              {relatedMaps.slice(0, relatedCount).map((entry) => (
                <MapChip
                  key={entry.id}
                  type="button"
                  onClick={() =>
                    navigate(`/maps/${entry.id}`, { state: entry })
                  }>
                  <img
                    src={entry.imageUrl}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <strong>{entry.name}</strong>
                </MapChip>
              ))}
            </MapsGrid>
            {relatedCount < relatedMaps.length && (
              <LoadMoreButton
                type="button"
                onClick={() =>
                  setRelatedCount((count) => count + RELATED_PAGE)
                }>
                Load more maps
              </LoadMoreButton>
            )}
          </>
        )}

        <BackButton type="button" onClick={() => navigate("/?type=maps")}>
          Back to Maps
        </BackButton>
      </DetailMain>
    </>
  );
};

export default MapDetail;
