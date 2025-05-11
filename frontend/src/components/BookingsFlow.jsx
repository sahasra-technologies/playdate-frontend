import React from "react";
import "./BookingsFlow.css";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { LuMoveUpRight } from "react-icons/lu";
import sport from "../assets/sports.png";
import { useNavigate } from "react-router-dom";

const BookingsFlow = () => {
  const [grounds, setGrounds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://api.myjson.online/v1/records/0e98d38b-42f6-4436-8226-26ad55bd6e46"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGrounds(data.data); // 🚨 notice 'data.data' because this API structure has your JSON inside 'data'
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleBook = (ground) => {
    navigate('/booking-info', { state: { ground } }); // Pass the ground details to the next page
  };

  return (
    <>
      <div className="playgroundsContainer">
        {grounds.map((ground) => (
          <div className="bookingsContainer" key={ground.id}>
            <div className="firstpart">
              <div className="ratingpart">
                <FaStar className="staricon" />
                <p className="starnumber">{ground.ratings}</p>
              </div>
              <div className="imagesportbox">
                <img src={sport} alt="sports" className="sportimage" />
              </div>
            </div>
            <div className="secondpart">
              <h2 className="headingsports">{ground.groundName}</h2>
              <p className="sportname">{ground.game}</p>
              <p className="ageplayers">{ground.ageGroup}</p>
              <p className="location">{ground.address}</p>
              <p className="entryfees">Entry Fee ₹{ground.entryFees}</p>
              <button className="buttonbook" onClick={()=>handleBook(ground)}>
                <span className="booktext">Book</span>{" "}
                <LuMoveUpRight color="#000" size={20} className="iconupright" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingsFlow;
