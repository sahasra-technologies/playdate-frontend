import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home/Home';
import TournamentPage from './pages/Tournaments/TournamentsPage';
import GameDetailsPage from './components/Tournaments/GameDetails';
import VenueLayout from './pages/VenueLayout/VenueLayout';
import GroundMatchSchedule from './components/Tournaments/GroundMatchShedule/GroundMatchSchedule';
import GroundVenueDetails from './components/Tournaments/GroundVenueDetails/GroundVenueDetails';
import GroundTournamentRules from './components/Tournaments/GroundTournamentRules/GroundTournamentRules';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<TournamentPage />} />
        <Route path="/tournaments/:id" element={<GameDetailsPage />} />
       <Route path="/venue/:id" element={<VenueLayout />} />
        <Route path="/venue/:id/details" element={<GroundVenueDetails />} />
        <Route path="/venue/:id/match-schedule" element={<GroundMatchSchedule />} />
        <Route path="/venue/:id/tournament-rules" element={<GroundTournamentRules />} />
      </Routes>
    </Router>
  );
}

export default App;
