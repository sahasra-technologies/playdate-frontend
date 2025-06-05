import React, { useState, useEffect } from "react";
import "./AddTeamDetails.css";
import Cookies from 'js-cookie';
import defaultImage from "../../../assets/Tournment/Profile-PNG-Images.png";
import { useNavigate } from 'react-router-dom';

const API_URL = "https://playdatesport.com/api/Tournament/teams/";

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

const AddTeamDetails = ({ setIsLoading }) => {
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamLogoFile, setTeamLogoFile] = useState(null);
  const [captain, setCaptain] = useState({ name: "", email: "" });
  const [viceCaptain, setViceCaptain] = useState({ name: "", email: "" });
  const [players, setPlayers] = useState([{ name: "", email: "", image: defaultImage }]);
  const [status, setStatus] = useState("");
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  const navigate = useNavigate();
  const ACCESS_TOKEN = Cookies.get('access');
  const USER_ID = Cookies.get('userId');

  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}?id=${USER_ID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        const data = await res.json();
        if (data.length > 0) {
          const team = data[0];
          setTeamId(team.id);
          setTeamName(team.name);
          if (team.images?.url) setTeamLogo(team.images.url);

          setCaptain(team.team.find(p => p.role === "Captain") || { name: "", email: "" });
          setViceCaptain(team.team.find(p => p.role === "Vice Captain") || { name: "", email: "" });

          const otherPlayers = team.team.filter(p => !["Captain", "Vice Captain"].includes(p.role));
          setPlayers(otherPlayers.map(p => ({ name: p.name, email: p.email, image: defaultImage })));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("Failed to load team data");
      }
      setIsLoading(false);
    };

    fetchTeamData();
  }, []);

  const updatePlayer = (index, field, value) => {
    setPlayers(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleAddPlayer = () => {
    setPlayers(prev => [...prev, { name: "", email: "", image: defaultImage }]);
  };

  const handleDeletePlayer = (index) => {
    setPlayers(prev => prev.filter((_, i) => i !== index));
  };

  const handleTeamLogoChange = (e) => {
    const file = e.target.files[0];
    setTeamLogoFile(file);
    setTeamLogo(URL.createObjectURL(file));
  };

  const handleSubmit = () => setTeamModalOpen(true);

  const handleFinalSubmit = async () => {
    setStatus("Submitting team...");

    let base64Image = "";
    if (teamLogoFile) {
      try {
        base64Image = await toBase64(teamLogoFile);
      } catch {
        setStatus("Error converting image");
        return;
      }
    }

    const payload = {
      name: teamName,
      images: { url: base64Image },
      team: [
        { role: "Captain", name: captain.name, email: captain.email },
        { role: "Vice Captain", name: viceCaptain.name, email: viceCaptain.email },
        ...players.map(p => ({
          role: p.name,
          name: p.name,
          email: p.email
        }))
      ],
      owner: USER_ID,
      ...(teamId && { id: teamId })
    };

    const method = teamId ? "PUT" : "POST";

    try {
      setIsLoading(true);
      const res = await fetch(API_URL, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Submission failed");

      alert("Team submitted successfully!");
      setTeamModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus("Error submitting team");
    }
    setIsLoading(false);
  };

  const renderPlayerCard = (role, user, setUser, removable = false, index = 0) => (
    <div className="player-card" key={index}>
      {removable && (
        <div className="icons-row">
          <span className="delete" onClick={() => handleDeletePlayer(index)}>&#128465;</span>
        </div>
      )}
      <div className="image-wrapper">
        <img src={defaultImage} alt={role} className="player-img" />
      </div>
      {role && <div className="role-label">{role}</div>}
      <input
        type="text"
        placeholder="Enter Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </div>
  );

  return (
    <div className="add-team-container">
      <div className="top-bar">
        <h2 className="title">Add Team Details</h2>
        <button className="add-player-btn" onClick={handleAddPlayer}>+ Add</button>
      </div>

      <div className="players-grid">
        {renderPlayerCard("Captain", captain, setCaptain)}
        {renderPlayerCard("Vice Captain", viceCaptain, setViceCaptain)}
        {players.map((player, i) =>
          renderPlayerCard(null, player, (updated) => updatePlayer(i, "name", updated.name), true, i)
        )}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        {teamId ? "Update Team" : "Save Team"}
      </button>
      {status && <p className="status-text">{status}</p>}

      {teamModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter Team Details</h3>
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleTeamLogoChange} />
            {teamLogo && <img src={teamLogo} alt="Team Logo" className="team-logo-preview" />}
            <div className="modal-actions">
              <button className="save-btn" onClick={handleFinalSubmit}>
                {teamId ? "Update Team" : "Save Team"}
              </button>
              <button className="cancel-btn" onClick={() => setTeamModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeamDetails;
