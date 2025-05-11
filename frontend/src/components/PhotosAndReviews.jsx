import React, { useState } from "react";
import "./PhotosAndReviews.css";
import { FaStar } from "react-icons/fa";

const PhotosAndReviews = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="reviews-container">
      {/* Rating Section */}
      <div className="review-box">
        <h3>Add Rating</h3>
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            const current = index + 1;
            return (
              <FaStar
                key={current}
                size={30}
                color={current <= (hover || rating) ? "#2661d3" : "#ccc"}
                onMouseEnter={() => setHover(current)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(current)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </div>
        <button className="submit-btn">Submit</button>
      </div>

      {/* Review Section */}
      <div className="review-box">
        <h3>
          Add Review <span className="optional">(Optional)</span>
        </h3>
        <textarea
          rows={4}
          placeholder="Write your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default PhotosAndReviews;
