import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Home from "../pages/Home";
import FixturesByTeam from "../pages/FixturesByTeam";
import FixturesByDate from "../pages/FixturesByDate";
import Tree from "../pages/Tree";
import Squads from "../pages/Squads";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/by-team" element={<FixturesByTeam />} />
          <Route path="/by-date" element={<FixturesByDate />} />
          <Route path="/squads" element={<Squads />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
}
