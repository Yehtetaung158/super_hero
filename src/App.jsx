import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import HeroProfile from "./pages/HeroProfile";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/:id" element={<HeroProfile/>}>
            <Route path="/:id/:slug"/>
          </Route>
        </Route>
      </Routes>
  );
};

export default App;
