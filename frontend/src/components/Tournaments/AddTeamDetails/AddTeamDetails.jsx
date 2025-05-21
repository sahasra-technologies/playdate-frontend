import React, { useState } from "react";
import "./AddTeamDetails.css";
import defaultImage from "../../../assets/Tournment/team.png";

const API_URL = "http://157.173.195.249:8000/Tournament/teams/";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4MDAwMDA5LCJpYXQiOjE3NDc1NjgwMDksImp0aSI6ImYwMzJmMTBhY2Q2ZDQ0YTliNTY1OWQyYjM5ODM4ZjQ2IiwidXNlcl9pZCI6MjR9._X7HvE5I_-423jWElaK83K9QO-L1TxiKOl3GmYL1wpY";

// Decode JWT to extract user_id
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

// Convert image file to base64
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // remove "data:image/*;base64,"
    reader.onerror = (error) => reject(error);
  });
};

const AddTeamDetails = () => {
  const [players, setPlayers] = useState([
    { name: "", email: "", image: defaultImage },
  ]);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamLogoFile, setTeamLogoFile] = useState(null);
  const [status, setStatus] = useState("");
  const [captain, setCaptain] = useState({ name: "", email: "" });
const [viceCaptain, setViceCaptain] = useState({ name: "", email: "" });
 

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

  const handleSubmit = () => {
    setTeamModalOpen(true);
  };

  const handleTeamLogoChange = (e) => {
    const file = e.target.files[0];
    setTeamLogoFile(file);
    setTeamLogo(URL.createObjectURL(file));
  };

  const handleFinalSubmit = async () => {
  setStatus("Submitting team...");

  const userData = parseJwt(ACCESS_TOKEN);
  if (!userData || !userData.user_id) {
    setStatus("Error: Invalid token or user ID");
    return;
  }

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
    images: {
      url: base64Image,
    },
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
    owner: userData.user_id,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
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
    setTeamModalOpen(false);
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

      {/* Captain Card */}
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

{/* Vice Captain Card */}
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


      {/* Dynamic Player Cards */}
      {players.map((player, index) => (
        <div className="player-card" key={index}>
          <div className="icons-row">
            <span className="delete" onClick={() => handleDeletePlayer(index)}>&#128465;</span>
          </div>
          <div className="image-wrapper">
            <img src={player.image || defaultImage} alt="Player" className="player-img" />
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

    <button className="submit-btn" onClick={handleSubmit}>Save Team</button>
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
            <button className="save-btn" onClick={handleFinalSubmit}>Save</button>
            <button className="cancel-btn" onClick={() => setTeamModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default AddTeamDetails;
