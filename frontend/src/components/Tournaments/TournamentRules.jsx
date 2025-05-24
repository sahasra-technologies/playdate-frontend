import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { VscTriangleRight } from 'react-icons/vsc';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import './TournamentRules.css';

const TournamentRules = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { ground } = useGame();
  const [groundData, setGroundData] = useState(null);
  
  
  useEffect(() => {
    if (ground) {
      setGroundData(ground);
    } else {
      console.warn('No ground data found in context. Displaying default rules.');
    }
  }, [ground]);

  return (
    <div className={`tournament-rules-container ${theme}`}>
      <h1 className="main-heading">Tournament Ground Details & Rules</h1>

      {groundData ? (
        <div className="ground-card">
          <h2 className="ground-title">{groundData.ground_name}</h2>
          {/* <p className="ground-description">{groundData.description}</p> */}

          <div className="section">
            <h3 className="section-heading blue"><VscTriangleRight className="icon" />Ground Rules</h3>
            <ul className="no-list-style">
              <li><strong>Goals:</strong> {groundData.groundRulesInfo?.goals || 'N/A'}</li>
         
              <li><strong>Dimensions:</strong> {groundData.groundRulesInfo?.dimensions || 'N/A'}</li>
            </ul>
          </div>

          {/* <div className="section">
            <h3 className="section-heading purple"><VscTriangleRight className="icon" />Pricing</h3>
            {groundData.pricing?.length > 0 ? (
              groundData.pricing.map((slot, index) => (
                <div key={index} className="pricing-slot">
                  <p className="slot-days">Days: {slot.days?.join(', ')}</p>
                  {slot.times?.map((time, idx) => (
                    <p key={idx} className="slot-time">
                      ₹{time.price} — {time.startTime} to {time.endTime}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p>No pricing info available.</p>
            )}
          </div>

          <div className="section">
            <h3 className="section-heading red"><VscTriangleRight className="icon" />Maintenance Schedule</h3>
            {groundData.maintenanceSchedule?.length > 0 ? (
              groundData.maintenanceSchedule.map((item, index) => (
                <p key={index} className="maintenance-item">
                  {item.days.join(', ')}: {item.startTime} to {item.endTime}
                </p>
              ))
            ) : (
              <p>No maintenance schedule available.</p>
            )}
          </div> */}

          {/* {groundData.promotions?.length > 0 && (
            <div className="section">
              <h3 className="section-heading orange"><VscTriangleRight className="icon" />Promotions</h3>
              {groundData.promotions.map((promo, index) => (
                <p key={index} className="promotion-item">
                  <strong>{promo.title || 'Offer'}:</strong> {promo.discount}% off (Valid until {promo.validity})
                </p>
              ))}
            </div>
          )} */}
        </div>
      ) : (
        <div className="rules-content">
          <p>1. Each team must have a minimum of 5 and a maximum of 10 players.</p>
          <p>2. Players must wear proper sports attire and shoes during matches.</p>
          <p>3. Matches will follow knockout format; the losing team is eliminated.</p>
          <p>4. Any misconduct or foul play will result in immediate disqualification.</p>
          <p>5. Matches will be 40 minutes long with two 20-minute halves.</p>
          <p>6. The referee’s decision will be final and binding in all cases.</p>
          <p>7. All teams must arrive 15 minutes before their scheduled match.</p>
          <p>8. Substitutions can be made only during stoppages and with the referee’s permission.</p>
        </div>
      )}
    </div>
  );
};

export default TournamentRules;
