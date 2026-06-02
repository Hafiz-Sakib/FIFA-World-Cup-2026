import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Bracket from "./pages/Bracket";
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Stadiums from "./pages/Stadiums";
import StadiumDetail from "./pages/StadiumDetail";
import Standings from "./pages/Standings";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="groups" element={<Groups />} />
          <Route path="bracket" element={<Bracket />} />
          <Route path="matches" element={<Matches />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="stadiums" element={<Stadiums />} />
          <Route path="stadiums/:id" element={<StadiumDetail />} />
          <Route path="standings" element={<Standings />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </Router>
  );
}
