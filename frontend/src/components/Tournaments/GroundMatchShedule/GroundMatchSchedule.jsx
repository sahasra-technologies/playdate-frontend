import React from 'react';
import './GroundMatchSchedule.css';
import matchScheduleImg from '../../../assets/Tournment/matchSchedule.png';
import { useParams, useNavigate } from 'react-router-dom';

const GroundMatchSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="match-schedule-wrapper">

      <div className="image-container">
        <img
          src={matchScheduleImg}
          alt="Match Schedule"
          className="match-schedule-image"
        />
      </div>
    </div>
  );
};

export default GroundMatchSchedule;
