import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollButton from "../components/ScrollButton";
import useThemeMode from "../hooks/useThemeMode";
import About from "../pages/About";
import Detail from "../pages/Detail";
import Events from "../pages/Events";
import GameModeDetail from "../pages/GameModeDetail";
import Home from "../pages/Home";
import MapDetail from "../pages/MapDetail";
import NotFound from "../pages/NotFound";
import GlobalStyle from "../styles/GlobalStyles";

const AppRouter = () => {
  const { themeMode, cycleThemeMode } = useThemeMode();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar themeMode={themeMode} onThemeToggle={cycleThemeMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="brawlers/:brawlerId" element={<Detail />} />
          <Route path="maps/:mapId" element={<MapDetail />} />
          <Route path="gamemodes/:modeId" element={<GameModeDetail />} />
          <Route path="detail" element={<Detail />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollButton />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default AppRouter;
