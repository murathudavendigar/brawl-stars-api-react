import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollButton from "../components/ScrollButton";
import About from "../pages/About";
import Detail from "../pages/Detail";
import Events from "../pages/Events";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Stats from "../pages/Stats";
import GlobalStyle from "../styles/GlobalStyles";

const AppRouter = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<Detail />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollButton />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default AppRouter;
