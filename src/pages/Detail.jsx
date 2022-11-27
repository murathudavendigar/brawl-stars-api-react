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
    <DetailMain>
      <div>
        <h1>
          <img src={state.imageUrl3} alt="" width="40px" /> {state.name}
          <img src={state.imageUrl3} alt="" width="40px" />
        </h1>
      </div>
      <img src={state.imageUrl} alt="" width="150px" />

      <h5>{state.description}</h5>
      {state?.starPowers.length > 0 && <h2>Star Powers</h2>}
      <Flex style={{ flexDirection: "column" }} align="start">
        {state?.starPowers.map((item, index) => {
          return (
            <div
              key={index}
              style={{ borderBottom: "1px solid black", width: "100%" }}>
              <Flex justify="flex-start" style={{ margin: "0.6rem 0" }}>
                <h4 style={{ color: "rgb(240,25,25)" }}>-- {item?.name}</h4>
                <img src={item?.imageUrl} alt="" width="30px" />
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
