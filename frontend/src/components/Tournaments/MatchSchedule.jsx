import { useNavigate } from 'react-router-dom';
import matchSchedule from '../../assets/Tournment/matchSchedule.png';
import './MatchSchedule.css';

const MatchSchedule = () => {
  const navigate = useNavigate();

  return (
    <div className="match-schedule">
      <img 
        src={matchSchedule} 
        alt="Tournament Match Schedule" 
        className="match-schedule__image" 
      />
    </div>
  );
};

export default MatchSchedule;
