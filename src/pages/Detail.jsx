import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailMain from "../styles/Detail.styled";
import Flex from "../styles/Flex.styled";
import { SearchButton } from "../styles/Header.styled";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  return (
    <DetailMain
      style={{
        backgroundImage: `linear-gradient(0deg, ${state?.rarity?.color}, rgb(33, 134, 255,0.01))`,
      }}>
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <h1>
          <img src={state.imageUrl3} alt="" width="40px" /> {state.name}{" "}
          <img src={state.imageUrl3} alt="" width="40px" />
        </h1>
        <h4 style={{ marginTop: "0.5rem" }}>
          <em>
            {state?.class?.name} / {state?.rarity?.name}
          </em>
        </h4>
      </div>
      <img src={state.imageUrl} alt="" width="150px" />

      <h4 style={{ margin: "1rem 0" }}>{state.description}</h4>
      {state?.gadgets.length > 0 && <h2>Gadgets</h2>}
      <Flex
        style={{ flexDirection: "column", marginBottom: "1rem" }}
        align="start">
        {state?.gadgets.map((item, index) => {
          return (
            <div
              key={index}
              style={{ borderBottom: "1px solid black", width: "100%" }}>
              <Flex
                justify="flex-start"
                style={{ margin: "0.6rem 0", gap: "1rem" }}>
                <img src={item?.imageUrl} alt="" width="30px" />
                <h4>-- {item?.name}</h4>
              </Flex>
              <p>{item?.description}</p>

              <hr />
            </div>
          );
        })}
      </Flex>

      {state?.starPowers.length > 0 && <h2>Star Powers</h2>}
      <Flex style={{ flexDirection: "column" }} align="start">
        {state?.starPowers.map((item, index) => {
          return (
            <div
              key={index}
              style={{ borderBottom: "1px solid black", width: "100%" }}>
              <Flex
                justify="flex-start"
                style={{ margin: "0.6rem 0", gap: "1rem" }}>
                <img src={item?.imageUrl} alt="" width="30px" />
                <h4>-- {item?.name}</h4>
              </Flex>
              <p>{item?.description}</p>

              <hr />
            </div>
          );
        })}
      </Flex>
      <SearchButton style={{ margin: "1rem" }} onClick={() => navigate(-1)}>
        GO BACK
      </SearchButton>
    </DetailMain>
  );
};

export default Detail;
