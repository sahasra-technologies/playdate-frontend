import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SlotTimings.css";
import { useLocation, useNavigate } from "react-router-dom";

const SlotTimings = () => {
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const slots = [
    {
      label: "MID NIGHT",
      icon: "🌙",
      times: ["12:00 - 01:00 AM"],
    },
    {
      label: "Early Morning",
      icon: "🌅",
      times: [
        "01:00 - 02:00 AM",
        "02:00 - 03:00 AM",
        "03:00 - 04:00 AM",
        "04:00 - 05:00 AM",
        "05:00 - 06:00 AM",
      ],
    },
    {
      label: "Morning",
      icon: "☀️",
      times: [
        "05:00 - 06:00 AM",
        "07:00 - 08:00 AM",
        "08:00 - 09:00 AM",
        "09:00 - 10:00 AM",
        "10:00 - 11:00 AM",
      ],
    },
    {
      label: "Noon",
      icon: "🕛",
      times: ["12:00 - 01:00 PM"],
    },
    {
      label: "Afternoon",
      icon: "🌤️",
      times: ["01:00 - 02:00 PM", "02:00 - 03:00 PM", "03:00 - 04:00 PM"],
    },
    {
      label: "Evening",
      icon: "🌇",
      times: ["04:00 - 05:00 PM", "05:00 - 06:00 PM", "06:00 - 07:00 PM"],
    },
    {
      label: "Night",
      icon: "🌙",
      times: [
        "07:00 - 08:00 PM",
        "08:00 - 09:00 PM",
        "09:00 - 10:00 PM",
        "10:00 - 11:00 PM",
        "11:00 - 12:00 PM",
      ],
    },
  ];

  return (
    <div className="slot-wrapper">
      <div className="calendar-section">
        <h1 className="title">Select Date</h1>
        <Calendar onChange={setDate} value={date} />
      </div>

      <div className="slots-section">
        <div className="horizontal-dates">
          {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
            const day = new Date(date);
            day.setDate(date.getDate() + offset);
            const weekday = day.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const dayNum = day.getDate();
            return (
              <div
                key={offset}
                className={`date-card ${offset === 1 ? "active" : ""}`}
              >
                <p className="month">June</p>
                <p className="weekday">{weekday}</p>
                <p className="day">{dayNum}</p>
              </div>
            );
          })}
        </div>

        {slots.map((slot, i) => (
          <div key={i} className="slot-group">
            <div className="slot-label">
              <span className="slot-icon">{slot.icon}</span>
              {slot.label}
            </div>
            <div className="slot-buttons">
              {slot.times.map((time, idx) => (
                <button
                  key={idx}
                  className={`slot-btn ${
                    selectedSlot === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSlot(time)}
                >
                  <div>{time}</div>
                  <div>₹1000</div>
                </button>
              ))}
            </div>
          </div>
        ))}
        <button className="next-btn" onClick={() => navigate("/book-slot")}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SlotTimings;
