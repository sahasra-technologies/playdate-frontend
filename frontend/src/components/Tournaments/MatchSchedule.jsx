import './MatchSchedule.css';
import {Navigation } from 'lucide-react';
import gameImg from '../../assets/Venues/gamelogo.png';

const MatchSchedule = () => {
  return (
    <div className="match-schedule-container">
      <div className="top-section">
        <img src={gameImg} alt="Game" />
        <div className="details-section">
          <div className="details-header">
            <div>
              <h1>John Doe</h1>
              <p className="game-name">Basketball</p>
            </div>
            <a href="#" className="get-directions">
  Get Directions <span className="nav-icon-bg"><Navigation size={14} /></span>
</a>

          </div>
        </div>
      </div>

      <div className="section">
        <h2>About</h2>
        <p>This is a friendly match scheduled with top local players.</p>
      </div>

      <div className="section">
        <h2>Slot Time</h2>
        <p>Monday - 08:00 AM to 12:00 AM</p>
      </div>

      <div className="section">
        <h2>Amenities</h2>
        <p>Restrooms, Water stations, First aid, Seating, Parking</p>
      </div>

      <div className="section">
        <h2>Location</h2>
        <p>Sunshine Sports Arena, 5th Avenue, New York</p>
      </div>

      <div className="section">
        <h2>Ground Timings</h2>
        <p>6:00 AM - 10:00 PM Daily</p>
      </div>

      <button className="book-button">Book Slot</button>
    </div>
  );
};

export default MatchSchedule;
