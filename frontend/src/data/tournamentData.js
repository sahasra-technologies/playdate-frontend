
import img1 from "../assets/Tournment/img1.png";
import img2 from "../assets/Tournment/img2.png";
import img3 from "../assets/Tournment/img3.png";
import img4 from "../assets/Tournment/img4.png";

import venue1a from "../assets/Venues/venue1a.png";
import venue1b from "../assets/Venues/venue1a.png";



const tournamentData = [
    {
      id: 1,
      name: "Game 1",
      image: img1,
      venueDetails: {
        description: "Venue 1 description...",
        images: [venue1a, venue1b]
      },
      matchSchedule: [
        { date: "2025-05-01", match: "Team A vs Team B" },
        { date: "2025-05-02", match: "Team C vs Team D" }
      ],
      rules: [
        "No cheating allowed.",
        "Each team must have 5 players.",
        "Follow the referee’s instructions."
      ]
    },
    {
      id: 2,
      name: "Game 2",
      image: img2,
      venueDetails: {
        description: "Venue 2 description...",
        images: [venue1a, venue1b]
      },
      matchSchedule: [
        { date: "2025-05-01", match: "Team A vs Team B" },
        { date: "2025-05-02", match: "Team C vs Team D" }
      ],
      rules: [
        "No cheating allowed.",
        "Each team must have 5 players.",
        "Follow the referee’s instructions."
      ]
    },
    {
      id: 3,
      name: "Game 3",
      image: img3,
      venueDetails: {
        description: "Venue 3 description...",
        images: [venue1a, venue1b]
      },
      matchSchedule: [
        { date: "2025-05-01", match: "Team A vs Team B" },
        { date: "2025-05-02", match: "Team C vs Team D" }
      ],
      rules: [
        "No cheating allowed.",
        "Each team must have 5 players.",
        "Follow the referee’s instructions."
      ]
    },
    {
      id: 4,
      name: "Game 4",
      image: img4,
      venueDetails: {
        description: "Venue 4 description...",
        images: [venue1a, venue1b]
      },
      matchSchedule: [
        { date: "2025-05-01", match: "Team A vs Team B" },
        { date: "2025-05-02", match: "Team C vs Team D" }
      ],
      rules: [
        "No cheating allowed.",
        "Each team must have 5 players.",
        "Follow the referee’s instructions."
      ]
    }
  ];
  
  export default tournamentData;
  