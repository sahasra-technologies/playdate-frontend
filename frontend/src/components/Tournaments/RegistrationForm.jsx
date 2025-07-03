import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import './VenueDetails';
import { toast } from 'react-toastify';

const RegistrationForm = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { game } = useGame();
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const { tournamentId, tournamentName, price, status } = location.state || {};

  const [teams, setTeams] = useState([]);

  const [formData, setFormData] = useState({
    tournament:
      typeof tournamentName === 'string'
        ? tournamentName
        : typeof game?.name === 'string'
          ? game.name
          : '',
    team: '',
    email: Cookies.get('email') || '',
    price: price || '',
    selectedPrice: Array.isArray(price) ? price[0] : '',
  });

  const isGuest = !Cookies.get('access');

  useEffect(() => {
    if (status === 'Completed' || status === 'Scheduled') {
      navigate(-1);
      return;
    }

    const fetchTeams = async () => {
      try {
        const token = Cookies.get('access');
        const userId = Cookies.get('userId');
        const response = await axios.get(
          'https://playdatesport.com/api/Tournament/teams/',
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: userId },
          }
        );

        console.log("Teams API response:", response.data);

        // Map to array of objects with id and name
        // const teamNames = response.data.map((i) => ({
        //   id: i.team.id,
        //   name: i.team.name,
        // }));

        setTeams(response.data);
      } catch (err) {
        console.error("Error fetching teams:", err);
        // toast.error("Failed to fetch teams.");
      }
    };

    fetchTeams();
  }, [navigate, status]);
  console.log("teams", teams)

  const validateForm = () => {
    if (!formData.email || formData.email.trim() === '') {
      toast.error("Email is required.");
      return false;
    }
    return true;
  };

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handlePayment = async () => {
    const user = Cookies.get("access");
    let effectivePrice = formData.selectedPrice || formData.price;

    if (!effectivePrice || isNaN(Number(effectivePrice))) {
      toast.error("Invalid or missing price. Please select a valid amount.");
      return;
    }
    effectivePrice = Number(effectivePrice);

    const payload = {
      tournamentId: game?.id || tournamentId,
      amount: effectivePrice,
      currency: "INR",
      user: formData.email,
      teamId: formData.team,
    };

    setIsLoading?.(true);

    try {
      const orderResponse = await fetch("https://playdatesport.com/api/payments/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": user,
        },
        body: JSON.stringify(payload),
      });

      const data = await orderResponse.json();
      setIsLoading?.(false);

      if (orderResponse.ok) {
        if (isMobileDevice()) {
          window.location.href = data.upi_link;
        } else {
          toast.info("UPI payment requires a mobile device with a UPI app installed.");
          console.log("UPI Link:", data.upi_link);
        }
        return;
      }

      console.error("Order creation failed:", data);
      toast.error(data?.error || "Unable to create order.");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Unable to create order.");
      setIsLoading?.(false);
    }
  };

  console.log("team", teams)
  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal-form" onClick={(e) => e.stopPropagation()}>
        <h2 className="form-title">Registration Form</h2>

        <div className="form-group">
          <label>Tournament</label>
          <input
            type="text"
            value={formData.tournament}
            readOnly
            placeholder="e.g. JAGGAHUNDA MARATHON"
            className="inout-form-payment"
            disabled
          />
        </div>

        <div className="form-group">
          <label>Mail ID</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter your mail ID"
            className={`inout-form-payment ${!isGuest ? 'disabled-input' : ''}`}
            disabled={!isGuest}
          />
        </div>

        <div className="form-group">
          <label>Team</label>
          <select
            value={formData.team}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, team: e.target.value }))
            }
            className="inout-form-payment"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price</label>
          {Array.isArray(formData.price) ? (
            <select
              className="inout-form-payment"
              value={formData.selectedPrice}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, selectedPrice: e.target.value }))
              }
            >
              {formData.price.map((price, index) => (
                <option key={index} value={price}>
                  ₹{price}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={formData.price}
              className="inout-form-payment"
              readOnly
            />
          )}
        </div>

        <div className="form-btn-wrap">
          <button
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              if (!validateForm()) return;
              handlePayment();
            }}
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
