// VenueDetails.jsx
import React, { useContext } from 'react';
import './VenueDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import { Navigation, ArrowLeft } from 'lucide-react';
import gameImg from '../../assets/Venues/gamelogo.png';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { ground, game } = useGame();

  const user = true;

  const handleBack = () => navigate(-1);
  const handleBooking = () => {
    if (user) alert('✅ Proceeding to booking...');
    else {
      alert('⚠️ Please log in to book a slot.');
      navigate('/login');
    }
  };

  if (!ground) return <p className="error-msg">❌ No venue data found.</p>;

  const location = ground.location || ground.address || 'N/A';
  const mainImage = game?.images?.[0]?.url || gameImg;

  return (
    <div className={`venue-details-wrapper ${theme}`}>
      <button className="back-btn" onClick={handleBack}>
        <ArrowLeft size={22} /> Back
      </button>

      <div className="top-section">
        <img src={mainImage} alt="ground" className="main-img" />
        <div className="details-section">
          <div className="details-header">
            <div>
              <h1>{ground.ground_name}</h1>
              <p className="game-name">{ground.name || 'N/A'}</p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="get-directions"
            >
              Get Directions <Navigation size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="section"><h2>About</h2><p>{ground.description || 'No description available.'}</p></div>

      <div className="section">
        <h2>Slot Time</h2>
        {ground.maintenanceSchedule?.map((slot, idx) => (
          <div key={idx} className="maintance-schedule">
            <p>Days: {slot.days.join(', ')}</p>
            <p>Start: {slot.startTime}</p>
            <p>End: {slot.endTime}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Amenities</h2>
        <ul className="amenities-list">
          {ground.amenities?.map((a, i) => <li key={i}>{a},</li>)}
        </ul>
      </div>

      <div className="section"><h2>Location</h2><p>{ground.address || 'N/A'}</p></div>
      <div className="section"><h2>Ground Timings</h2><p>{ground.Created || 'N/A'}</p></div>

      {user && (
        <button className="book-button" onClick={handleBooking}>
          Book Slot
        </button>
      )}
    </div>
  );
};

export default VenueDetails;
