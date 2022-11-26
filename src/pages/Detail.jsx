import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailMain from "../styles/Detail.styled";
import { SearchButton } from "../styles/Header.styled";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

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
      {state?.starPowers.map((item, index) => {
        return (
          <div key={index}>
            <h4>{item?.name}</h4>

            <img src={item?.imageUrl} alt="" width="100px" />
            <p>{item?.description}</p>
          </div>
        );
      })}
      <SearchButton onClick={() => navigate(-1)}>GO BACK</SearchButton>
    </DetailMain>
  );
};

export default Detail;
