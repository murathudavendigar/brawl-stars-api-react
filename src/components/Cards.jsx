import { useNavigate } from "react-router-dom";
import CardsInfo, { ButtonCard, CardMain } from "../styles/Card.styled";

const Cards = ({ info, searchName }) => {
  const navigate = useNavigate();

  console.log(searchName);

  return (
    <>
      <CardMain wrap="wrap">
        {info.map((item, index) => {
          return (
            <CardsInfo key={index} justify="baseline">
              <h2>{item.name}</h2>
              <img src={item.imageUrl} alt="" width="150px" />
              <p>{item.description}</p>
              <ButtonCard onClick={() => navigate("detail", { state: item })}>
                View Details
              </ButtonCard>
            </CardsInfo>
          );
        })}
      </CardMain>
    </>
  );
};

export default Cards;
