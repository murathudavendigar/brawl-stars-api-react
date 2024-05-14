import axios from "axios";
import moment from "moment";
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

  console.log(eventsUpcomingData)

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <>
      <Flex style={{ gap: "2rem" }}>
        <ButtonEventsPage color={!active} onClick={() => setActive(true)}>
          Active
        </ButtonEventsPage>
        <ButtonEventsPage color={active} onClick={() => setActive(false)}>
          Upcoming
        </ButtonEventsPage>
      </Flex>
      {!active && (
        <CardMain wrap="wrap">
          {eventsUpcomingData?.map((item, index) => (
            <CardsInfo
              justify="baseline"
              key={index}
              style={{ backgroundColor: `${item?.map?.gameMode?.bgColor}` }}>
              <h3 style={{ textAlign: "center" }}>{item?.map?.name}</h3>
              <p style={{ textAlign: "center", margin: "0.5rem 0" }}>
                {item?.map?.gameMode?.name}
              </p>
              <img
                src={item?.map?.gameMode?.imageUrl}
                alt=""
                width="130px"
                height="130px"
                style={{ margin: "1rem 0", padding: "1rem 0" }}
              />
              <h4 style={{ textAlign: "center" }}>Start Time</h4>
              <h5>{moment(item?.startTime.slice(0, 10)).format("LL")}</h5>
              <h4 style={{ textAlign: "center", marginTop: "0.6rem" }}>
                End Time
              </h4>
              <h5>{moment(item?.endTime.slice(0, 10)).format("LL")}</h5>

              <img
                src={item?.map?.imageUrl}
                alt=""
                width="150px"
                height="150px"
                style={{ padding: "0.2rem 0", margin: "0.3rem 0" }}
              />

              <ButtonCard
                onClick={() => (window.location.href = `${item?.map?.link}`)}>
                View Details
              </ButtonCard>
            </CardsInfo>
          ))}
        </CardMain>
      )}

      {active && (
        <CardMain wrap="wrap">
          {eventsActiveData?.map((item, index) => (
            <CardsInfo
              justify="baseline"
              key={index}
              style={{ backgroundColor: `${item?.map?.gameMode?.bgColor}` }}>
              <h3 style={{ textAlign: "center" }}>{item?.map?.name}</h3>
              <p style={{ textAlign: "center", margin: "0.5rem 0" }}>
                {item?.map?.gameMode?.name}
              </p>
              <img
                src={item?.map?.gameMode?.imageUrl}
                alt=""
                width="130px"
                height="130px"
                style={{ margin: "1rem 0", padding: "1rem 0" }}
              />
              <h4 style={{ textAlign: "center" }}>Start Time</h4>
              <h5>{moment(item?.startTime.slice(0, 10)).format("LL")}</h5>
              <h4 style={{ textAlign: "center", marginTop: "0.6rem" }}>
                End Time
              </h4>
              <h5>{moment(item?.endTime.slice(0, 10)).format("LL")}</h5>

              <img
                src={item?.map?.imageUrl}
                alt=""
                width="150px"
                height="150px"
                style={{ padding: "0.2rem 0", margin: "0.3rem 0" }}
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
