import React, { useState, useEffect } from "react";
import "./AddTeamDetails.css";
import Cookies from 'js-cookie';
import defaultImage from "../../../assets/Tournment/Profile-PNG-Images.png";
import { useNavigate } from 'react-router-dom';

const API_URL = "https://playdatesport.com/api/Tournament/teams/";
const ACCESS_TOKEN = Cookies.get('access');
const userId = Cookies.get('userId');

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    // .split(',')[1]
    reader.onerror = (error) => reject(error);
  });
};

const AddTeamDetails = () => {
  const [players, setPlayers] = useState([{ name: "", email: "", image: defaultImage }]);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamLogoFile, setTeamLogoFile] = useState(null);
  const [status, setStatus] = useState("");
  const [captain, setCaptain] = useState({ name: "", email: "" });
  const [viceCaptain, setViceCaptain] = useState({ name: "", email: "" });
  const [teamId, setTeamId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await fetch(`${API_URL}?id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch teams");

        if (data.length > 0) {
          const team = data[0];
          setTeamId(team.id);
          setTeamName(team.name);
          if (team.images?.url) {
            setTeamLogo(team.images.url);
          }

          const captainData = team.team.find((p) => p.role === "Captain");
          const viceCaptainData = team.team.find((p) => p.role === "Vice Captain");

          setCaptain(captainData || { name: "", email: "" });
          setViceCaptain(viceCaptainData || { name: "", email: "" });

          const otherPlayers = team.team.filter(
            (p) => p.role !== "Captain" && p.role !== "Vice Captain"
          );
          setPlayers(
            otherPlayers.map((player) => ({
              name: player.name,
              email: player.email,
              image: defaultImage,
            }))
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("Failed to load team data");
      }
    };

    fetchTeamData();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, { name: "", email: "", image: defaultImage }]);
  };

  const handleDeletePlayer = (index) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  const handleTeamLogoChange = (e) => {
    const file = e.target.files[0];
    setTeamLogoFile(file);
    setTeamLogo(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    setTeamModalOpen(true);
  };

  const handleFinalSubmit = async () => {
    setStatus("Submitting team...");

    let base64Image = "";
    if (teamLogoFile) {
      try {
        base64Image = await toBase64(teamLogoFile);
      } catch (err) {
        setStatus("Error converting image to Base64");
        return;
      }
    }

    const payload = {
      name: teamName,
      images: { url: base64Image },
      team: [
        {
          role: "Captain",
          email: captain.email,
          name: captain.name,
        },
        {
          role: "Vice Captain",
          email: viceCaptain.email,
          name: viceCaptain.name,
        },
        ...players.map((player) => ({
          role: player.name,
          email: player.email,
          name: player.name,
        })),
      ],
      owner: userId,
      ...(teamId && { id: teamId })  // 👈 Conditionally add "id" if teamId exists
    };

    const method = teamId ? "PUT" : "POST";
    // const url = teamId ? `${API_URL}${teamId}/` : API_URL;

    try {
      const res = await fetch(API_URL, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(`Submission failed: ${JSON.stringify(result)}`);
      }

      setStatus("Team submitted successfully!");
      alert("Team submitted successfully!");
      setTeamModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error(err);
      setStatus("Error submitting team");
    }
  };

  return (
    <div className="add-team-container">
      <div className="top-bar">
        <h2 className="title">Add Team Details</h2>
        <button className="add-player-btn" onClick={handleAddPlayer}>+ Add</button>
      </div>

      <div className="players-grid">
        <div className="player-card">
          <div className="image-wrapper">
            <img src={defaultImage} alt="Captain" className="player-img" />
          </div>
          <div className="role-label">Captain</div>
          <input
            type="text"
            placeholder="Enter Name"
            value={captain.name}
            onChange={(e) => setCaptain({ ...captain, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={captain.email}
            onChange={(e) => setCaptain({ ...captain, email: e.target.value })}
          />
        </div>

        <div className="player-card">
          <div className="image-wrapper">
            <img src={defaultImage} alt="Vice Captain" className="player-img" />
          </div>
          <div className="role-label">Vice Captain</div>
          <input
            type="text"
            placeholder="Enter Name"
            value={viceCaptain.name}
            onChange={(e) => setViceCaptain({ ...viceCaptain, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={viceCaptain.email}
            onChange={(e) => setViceCaptain({ ...viceCaptain, email: e.target.value })}
          />
        </div>

        {players.map((player, index) => (
          <div className="player-card" key={index}>
            <div className="icons-row">
              <span className="delete" onClick={() => handleDeletePlayer(index)}>&#128465;</span>
            </div>
            <div className="image-wrapper">
              <img src={defaultImage} alt="Player" className="player-img" />
            </div>
            <input
              type="text"
              placeholder="Enter Role"
              value={player.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={player.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>{teamId ? "Update Team" : "Save Team"}</button>
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
              <button className="save-btn" onClick={handleFinalSubmit}>{teamId ? "Update Team" : "Save Team"}</button>
              <button className="cancel-btn" onClick={() => setTeamModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeamDetails;
