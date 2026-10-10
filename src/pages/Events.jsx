import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage";
import SEO from "../components/common/SEO";
import { SkeletonEventGrid } from "../components/common/Skeleton";
import StatusBadge from "../components/common/StatusBadge";
import { useMapsCatalog } from "../context/MapsCatalogContext";
import useFetch from "../hooks/useFetch";
import {
  compareMapsByRecency,
  hasLiveEvents,
  normalizeMap,
  parseMapTimestamp,
} from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import {
  EVENTS_FALLBACK_LEAD,
  EVENTS_FALLBACK_NOTICE,
  EVENTS_LIVE_LEAD,
  PRODUCT_TIP,
} from "../lib/copy";
import { ButtonCard, CardMain, EmptyState } from "../styles/Card.styled";
import ButtonEventsPage, {
  CountdownBadge,
  EventFilters,
  EventNotice,
  EventRow,
  EventRowBody,
  EventRowMeta,
  EventTabs,
  ModeChip,
} from "../styles/Events.styled";
import { SearchInput, SelectList } from "../styles/Header.styled";
import { CatalogLead, HeaderText } from "../styles/Home.styled";

const ITEMS_PER_PAGE = 20;

const eventDateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const formatEventDate = (dateValue) => {
  if (!dateValue) return "Unknown";
  const rawDate = String(dateValue);
  const compactDateMatch = rawDate.match(/^(\d{4})(\d{2})(\d{2})/);
  const date = compactDateMatch
    ? new Date(
        `${compactDateMatch[1]}-${compactDateMatch[2]}-${compactDateMatch[3]}`
      )
    : new Date(rawDate);

  return Number.isNaN(date.getTime())
    ? "Unknown"
    : eventDateFormatter.format(date);
};

const parseEventDate = (dateValue) => {
  if (!dateValue) return null;
  const rawDate = String(dateValue);
  const compactDateMatch = rawDate.match(/^(\d{4})(\d{2})(\d{2})/);
  const date = compactDateMatch
    ? new Date(
        `${compactDateMatch[1]}-${compactDateMatch[2]}-${compactDateMatch[3]}T${
          rawDate.slice(9, 11) || "00"
        }:${rawDate.slice(11, 13) || "00"}:00Z`
      )
    : new Date(rawDate);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatCountdown = (targetDate, now, prefix) => {
  if (!targetDate) return "Schedule unknown";

  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return prefix === "Ends" ? "Ending soon" : "Started";

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${prefix} in ${days}d ${hours}h`;
  if (hours > 0) return `${prefix} in ${hours}h ${minutes}m`;
  return `${prefix} in ${minutes}m`;
};

const Events = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [now, setNow] = useState(() => new Date());
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [searchName, setSearchName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventsFetch = useFetch(ENDPOINTS.EVENTS, { swr: true });
  const {
    maps,
    loading: mapsLoading,
    error: mapsError,
    refetch: refetchMaps,
  } = useMapsCatalog();
  const usingLiveEvents = hasLiveEvents(eventsFetch.data);
  const gameModeFilter = searchParams.get("mode") || "all";

  useEffect(() => {
    if (!usingLiveEvents) return undefined;
    const intervalId = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(intervalId);
  }, [usingLiveEvents]);

  const loading =
    eventsFetch.loading || (!usingLiveEvents && mapsLoading);
  const error = usingLiveEvents
    ? eventsFetch.error
    : mapsError && !maps.length;

  const setGameModeFilter = (value) => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (!value || value === "all") next.delete("mode");
        else next.set("mode", value);
        return next;
      },
      { replace: true }
    );
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const gameModeOptions = useMemo(() => {
    const names = maps
      .map((map) => map?.gameMode?.name)
      .filter(Boolean);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  }, [maps]);

  const catalogMaps = useMemo(() => {
    if (usingLiveEvents) return [];
    const query = searchName.trim().toLowerCase();
    return maps
      .filter((map) =>
        activeTab === "active" ? !map.disabled : map.disabled
      )
      .filter((map) =>
        query ? map?.name?.toLowerCase().includes(query) : true
      )
      .filter((map) =>
        gameModeFilter === "all"
          ? true
          : map?.gameMode?.name === gameModeFilter
      )
      .sort(compareMapsByRecency);
  }, [activeTab, gameModeFilter, maps, searchName, usingLiveEvents]);

  const filteredLiveEvents = useMemo(() => {
    if (!usingLiveEvents) return [];
    const liveEvents =
      activeTab === "active"
        ? eventsFetch.data?.active || []
        : eventsFetch.data?.upcoming || [];
    const query = searchName.trim().toLowerCase();
    return liveEvents.filter((item) => {
      const map = normalizeMap(item?.map);
      if (query && !map?.name?.toLowerCase().includes(query)) return false;
      if (
        gameModeFilter !== "all" &&
        map?.gameMode?.name !== gameModeFilter
      ) {
        return false;
      }
      return true;
    });
  }, [
    activeTab,
    eventsFetch.data,
    gameModeFilter,
    searchName,
    usingLiveEvents,
  ]);

  const lastSeenLabel = (map) => {
    const timestamp = parseMapTimestamp(map?.lastActive);
    return timestamp ? formatEventDate(timestamp) : null;
  };

  const visibleMaps = catalogMaps.slice(0, visibleCount);

  if (error)
    return (
      <>
        <SEO title="Events" noIndex />
        <ErrorMessage
          message={error || "Failed to load events. Please try again."}
          onRetry={() => {
            eventsFetch.refetch();
            refetchMaps();
          }}
        />
      </>
    );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const openMap = (map) => {
    if (map?.id) {
      navigate(`/maps/${map.id}`, { state: map });
      return;
    }
    if (map?.link) window.open(map.link, "_blank", "noopener,noreferrer");
  };

  const renderLiveEvent = (item, index) => {
    const map = normalizeMap(item?.map);
    return (
      <EventRow
        key={map?.id || index}
        role="link"
        tabIndex={0}
        onClick={() => openMap(map)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openMap(map);
          }
        }}>
        <img src={map?.imageUrl} alt="" loading="lazy" />
        <EventRowBody>
          <h3>{map?.name || "Unknown map"}</h3>
          <ModeChip>
            {map?.gameMode?.imageUrl && (
              <img src={map.gameMode.imageUrl} alt="" />
            )}
            {map?.gameMode?.name || "Game mode"}
          </ModeChip>
          <p>
            {formatEventDate(item?.startTime)} → {formatEventDate(item?.endTime)}
          </p>
        </EventRowBody>
        <EventRowMeta>
          <CountdownBadge>
            {formatCountdown(
              parseEventDate(
                activeTab === "active" ? item?.endTime : item?.startTime
              ),
              now,
              activeTab === "active" ? "Ends" : "Starts"
            )}
          </CountdownBadge>
        </EventRowMeta>
      </EventRow>
    );
  };

  const renderCatalogMap = (map, index) => (
    <EventRow
      key={map?.id || index}
      role="link"
      tabIndex={0}
      onClick={() => openMap(map)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openMap(map);
        }
      }}>
      <img src={map?.imageUrl} alt="" loading="lazy" />
      <EventRowBody>
        <h3>{map?.name}</h3>
        <ModeChip>
          {map?.gameMode?.imageUrl && (
            <img src={map.gameMode.imageUrl} alt="" />
          )}
          {map?.gameMode?.name || "Game mode"}
        </ModeChip>
        <p>
          {map?.environment?.name
            ? `Theme: ${map.environment.name}`
            : map.description}
        </p>
        {lastSeenLabel(map) && <p>Last seen {lastSeenLabel(map)}</p>}
      </EventRowBody>
      <EventRowMeta>
        <StatusBadge kind={map.disabled ? "retired" : "available"}>
          {map.disabled ? "Retired" : "Available"}
        </StatusBadge>
      </EventRowMeta>
    </EventRow>
  );

  const currentItems = usingLiveEvents ? filteredLiveEvents : visibleMaps;
  const tabLabel = usingLiveEvents
    ? activeTab === "active"
      ? "active"
      : "upcoming"
    : activeTab === "active"
      ? "available"
      : "retired";

  return (
    <>
      <SEO
        title={
          usingLiveEvents
            ? `${activeTab === "active" ? "Active" : "Upcoming"} Events`
            : `${activeTab === "active" ? "Available" : "Retired"} Maps`
        }
        description={
          usingLiveEvents
            ? `View ${activeTab} Brawl Stars events. Check current and upcoming game modes, maps, and event schedules.`
            : "Browse currently available and retired Brawl Stars maps from BrawlAPI."
        }
        keywords="Brawl Stars, events, maps, game modes, BrawlAPI"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
        ]}
      />
      <HeaderText>
        {usingLiveEvents ? "Brawl Stars events" : "Brawl Stars maps"}
      </HeaderText>
      <CatalogLead>
        {usingLiveEvents ? EVENTS_LIVE_LEAD : EVENTS_FALLBACK_LEAD}{" "}
        {PRODUCT_TIP}
      </CatalogLead>
      <EventTabs>
        <ButtonEventsPage
          $isActive={activeTab === "active"}
          onClick={() => handleTabChange("active")}>
          {usingLiveEvents ? "Active" : "Available"}
        </ButtonEventsPage>
        <ButtonEventsPage
          $isActive={activeTab === "upcoming"}
          onClick={() => handleTabChange("upcoming")}>
          {usingLiveEvents ? "Upcoming" : "Retired"}
        </ButtonEventsPage>
      </EventTabs>

      <EventFilters>
        <SearchInput
          type="text"
          aria-label="Search maps by name"
          placeholder="Search maps"
          value={searchName}
          onChange={(event) => {
            setSearchName(event.target.value);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
        />
        <SelectList
          aria-label="Filter by game mode"
          value={gameModeFilter}
          onChange={(event) => setGameModeFilter(event.target.value)}>
          <option value="all">All modes</option>
          {gameModeOptions.map((modeName) => (
            <option key={modeName} value={modeName}>
              {modeName}
            </option>
          ))}
        </SelectList>
      </EventFilters>

      {!usingLiveEvents && !loading && (
        <EventNotice>{EVENTS_FALLBACK_NOTICE}</EventNotice>
      )}

      <CardMain
        wrap="wrap"
        style={{ flexDirection: "column", alignItems: "stretch" }}>
        {loading ? (
          <SkeletonEventGrid count={6} />
        ) : currentItems?.length === 0 ? (
          <EmptyState role="status">
            <h3>No {tabLabel} maps right now</h3>
            <p>Try another tab, clear search, or check again later.</p>
            {(searchName || gameModeFilter !== "all") && (
              <ButtonCard
                type="button"
                $static
                onClick={() => {
                  setSearchName("");
                  setGameModeFilter("all");
                  setVisibleCount(ITEMS_PER_PAGE);
                }}>
                Reset Filters
              </ButtonCard>
            )}
          </EmptyState>
        ) : usingLiveEvents ? (
          filteredLiveEvents.map(renderLiveEvent)
        ) : (
          <>
            {visibleMaps.map(renderCatalogMap)}
            {visibleCount < catalogMaps.length && (
              <ButtonCard
                $static
                type="button"
                onClick={() =>
                  setVisibleCount((count) => count + ITEMS_PER_PAGE)
                }>
                Load More Maps
              </ButtonCard>
            )}
          </>
        )}
      </CardMain>
    </>
  );
};

export default Events;
