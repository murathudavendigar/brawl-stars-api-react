import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import GlobalStyle from "../styles/GlobalStyles";
import Navbar from "../components/Navbar";
import Detail from "../pages/Detail";
import About from "../pages/About";
import Events from "../pages/Events";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail" element={<Detail />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
