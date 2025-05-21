import { useNavigate } from 'react-router-dom';
import matchSchedule from '../../assets/Tournment/matchSchedule.png'

const MatchSchedule = () => {
  const navigate = useNavigate();

  return (
    <div className="match-schedule-container">
      <img src={matchSchedule} alt="Match Schedule" className="match-schedule-image" />
    </div>
  );
};
export default MatchSchedule;