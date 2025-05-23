import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VenueDetails from '../../components/Tournaments/VenueDetails';
import TournamentRules from '../../components/Tournaments/TournamentRules';
import GroundMatchSchedule from '../../components/Tournaments/GroundMatchSchedule/GroundMatchSchedule';
import GroundTournamentRules from '../../components/Tournaments/GroundTournamentRules/GroundTournamentRules';
import { FaLightbulb, FaCalendarAlt } from 'react-icons/fa';
import { FcRules } from 'react-icons/fc';
import MatchSchedule from '../../components/Tournaments/MatchSchedule';
import './VenueLayout.css';

const VenueLayout = ({ setIsLoading }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('venue');

  return (
    <div className="venue-layout-wrapper">
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('venue')}
          className={activeTab === 'venue' ? 'active' : ''}
        >
          <div className="tab-icon"><FaLightbulb /></div>
          <div>
            Venue Details
            <small>Stadium & surroundings</small>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={activeTab === 'schedule' ? 'active' : ''}
        >
          <div className="tab-icon"><FaCalendarAlt /></div>
          <div>
            Match Schedule
            <small>Check game dates</small>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={activeTab === 'rules' ? 'active' : ''}
        >
          <div className="tab-icon"><FcRules /></div>
          <div>
            Tournament Rules
            <small>Guidelines & rules</small>
          </div>
        </button>
      </div>

      {/* Conditional Content Based on Active Tab */}
      <div className="venue-tab-content">
        {activeTab === 'venue' && (
          <>
            <div className="venue-card">
              <VenueDetails id={id} />
            </div>
            {/* <div className="rules-card">
              <TournamentRules id={id} />
            </div> */}
          </>
        )}

        {activeTab === 'schedule' && (
          <div className="rules-card">
            <MatchSchedule setIsLoading={setIsLoading}/>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="rules-card">
            <GroundTournamentRules id={id} setIsLoading={setIsLoading}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueLayout;
