import React, { useEffect, useState } from 'react';
import './GroundTournamentRules.css';

const GroundTournamentRules = ({ id }) => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!id) return;

    let ws;

    try {
      ws = new WebSocket('ws://157.173.195.249:8000/tournaments');

      ws.onopen = () => {
        console.log('✅ WebSocket connected for tournament rules');
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          if (message.action === 'initial' && Array.isArray(message.data)) {
            const selectedTournament = message.data.find(
              (item) => item.id === id
            );

            if (selectedTournament) {
              const tournamentRules = selectedTournament.rules || [];
              setRules(tournamentRules);
            } else {
              setErrorMsg('Tournament not found.');
            }
          } else {
            setErrorMsg('Invalid data format from WebSocket.');
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
          setErrorMsg('Failed to parse WebSocket message.');
        } finally {
          setLoading(false);
        }
      };

      ws.onerror = (err) => {
        console.error('❌ WebSocket error:', err);
        setErrorMsg('WebSocket connection error.');
        setLoading(false);
      };

      ws.onclose = (e) => {
        console.warn('⚠️ WebSocket closed:', e.reason || 'No reason');
      };
    } catch (err) {
      console.error('❌ Failed to create WebSocket:', err);
      setErrorMsg('Failed to connect to WebSocket server.');
      setLoading(false);
    }

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [id]);

  return (
    <div className="tournament-rules-container">
      <div className="heading-section">
        <h2 className="heading-title">Tournament Rules</h2>
      </div>

      <div className="rules-content">
        {loading ? (
          <p>Loading rules...</p>
        ) : errorMsg ? (
          <p className="error">{errorMsg}</p>
        ) : rules.length > 0 ? (
          rules.map((rule, index) => <p key={index}>{rule}</p>)
        ) : (
          <p>No rules provided.</p>
        )}
      </div>
    </div>
  );
};

export default GroundTournamentRules;
