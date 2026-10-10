import { useNavigate } from "react-router-dom";
import MissingState from "../components/common/MissingState";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MissingState
      seoTitle="Page Not Found"
      seoDescription="This Starr Park path is out of bounds."
      stamp="OUT OF BOUNDS"
      code="404"
      title="This map is missing"
      description="That route is not in the catalog. The brawler left the lane, or the page moved. Head back to the lobby."
      primaryLabel="Back to Lobby"
      onPrimary={() => navigate("/")}
      secondaryLabel="Go Back"
      onSecondary={() => navigate(-1)}
    />
  );
};

export default NotFound;
