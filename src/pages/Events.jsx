import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import ErrorMessage from "../components/common/ErrorMessage";
import SEO from "../components/common/SEO";
import { SkeletonEventGrid } from "../components/common/Skeleton";
import { ENDPOINTS } from "../lib/config";
import CardsInfo, { ButtonCard, CardMain } from "../styles/Card.styled";
import ButtonEventsPage from "../styles/Events.styled";
import Flex from "../styles/Flex.styled";

const Events = () => {
  const [eventsActiveData, setEventsActiveData] = useState();
  const [eventsUpcomingData, setEventsUpcomingData] = useState();
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEventsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios(ENDPOINTS.EVENTS);
      setEventsActiveData(data?.active);
      setEventsUpcomingData(data?.upcoming);
    } catch (err) {
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getEventsData();
  }, [getEventsData]);

  if (error)
    return (
      <>
        <SEO title="Events" />
        <ErrorMessage message={error} onRetry={getEventsData} />
      </>
    );

  const currentEvents =
    activeTab === "active" ? eventsActiveData : eventsUpcomingData;

  return (
    <>
      <SEO
        title={`${activeTab === "active" ? "Active" : "Upcoming"} Events`}
        description={`View ${activeTab} Brawl Stars events. Check current and upcoming game modes, maps, and event schedules.`}
        keywords="Brawl Stars, events, active events, upcoming events, game modes, maps"
      />
      <Flex style={{ gap: "2rem", marginBottom: "1rem" }}>
        <ButtonEventsPage
          $isActive={activeTab === "active"}
          onClick={() => setActiveTab("active")}>
          Active
        </ButtonEventsPage>
        <ButtonEventsPage
          $isActive={activeTab === "upcoming"}
          onClick={() => setActiveTab("upcoming")}>
          Upcoming
        </ButtonEventsPage>
      </Flex>

      <CardMain wrap="wrap">
        {loading ? (
          <SkeletonEventGrid count={6} />
        ) : (
          currentEvents?.map((item, index) => (
            <CardsInfo
              justify="baseline"
              key={item?.map?.id || index}
              style={{ backgroundColor: `${item?.map?.gameMode?.bgColor}` }}>
              <h3 style={{ textAlign: "center" }}>{item?.map?.name}</h3>
              <p style={{ textAlign: "center", margin: "0.5rem 0" }}>
                {item?.map?.gameMode?.name}
              </p>
              <img
                src={item?.map?.gameMode?.imageUrl}
                alt={`${item?.map?.gameMode?.name} icon`}
                width="130px"
                height="130px"
                loading="lazy"
                style={{ margin: "1rem 0", padding: "1rem 0" }}
              />
              <h4 style={{ textAlign: "center" }}>Start Time</h4>
              <h5>{moment(item?.startTime?.slice(0, 10)).format("LL")}</h5>
              <h4 style={{ textAlign: "center", marginTop: "0.6rem" }}>
                End Time
              </h4>
              <h5>{moment(item?.endTime?.slice(0, 10)).format("LL")}</h5>

              <img
                src={item?.map?.imageUrl}
                alt={`${item?.map?.name} map`}
                width="150px"
                height="150px"
                loading="lazy"
                style={{ padding: "0.2rem 0", margin: "0.3rem 0" }}
              />

              <ButtonCard
                onClick={() =>
                  window.open(item?.map?.link, "_blank", "noopener,noreferrer")
                }>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))
        )}
      </CardMain>
    </>
  );
};

export default Events;
