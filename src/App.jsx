import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Home from "./pages/Home.jsx";
import TreasurePage from "./pages/TreasurePage.jsx";
import FinalTreasure from "./pages/FinalTreasure.jsx";

export default function App() {
  return (
    <div className="app">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treasure/:id" element={<TreasurePage />} />
        <Route path="/final" element={<FinalTreasure />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
