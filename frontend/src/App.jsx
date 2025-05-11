import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home/Home';
import TournamentPage from './pages/Tournaments/TournamentsPage';
import GameDetailsPage from './components/Tournaments/GameDetails';
import VenueDetails from './components/Tournaments/VenueDetails';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournaments" element={<TournamentPage/>} />
        <Route path="/tournaments/:id" element={<GameDetailsPage />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
