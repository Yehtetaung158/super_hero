import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import HeroProfile from "./pages/HeroProfile";
import Biographypage from "./pages/profiledetailpage/Biographypage";
import Powerstatspage from "./pages/profiledetailpage/Powerstatspage";
import Appearancepage from "./pages/profiledetailpage/Appearancepage";
import Workpage from "./pages/profiledetailpage/Workpage";
import Connectionspage from "./pages/profiledetailpage/Connectionspage";
import IndexProfile from "./pages/profiledetailpage/IndexProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route path="/:id" element={<HeroProfile />}>
          <Route index element={<IndexProfile />} />
          {/* <Route path="powerstats" element={<Powerstatspage />} /> */}
          <Route path="biography" element={<Biographypage />} />
          <Route path="appearance" element={<Appearancepage />} />
          <Route path="work" element={<Workpage />} />
          <Route path="connections" element={<Connectionspage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
