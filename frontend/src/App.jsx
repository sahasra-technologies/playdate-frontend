import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingsFlow from "./components/BookingsFlow";
import BookingsInfoPage from "./components/BookingsInfoPage";
import SlotTimings from "./components/SlotTimings";
import BookSlot from "./components/BookSlot";
import PhotosAndReviews from "./components/PhotosAndReviews";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BookingsFlow />} />
          <Route path="/booking-info" element={<BookingsInfoPage />} />
          <Route path="/slot-timings" element={<SlotTimings />} />
          <Route path="/book-slot" element={<BookSlot />} />
          <Route path="/photosandreviews" element={<PhotosAndReviews />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
