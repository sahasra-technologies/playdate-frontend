import React, { useState, useEffect } from "react";
import "./AddTeamDetails.css";
import Cookies from 'js-cookie';
import defaultImage from "../../../assets/Tournment/Profile-PNG-Images.png";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = "https://playdatesport.com/api/Tournament/teams/";

const AddTeamDetails = ({ setIsLoading }) => {
  const [players, setPlayers] = useState([{ name: "", role: "", email: "", image: defaultImage }]);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamLogoFile, setTeamLogoFile] = useState(null);
  const [status, setStatus] = useState("");
  const [captain, setCaptain] = useState({ name: "", email: "", role: "Captain" });
  const [viceCaptain, setViceCaptain] = useState({ name: "", email: "", role: "Vice Captain" });
  const [teamId, setTeamId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const navigate = useNavigate();

  const ACCESS_TOKEN = Cookies.get('access');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const userId = Cookies.get('userId');
        setIsLoading(true);
        const res = await fetch(`${API_URL}?id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        const data = await res.json();
        setIsLoading(false);

        if (data.length > 0) {
          const team = data[0];
          setTeamId(team.id);
          setTeamName(team.name);

          let logoPath = "";
          if (team.logo) {
            logoPath  = `http://127.0.0.1:8000${team.logo.startsWith('/') ? team.logo : '/' + team.logo}`;
            // setTeamLogo(fullLogoUrl);
            // setExistingImageUrl(fullLogoUrl);
          } else if (team.images && team.images.url) {
            logoPath = team.images.url; // Base64 image
          }

          if (logoPath) {
            setTeamLogo(logoPath);
            setExistingImageUrl(logoPath);
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
              role: player.role,
              email: player.email,
              image: defaultImage,
            }))
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("Failed to load team data");
        setIsLoading(false);
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
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (JPEG, PNG, etc.)");
      e.target.value = ""; // reset input
      return;
    }

    setTeamLogoFile(file);
    setTeamLogo(URL.createObjectURL(file));
  };


  const isValidEmail = (email) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleSubmit = () => {
    if (!captain.name || !captain.email) return toast.error("Captain details are required");
    if (!viceCaptain.name || !viceCaptain.email) return toast.error("Vice Captain details are required");
    if (captain.email === viceCaptain.email) return toast.error("Captain and Vice Captain emails must be different");
    setTeamModalOpen(true);
  };

  const handleFinalSubmit = async () => {
    setStatus("Submitting team...");
    if (!teamName) return toast.error("Team name is required");

    for (let i = 0; i < players.length; i++) {
      const { name, role, email } = players[i];
      if (!name || !role || !email) return setStatus(`Player ${i + 1} is missing fields`);
      if (!isValidEmail(email)) return setStatus(`Invalid email at Player ${i + 1}`);
    }

    const userId = Cookies.get('userId');
    const teamMembers = [
      { role: "Captain", name: captain.name, email: captain.email },
      { role: "Vice Captain", name: viceCaptain.name, email: viceCaptain.email },
      ...players.map((p) => ({ role: p.role, name: p.name, email: p.email })),
    ];

    const formData = new FormData();
    formData.append("name", teamName);
    formData.append("owner", userId);
    formData.append("team", JSON.stringify(teamMembers));
    if (teamLogoFile) {
      formData.append("logo", teamLogoFile);
    }
    if (teamId) {
      formData.append("id", teamId);
    }
    const method = teamId ? "PUT" : "POST";

    try {
      setIsLoading(true);
      const res = await fetch(API_URL, {
        method: method,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: formData,
      });

      const result = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        throw new Error(`Submission failed: ${JSON.stringify(result)}`);
      }

      setStatus("Team submitted successfully!");
      toast.success("Team submitted successfully!");
      setTeamModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error(err);
      setStatus("Error submitting team");
      setIsLoading(false);
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
          <input type="text" placeholder="Enter Name" value={captain.name} onChange={(e) => setCaptain({ ...captain, name: e.target.value })} />
          <input
            type="email"
            placeholder="Enter Email"
            value={captain.email}
            onChange={(e) => setCaptain({ ...captain, email: e.target.value })}
            className={captain.email && !isValidEmail(captain.email) ? "invalid-email" : ""}
          />
          {captain.email && !isValidEmail(captain.email) && <span className="error-text">Invalid email</span>}
        </div>

        <div className="player-card">
          <div className="image-wrapper">
            <img src={defaultImage} alt="Vice Captain" className="player-img" />
          </div>
          <div className="role-label">Vice Captain</div>
          <input type="text" placeholder="Enter Name" value={viceCaptain.name} onChange={(e) => setViceCaptain({ ...viceCaptain, name: e.target.value })} />
          <input
            type="email"
            placeholder="Enter Email"
            value={viceCaptain.email}
            onChange={(e) => setViceCaptain({ ...viceCaptain, email: e.target.value })}
            className={viceCaptain.email && !isValidEmail(viceCaptain.email) ? "invalid-email" : ""}
          />
          {viceCaptain.email && !isValidEmail(viceCaptain.email) && <span className="error-text">Invalid email</span>}
        </div>

        {players.map((player, index) => (
          <div className="player-card" key={index}>
            <div className="icons-row">
              <span className="delete" onClick={() => handleDeletePlayer(index)}>&#128465;</span>
            </div>
            <div className="image-wrapper">
              <img src={defaultImage} alt="Player" className="player-img" />
            </div>
            <input type="text" placeholder="Enter Name" value={player.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
            <input type="text" placeholder="Enter Role" value={player.role} onChange={(e) => handleChange(index, "role", e.target.value)} />
            <input
              type="email"
              placeholder="Enter Email"
              value={player.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
              className={player.email && !isValidEmail(player.email) ? "invalid-email" : ""}
            />
            {player.email && !isValidEmail(player.email) && <span className="error-text">Invalid email</span>}
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>{teamId ? "Update Team" : "Save Team"}</button>
      {status && <p className="status-text">{status}</p>}

      {teamModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Enter Team Details</h3>
            <input type="text" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleTeamLogoChange} />
            {teamLogo && <img src={teamLogo} alt="Team Logo" className="team-logo-preview" />}
            {!teamLogo && existingImageUrl && <img src={existingImageUrl} alt="Team Logo" className="team-logo-preview" />}
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
