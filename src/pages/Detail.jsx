import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonCard } from "../styles/Card.styled";
import DetailMain from "../styles/Detail.styled";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <DetailMain>
      <div>
        <h1>
          <img src={state.imageUrl3} alt="" width="40px" /> {state.name}{" "}
          <img src={state.imageUrl3} alt="" width="40px" />
        </h1>
      </div>
      <img src={state.imageUrl} alt="" width="150px" />

      <h5>{state.description}</h5>
      {state?.starPowers.length > 0 && <h2>Star Powers</h2>}
      {state?.starPowers.map((item) => {
        return (
          <>
            <h4>{item?.name}</h4>

            <img src={item?.imageUrl} alt="" width="100px" />
            <p>{item?.description}</p>
          </>
        );
      })}
      <ButtonCard onClick={() => navigate(-1)}>GO BACK</ButtonCard>
    </DetailMain>
  );
};

export default Detail;
