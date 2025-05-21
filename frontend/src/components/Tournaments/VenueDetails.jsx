import React, { useContext, useState, useEffect } from 'react';
import './VenueDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import { Navigation, ArrowLeft, Cookie } from 'lucide-react';
import gameImg from '../../assets/Venues/gamelogo.png';
//import {Orders, UpdateTrans, GetBookings} from '../../api/service';
import Cookies from 'js-cookie'; 
import axios from 'axios';
import { notification } from 'antd';
import TournamentRules from '../Tournaments/TournamentRules';



const API_URL = 'http://157.173.195.249:8000/Tournament/teams/';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { ground, game } = useGame();

  const user = true;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tournament: game?.ground?.[0]?.name || '',
    email: '',
    team: '',
    price: game?.ground?.[0]?.pricing?.[0]?.times?.[0]?.price || '',
  });

  const [tournamentName, setTournamentName] = useState('');
  const [teams, setTeams] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


 
  
    useEffect(()=>{
      const useEmail = Cookies.get('email')
        if(useEmail){
          setFormData((prev) => ({ ...prev, email: useEmail }))
          setIsAuthenticated(true)
        }
      
    },[])

 useEffect(() => {
  const fetchTeams = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

   const token = Cookies.get('access');
   const userId = Cookies.get('userId')
  
    try {
      const response = await axios.get(API_URL, { 
        params: { id: userId },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      const data = response.data; 
      console.log(data, "fetched tournament data");

      const teamsData = data.map(item => item.team);
      setTeams(teamsData);

    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  fetchTeams();
}, [user, navigate]);

 console.log(game,"gamedeatils")


  useEffect(() => {
    if (game?.id && game?.name) {
      setFormData(prev => ({ ...prev, tournament: game.name }));
      setTournamentName(game.name);
    }
  }, [game]);

  const handleBack = () => navigate(-1);

  const handleBooking = () => {
    if (user) {
      setShowForm(true);
    } else {
      alert('⚠️ Please log in to book a slot.');
      navigate('/login');
    }
  };

  

  if (!ground) return <p className="error-msg">❌ No venue data found.</p>;

  const location = ground.location || game?.address || 'N/A';
  const mainImage = game?.images?.[0]?.url || gameImg;   




  //payment

useEffect(() => {
  if (!document.getElementById('razorpay-script')) {
    const script = document.createElement("script");
    script.id = 'razorpay-script';
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }
}, []);

//payment

const updateTransactionStatus = async (paymentId, status, message, orderId, signature) => {
  const user = Cookies.get("access");

  try {
    const response = await fetch("http://157.173.195.249:8000/payments/order/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": user,
      },
      body: JSON.stringify({
        payment_id: paymentId,
        status: status,
        message: message,
        order_id: orderId,
        signature: signature,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to update transaction:", result);
    } else {
      console.log("Transaction updated successfully:", result);
    }
  } catch (err) {
    console.error("Error updating transaction:", err);
  }
};

const handlePayment = async () => {
  const user = Cookies.get("access");

  if (!user) {
    setShowEmailPopup(true);
    return;
  }

  const payload = {
    tournamentId: game.id,
    amount: Number(formData.price),
    currency: "INR",
    user: formData.email,
    teamId: '',
  };

  try {
    const orderResponse = await fetch("http://157.173.195.249:8000/payments/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": user,
      },
      body: JSON.stringify(payload),
    });

    const data = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error("Order creation failed:", data);
      notification.error({
        message: "Order Failed",
        description: data?.error || "Unable to create order.",
      });
      return;
    }

    notification.success({ message: "Success", description: "Payment initiated!" });
    initiatePayment(data.id, data.amount, formData.email);
  } catch (error) {
    console.error("Error creating order:", error);
    notification.error({
      message: "Order Failed",
      description: "Unable to create order.",
    });
  }
};

const initiatePayment = (orderId, amount, userEmail) => {
  const user = Cookies.get("access");

  const options = {
    key: "rzp_test_JvXFkNCRf4a6j0",
    name: "Test Company",
    description: "Test Transaction",
    order_id: orderId,
    amount: amount,
    currency: "INR",
    handler: async (response) => {
      notification.success({
        message: "Payment Successful",
        description: "Your booking is confirmed!",
      });

      await updateTransactionStatus(
        response.razorpay_payment_id,
        "SUCCESS",
        "Payment successful",
        orderId,
        response.razorpay_signature
      );
    },
    prefill: { email: userEmail || "guest@example.com" },
    theme: { color: "#F37254" },
  };

  const razorpay = new Razorpay(options);
  razorpay.open();

  razorpay.on("payment.failed", async (response) => {
    notification.error({
      message: "Payment Failed",
      description: "Unable to process payment.",
    });

    await updateTransactionStatus(
      response?.error?.metadata?.payment_id || '',
      "FAILED",
      response?.error?.description || "Payment failed",
      response?.error?.metadata?.order_id || '',
      response?.error?.metadata?.razorpay_signature || ''
    );
  });
};






  return (
    <div className='venue-container'>
    <div className={`venue-details-wrapper ${theme}`}>
      <button className="back-btn" onClick={handleBack}>
        <ArrowLeft size={22} /> Back
      </button>

      <div className="top-section">
        <img src={mainImage} alt="ground" className="main-img" />
        <div className="details-section">
          <div className="details-header">
            <div>
              <h1>{ground.ground_name}</h1>
              <p className="game-name">{ground.name || 'N/A'}</p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="get-directions"
            >
              Get Directions <Navigation size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>About</h2>
        <p>{ground.description || 'No description available.'}</p>
      </div>

      <div className="section">
        <h2>Slot Time</h2>
        {ground.maintenanceSchedule?.map((slot, idx) => (
          <div key={idx} className="maintance-schedule">
            <p>Days: {slot.days.join(', ')}</p>
            <p>Start: {slot.startTime}</p>
            <p>End: {slot.endTime}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Amenities</h2>
        <ul className="amenities-list">
          {ground.amenities?.map((a, i) => <li key={i}>{a},</li>)}
        </ul>
      </div>

      <div className="section"><h2>Location</h2><p>{ground.address || 'N/A'}</p></div>
      <div className="section"><h2>Ground Timings</h2><p>{ground.Created || 'N/A'}</p></div>

      {user && (
        <button className="book-button" onClick={handleBooking}>
          Book Slot
        </button>
      )}

      {showForm && (
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
                className='inout-form-payment'
                disabled={isAuthenticated} 
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

            <button className="submit-btn" onClick={(e) => {
              e.preventDefault(); 
              handlePayment();
            }}>
              Book Slot
            </button>
          </div>
        </div>
      )}
    </div>
    <div className='venue-details-wrapper'>
    <TournamentRules/>
    </div>
    </div>
  );
};

export default VenueDetails;




