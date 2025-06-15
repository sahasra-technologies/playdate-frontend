// src/pages/RegistrationForm .jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import './VenueDetails'; // reuse same CSS as modal

const RegistrationForm  = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { game } = useGame();
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const { tournamentName, price, status } = location.state || {};
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    tournament: tournamentName || game.name || '',
    team: '',
    email: Cookies.get('email') || '',
    price: price || ''
  });

  const isGuest = !Cookies.get('access');

  useEffect(() => {
    if (status === 'Completed' || status === 'Scheduled') {
      return navigate(-1);
    }

    const fetchTeams = async () => {
      try {
        const token = Cookies.get('access');
        const userId = Cookies.get('userId');
        const response = await axios.get(
          'https://playdatesport.com/api/Tournament/teams/',
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: userId }
          }
        );
        const teamNames = response.data.map(i => i.team);
        setTeams(teamNames);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeams();
  }, [navigate, status]);

  const handlePayment = async () => {
  const user = Cookies.get("access");


  const payload = {
    tournamentId: game.id,
    amount: Number(formData.price),
    currency: "INR",
    user: formData.email,
    teamId: '',
    
  };
  

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
    
    if (orderResponse.ok){
      window.location.href = data.upi_link;
    }

    if (!orderResponse.ok) {
      console.error("Order creation failed:", data);
      notification.error({
        message: "Order Failed",
        description: data?.error || "Unable to create order.",
      });
      return;
    }

     
    // const razorpayOrderId = data.order_id;
    console.log(data) 

    notification.success({ message: "Success", description: "Payment initiated!" });
    
    // initiatePayment(razorpayOrderId, data.amount, formData.email);
    
  } catch (error) {
    console.error("Error creating order:", error);
    notification.error({
      message: "Order Failed",
      description: "Unable to create order.",
    });
  }
};

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      tournamentId: game.id,
      amount: Number(formData.price),
      currency: 'INR',
      user: formData.email,
      teamId: formData.team
    };

    try {
      const resp = await axios.post(
        'https://playdatesport.com/api/payments/orders/',
        payload,
        { headers: { 'X-CSRFTOKEN': Cookies.get('access') } }
      );
      if (resp.data.upi_link) {
        window.location.href = resp.data.upi_link;
      }
    } catch (err) {
      console.error(err);
      alert("Error creating order. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-form" onClick={(e) => e.stopPropagation()}>
            <h2 className="form-title">Registration Form</h2>

            <div className="form-group">
              <label>Tournament</label>
              <input
                type="text"
                value={formData.tournament}
                readOnly
                placeholder="e.g. JAGGAHUNDA MARATHON"
                className='inout-form-payment'
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
                className={`inout-form-payments ${!isGuest ? 'disabled-input' : ''}`}
                disabled={!isGuest} 
              />
            </div>

            <div className="form-group">
              <label>Team</label>
              <select
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                >
                  <option value="">Select Team</option>
                  {teams.map((team, index) => (
                    <option key={index} value={team}>{team}</option>
                  ))}
               </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                value={formData.price}
                className='inout-form-payment'
                readOnly
              />
            </div>
           <div className="form-btn-wrap">
          <button className="submit-btn" onClick={(e) => {
                  e.preventDefault(); 
                  handlePayment();
                }}>
                  Book Slot
          </button>
            </div>
           
          </div>
        </div>
  );
};

export default RegistrationForm;
