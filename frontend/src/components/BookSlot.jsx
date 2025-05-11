import React, { useState } from "react";
import "./BookSlot.css";
import { FaTimes, FaCalendarAlt, FaArrowRight, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import sport from "../assets/sports.png";
import coupon from "../assets/coupon.png";
import maps from "../assets/maps.png";
import { FaChevronDown } from "react-icons/fa6";

const BookSlot = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bookslot-container">
      <div className="top-bar">
        <span className="time">🕒 11:45 AM</span>
        <span className="date">📅 15/05/2023</span>
      </div>

      <p className="token-number">
        Token No : <strong>5</strong>
      </p>

      <div className="booking-card">
        <div className="left-section">
          <div className="mainSection">
            <div className="imgSection">
              <img src={sport} alt="Cricket slot" className="game-image" />
            </div>
            <div className="Details">
              <div className="info-text">
                <h2 className="ground-name">Kranthi Den</h2>
                <p className="game-type">Box cricket</p>
                <p className="location">B.N Reddy, Hyderabad, Telangana</p>
              </div>

              <div className="action-row">
                <button className="cancel-btn">
                  <FaTimes /> Cancel Booking
                </button>
                <button className="reschedule-btn">
                  <FaCalendarAlt /> Reschedule Booking
                </button>
              </div>

              <div className="coupon-row">
                <div className="coupon-icon-wrapper">
                  <img src={coupon} alt="coupon" className="coupon-image" />
                </div>
                <input type="text" placeholder="Enter Coupon Code" />
                <button className="apply-btn">
                  <FaArrowRight />
                </button>
              </div>
              
            </div>
          </div>

          <div className="payment-row">
            <p>Total amount</p>
            <h3>₹ 750</h3>
            <button className="pay-btn" onClick={() => setShowModal(true)}>
              Pay Online
            </button>
          </div>
        </div>

        <div className="right-section">
          <img src={maps} alt="Map" className="map-image" />
          <div className="map-details">
            <h4>B.N Reddy, Telangana, Hyderabad</h4>
            <p>
              Building No-690, Redsea Tower, Kunnathur, Sasthamkotta, Kollam,
              Kerala, 690521
            </p>
          </div>
        </div>
      </div>

      <div className="terms">
        <p style={{ fontSize: 18, fontWeight: "bold" }}>
          Terms and Conditions{" "}
          <span>
            <FaChevronDown />
          </span>
        </p>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">
              <FaCheck size={36} color="white" />
            </div>
            <h2>Congratulations!</h2>
            <p>Your Box Cricket at Kranthi den</p>
            <p>has been booked at 10:00am to 12:00pm.</p>
            <button
              className="done-btn"
              onClick={() => {
                setShowModal(false);
                navigate("/photosandreviews");
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSlot;
