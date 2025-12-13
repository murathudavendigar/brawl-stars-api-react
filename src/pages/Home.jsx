import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import ErrorMessage from "../components/common/ErrorMessage";
import SEO from "../components/common/SEO";
import { SkeletonCardGrid } from "../components/common/Skeleton";
import { API_CONFIG, SEARCH_TYPES } from "../lib/config";
import { HomeMainDiv } from "../styles/Home.styled";

const Home = () => {
  const [info, setInfo] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("brawlers");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `${API_CONFIG.BRAWLIFY_BASE_URL}/${searchType}`;

  const getPageTitle = () => {
    const type = Object.values(SEARCH_TYPES).find(
      (t) => t.value === searchType
    );
    return type?.label || "Home";
  };

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios(url);
      setInfo(data?.list);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (error)
    return (
      <>
        <SEO title={getPageTitle()} />
        <HomeMainDiv>
          <ErrorMessage message={error} onRetry={getData} />
        </HomeMainDiv>
      </>
    );

  return (
    <>
      <SEO
        title={getPageTitle()}
        description={`Explore all Brawl Stars ${searchType}. Browse, search, and discover detailed information.`}
        keywords={`Brawl Stars, ${searchType}, game, mobile, supercell`}
      />
      <HomeMainDiv>
        <Header setSearchName={setSearchName} setSearchType={setSearchType} />
        {loading ? (
          <SkeletonCardGrid count={12} />
        ) : (
          <Cards info={info} searchName={searchName} searchType={searchType} />
        )}
      </HomeMainDiv>
    </>
  );
};

export default Home;
