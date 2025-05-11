import React from "react";
import "./BookingsInfoPage.css";
import { FaLocationArrow } from "react-icons/fa";
import sport from "../assets/sports.png";
import { useLocation, useNavigate } from "react-router-dom";

const BookingsInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ground } = location.state;
  return (
    <div className="info-body">
      <div className="info-container">
        <div className="info-top">
          <p className="info-directions-text">Get Directions</p>
          <button
            className="info-directions-button"
            aria-label="Get Directions"
          >
            <FaLocationArrow className="info-location-icon" />
          </button>
        </div>

        <div className="info-image-wrapper">
          <div>
            <img
              src={sport}
              alt="Cricket bat, ball and stumps on a small patch of green grass"
              className="info-image"
            />
          </div>
          <div>
            <h1 className="info-title">{ground.groundName}</h1>
            <h2 className="info-subtitle">{ground.game}</h2>
          </div>
        </div>

        <section className="info-section">
          <h3 className="info-section-title">About Box</h3>
          <p className="info-section-content">
            Box cricket is a fast-paced, indoor version of cricket played in a
            smaller, enclosed area with modified rules. It's popular for its
            quick matches, making it perfect for casual games and tournaments in
            urban settings.
            <a href="#" className="info-link">
              {" "}
              view more
            </a>
          </p>
        </section>

        <section className="info-section">
          <h3 className="info-section-title">Open Time</h3>
          <p className="info-section-content">
            Monday-Sunday, 08.00 AM-18.00 PM
          </p>
        </section>

        <section className="info-section">
          <h3 className="info-section-title">Amenities</h3>
          <p className="info-section-content">
            Box cricket is a fast-paced, indoor version of cricket played in a
            smaller, enclosed area with modified rules. It's popular for its
            quick matches, making it perfect for casual games and tournaments in
            urban settings.
            <a href="#" className="info-link">
              {" "}
              view more
            </a>
          </p>
        </section>

        <button
          type="button"
          className="info-book-button"
          onClick={() => navigate("/slot-timings")}
        >
          Book Slot
        </button>
      </div>
    </div>
  );
};

export default BookingsInfoPage;
