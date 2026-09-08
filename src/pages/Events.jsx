import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/common/ErrorMessage";
import SEO from "../components/common/SEO";
import { SkeletonEventGrid } from "../components/common/Skeleton";
import useFetch from "../hooks/useFetch";
import {
  compareMapsByRecency,
  hasLiveEvents,
  normalizeCatalog,
  normalizeMap,
  parseMapTimestamp,
} from "../lib/api";
import { ENDPOINTS } from "../lib/config";
import CardsInfo, {
  ButtonCard,
  CardImage,
  CardMain,
  CardText,
  CardTitle,
  EmptyState,
  EventTimeLabel,
} from "../styles/Card.styled";
import ButtonEventsPage, {
  CountdownBadge,
  EventNotice,
  EventTabs,
} from "../styles/Events.styled";
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
  const navigate = useNavigate();
  const eventsFetch = useFetch(ENDPOINTS.EVENTS);
  const mapsFetch = useFetch(ENDPOINTS.MAPS);
  const usingLiveEvents = hasLiveEvents(eventsFetch.data);
  const maps = useMemo(
    () => normalizeCatalog("maps", mapsFetch.data),
    [mapsFetch.data]
  );

  useEffect(() => {
    if (!usingLiveEvents) return undefined;
    const intervalId = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(intervalId);
  }, [usingLiveEvents]);

  const loading =
    eventsFetch.loading || (!usingLiveEvents && mapsFetch.loading);
  const error = usingLiveEvents
    ? eventsFetch.error
    : mapsFetch.error && !maps.length;

  const liveEvents =
    activeTab === "active"
      ? eventsFetch.data?.active || []
      : eventsFetch.data?.upcoming || [];

  const catalogMaps = useMemo(() => {
    if (usingLiveEvents) return [];
    return maps
      .filter((map) =>
        activeTab === "active" ? !map.disabled : map.disabled
      )
      .sort(compareMapsByRecency);
  }, [activeTab, maps, usingLiveEvents]);

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
            mapsFetch.refetch();
          }}
        />
      </>
    );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const renderLiveEvent = (item, index) => {
    const map = normalizeMap(item?.map);
    return (
      <CardsInfo
        justify="baseline"
        key={map?.id || index}
        $background={map?.gameMode?.bgColor}>
        <CardTitle as="h3">{map?.name}</CardTitle>
        <CardText $spaced>{map?.gameMode?.name}</CardText>
        <CardImage
          src={map?.gameMode?.imageUrl}
          alt={`${map?.gameMode?.name || "Game mode"} icon`}
          width="130px"
          height="130px"
          loading="lazy"
          $eventIcon
        />
        <EventTimeLabel>Start Time</EventTimeLabel>
        <h5>{formatEventDate(item?.startTime)}</h5>
        <CountdownBadge>
          {formatCountdown(
            parseEventDate(
              activeTab === "active" ? item?.endTime : item?.startTime
            ),
            now,
            activeTab === "active" ? "Ends" : "Starts"
          )}
        </CountdownBadge>
        <EventTimeLabel $spaced>End Time</EventTimeLabel>
        <h5>{formatEventDate(item?.endTime)}</h5>
        <CardImage
          src={map?.imageUrl}
          alt={`${map?.name || "Map"} map`}
          width="150px"
          height="150px"
          loading="lazy"
        />
        <ButtonCard
          onClick={() =>
            map?.id
              ? navigate(`/maps/${map.id}`, { state: map })
              : window.open(map?.link, "_blank", "noopener,noreferrer")
          }>
          View Details
        </ButtonCard>
      </CardsInfo>
    );
  };

  const renderCatalogMap = (map, index) => (
    <CardsInfo
      justify="baseline"
      key={map?.id || index}
      $background={map?.gameMode?.bgColor || map?.gameMode?.color}>
      <CardTitle as="h3">{map?.name}</CardTitle>
      <CardText $spaced>{map?.gameMode?.name}</CardText>
      <CardImage
        src={map?.gameMode?.imageUrl}
        alt={`${map?.gameMode?.name || "Game mode"} icon`}
        width="130px"
        height="130px"
        loading="lazy"
        $eventIcon
      />
      <CardText $spaced>
        {map?.environment?.name ? `Theme: ${map.environment.name}` : map.description}
      </CardText>
      {map?.credit && <CardText>Created by {map.credit}</CardText>}
      {lastSeenLabel(map) && (
        <CardText $spaced>Last seen {lastSeenLabel(map)}</CardText>
      )}
      <CardImage
        src={map?.imageUrl}
        alt={`${map?.name || "Map"} map`}
        width="150px"
        height="150px"
        loading="lazy"
      />
      <ButtonCard
        onClick={() => navigate(`/maps/${map.id}`, { state: map })}>
        View Details
      </ButtonCard>
    </CardsInfo>
  );

  const currentItems = usingLiveEvents ? liveEvents : visibleMaps;
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
        {usingLiveEvents
          ? "Current and upcoming Brawl Stars event slots from BrawlAPI."
          : "Available and retired Brawl Stars maps from the BrawlAPI catalog."}
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

      {!usingLiveEvents && !loading && (
        <EventNotice>
          BrawlAPI has no live event clock. Maps are listed newest first, and
          by last seen date when the API provides it.
        </EventNotice>
      )}

      <CardMain wrap="wrap">
        {loading ? (
          <SkeletonEventGrid count={6} />
        ) : currentItems?.length === 0 ? (
          <EmptyState role="status">
            <h3>No {tabLabel} maps right now</h3>
            <p>Try the other tab or check again later.</p>
          </EmptyState>
        ) : usingLiveEvents ? (
          liveEvents.map(renderLiveEvent)
        ) : (
          <>
            {visibleMaps.map(renderCatalogMap)}
            {visibleCount < catalogMaps.length && (
              <ButtonCard
                $static
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
