import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeContext } from './context/ThemeContext';

import TournamentPage from './pages/Tournaments/TournamentsPage';
import Home from './pages/Home/Home';
import VenueLayout from './pages/VenueLayout/VenueLayout';

import LoginForm from './components/Login/Login';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AddTeamDetails from './components/Tournaments/AddTeamDetails/AddTeamDetails';
import GameDetailsPage from './components/Tournaments/GameDetails';
import MatchSchedule from './components/Tournaments/MatchSchedule';
import GroundVenueDetails from './components/Tournaments/GroundVenueDetails/GroundVenueDetails';
import GroundTournamentRules from './components/Tournaments/GroundTournamentRules/GroundTournamentRules';
import VenueDetails from './components/Tournaments/VenueDetails';

import './App.css';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { theme = 'light' } = useContext(ThemeContext) || {};

  const hideLayoutPaths = ['/login', '/reset-password'];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className={`app-container ${theme}`}>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </div>
  );
}

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<TournamentPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
                <Home />
            }
          />
          <Route
            path="/tournaments/:id"
            element={
                <GameDetailsPage />
            }
          />
          <Route
            path="/venue/:id"
            element={
                <VenueLayout />
            }
          />
 

          <Route
            path="/venue/:id/details"
            element={
                <GroundVenueDetails />
            }
          />
          <Route
            path="/venue/:id/tournament-rules"
            element={
                <GroundTournamentRules />
            }
          />
          <Route
            path="/venue-details/:id"
            element={
                <VenueDetails />
            }
          />
          <Route
            path="/add-team"
            element={
              <ProtectedRoute>
                <AddTeamDetails />
              </ProtectedRoute>
            }
          />

          {/* Public Route: Match Schedule */}
          <Route path="/match-schedule" element={<MatchSchedule />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
