import React, { useContext, useState } from 'react';
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

// import { SpinnerInfinity } from 'spinners-react';
import CustomSpinner from './components/Spinner/CustomSpinner';
import './App.css';

// 🔄 Layout with Navbar/Footer
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

// ❌ 404 fallback
const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

// ✅ Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      {/* ✅ Spinner placed above Routes */}
      {isLoading && (
        <div className="spinner-overlay">
          <CustomSpinner
            size={100}
            thickness={100}
            speed={100}
            color="rgb(7, 141, 236)"
            secondaryColor="rgba(0, 0, 0, 0.1)"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
            }}
          />
        </div>
      )}

      <LayoutWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<TournamentPage setIsLoading={setIsLoading} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected & Other Routes */}
          <Route path="/home" element={<Home setIsLoading={setIsLoading} />} />
          <Route path="/tournaments/:id" element={<GameDetailsPage setIsLoading={setIsLoading} />} />
          <Route path="/venue/:id" element={<VenueLayout setIsLoading={setIsLoading} />} />
          <Route path="/venue/:id/details" element={<GroundVenueDetails setIsLoading={setIsLoading} />} />
          <Route path="/venue/:id/tournament-rules" element={<GroundTournamentRules setIsLoading={setIsLoading} />} />
          <Route path="/venue-details/:id" element={<VenueDetails setIsLoading={setIsLoading} />} />
          <Route
            path="/add-team"
            element={
              <ProtectedRoute>
                <AddTeamDetails setIsLoading={setIsLoading} />
              </ProtectedRoute>
            }
          />
          <Route path="/match-schedule" element={<MatchSchedule setIsLoading={setIsLoading} />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
