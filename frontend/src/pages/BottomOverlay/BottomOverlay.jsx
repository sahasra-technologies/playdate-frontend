import React, { useState } from "react";
import "./BottomOverlay.css";

const dummySubTables = {
  Venues: {
    heading: "Venues Loading...",
    columns: [],
    data: [],
  },
  Rivalry: {
    heading: "Rivalry Loading...",
    columns: [],
    data: [],
  },
  Tournaments: {
    heading: "Popular Tournaments",
    columns: ["Sport", "Location", "Entry Price", "Date", "Overs", "Time"],
    data: [
      {
        Sport: "Box Cricket",
        Location: "B.N Reddy",
        "Entry Price": "₹750",
        Date: "12 May",
        Overs: "4 Overs",
        Time: "7:30 PM",
      },
    ],
  },
  "Play With Friends": {
    heading: "Friends List Loading...",
    columns: [],
    data: [],
  },
  "Your Bookings": {
    heading: "Bookings Loading...",
    columns: [],
    data: [],
  },
};

const tabs = Object.keys(dummySubTables);

const BottomOverlay = () => {
  const [activeTab, setActiveTab] = useState("Tournaments");
  const subTable = dummySubTables[activeTab];

  return (
    <div className="bottom-overlay">
      <div className="tab-bar">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="sub-table-section">
        <h2 className="sub-table-heading">{subTable.heading}</h2>

        {subTable.columns.length > 0 && subTable.data.length > 0 ? (
          <div className="table-wrapper">
            <table className="sub-table">
              <thead>
                <tr>
                  {subTable.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subTable.data.map((row, index) => (
                  <tr key={index}>
                    {subTable.columns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                    <td>
                      <button className="book-btn">Book Slot</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-message">No data available yet.</p>
        )}

        <div className="see-all-wrapper">
          <button className="see-all-btn">See All Sports</button>
        </div>
      </div>
    </div>
  );
};

export default BottomOverlay;
