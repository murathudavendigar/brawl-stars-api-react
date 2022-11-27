import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import CardsInfo, { ButtonCard, CardMain } from "../styles/Card.styled";
import ButtonEventsPage from "../styles/Events.styled";
import Flex from "../styles/Flex.styled";

const Events = () => {
  const [eventsActiveData, setEventsActiveData] = useState();
  const [eventsUpcomingData, setEventsUpcomingData] = useState();
  const [active, setActive] = useState(true);

  const url = `https://api.brawlapi.com/v1/events`;

  const getEventsData = async () => {
    const { data } = await axios(url);
    setEventsActiveData(data?.active);
    setEventsUpcomingData(data?.upcoming);
  };

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <>
      <Flex style={{ gap: "2rem" }}>
        <ButtonEventsPage color={active} onClick={() => setActive(false)}>
          Active
        </ButtonEventsPage>
        <ButtonEventsPage color={!active} onClick={() => setActive(true)}>
          Upcoming
        </ButtonEventsPage>
      </Flex>
      {active && (
        <CardMain wrap="wrap">
          {eventsUpcomingData?.map((item, index) => (
            <CardsInfo
              justify="baseline"
              key={index}
              style={{ backgroundColor: `${item?.map?.gameMode?.color}` }}>
              <h2 style={{ textAlign: "center" }}>{item?.map?.name}</h2>
              <p style={{ textAlign: "center", margin: "0.5rem 0" }}>
                {item?.slot?.name}
              </p>
              <img
                src={item?.map?.gameMode?.imageUrl}
                alt=""
                width="120px"
                style={{ margin: "1rem 0" }}
              />
              <h4 style={{ textAlign: "center" }}>Start Time</h4>
              <h5>{item?.startTime.slice(0, 10)}</h5>
              <h4 style={{ textAlign: "center", marginTop: "0.6rem" }}>
                End Time
              </h4>
              <h5>{item?.endTime.slice(0, 10)}</h5>

              <img
                src={item?.map?.imageUrl}
                alt=""
                width="150px"
                height="150px"
              />

              <ButtonCard
                onClick={() => (window.location.href = `${item?.map?.link}`)}>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))}
        </CardMain>
      )}

      {!active && (
        <CardMain wrap="wrap">
          {eventsActiveData?.map((item, index) => (
            <CardsInfo
              justify="baseline"
              key={index}
              style={{ backgroundColor: `${item?.map?.gameMode?.color}` }}>
              <h2 style={{ textAlign: "center" }}>{item?.map?.name}</h2>
              <p style={{ textAlign: "center", margin: "0.5rem 0" }}>
                {item?.slot?.name}
              </p>
              <img
                src={item?.map?.gameMode?.imageUrl}
                alt=""
                width="120px"
                style={{ margin: "1rem 0" }}
              />
              <h4 style={{ textAlign: "center" }}>Start Time</h4>
              <h5>{item?.startTime.slice(0, 10)}</h5>
              <h4 style={{ textAlign: "center", marginTop: "0.6rem" }}>
                End Time
              </h4>
              <h5>{item?.endTime.slice(0, 10)}</h5>

              <img
                src={item?.map?.imageUrl}
                alt=""
                width="150px"
                height="150px"
              />

              <ButtonCard
                onClick={() => (window.location.href = `${item?.map?.link}`)}>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))}
        </CardMain>
      )}
    </>
  );
};

export default Events;
