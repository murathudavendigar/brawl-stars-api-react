import { HomeMainDiv } from "../styles/Home.styled";
import axios from "axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const Home = () => {
  const [info, setInfo] = useState([]);

  const url = "https://api.brawlapi.com/v1/brawlers";

  const getData = async () => {
    const { data } = await axios(url);
    setInfo(data?.list);
  };

  console.log(info);

  useEffect(() => {
    getData();
  }, []);

  return (
    <HomeMainDiv>
      <Header />
      <Cards info={info} />
    </HomeMainDiv>
  );
};

export default Home;
