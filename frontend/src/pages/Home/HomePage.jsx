import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HomePage.css";

import bg1 from "../../assets/images/bg1.jpg";
import bg2 from "../../assets/images/bg2.jpg";
import bg3 from "../../assets/images/bg3.jpg";
import bg4 from "../../assets/images/bg4.jpg";

import slide1 from "../../assets/images/bg1.jpg";
import slide2 from "../../assets/images/bg2.jpg";
import slide3 from "../../assets/images/bg3.jpg";
import slide4 from "../../assets/images/bg4.jpg";

const slides = [
  { id: 1, image: slide1, bg: bg1, title: "First Slide Title" },
  { id: 2, image: slide2, bg: bg2, title: "Second Slide Title" },
  { id: 3, image: slide3, bg: bg3, title: "Third Slide Title" },
  { id: 4, image: slide4, bg: bg4, title: "Fourth Slide Title" },
];

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const [randomIndex, setRandomIndex] = useState(1);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const generateRandomImage = () => {
    let random;
    do {
      random = Math.floor(Math.random() * slides.length);
    } while (random === index);
    setRandomIndex(random);
  };

  useEffect(() => {
    generateRandomImage();
  }, [index]);

  // ✅ Auto Slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 15000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${slides[randomIndex].bg})` }}
    >
      <div className="overlay" />

      <div className="content-wrapper">
        <div className="text-section">
          <h1>Welcome to Playdate</h1>
          <h2>Experience the best moments together</h2>
        </div>

        <div className="carousel-container">
          <div className="carousel-images">
            {/* Carousel Slide */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slides[index].id}
                className="slide-wrapper"
                initial={{ opacity: 0, scale: 1.1, x: 100, y: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -100, y: 50 }} // ✅ Removed zoom-out (scale)
                transition={{ duration: 2 }}
              >
                <img
                  src={slides[index].image}
                  alt={slides[index].title}
                  className="slide-image"
                />
                <div className="slide-title">{slides[index].title}</div>
              </motion.div>
            </AnimatePresence>

            {/* Side Random Small Slide */}
            <div className="random-slide-wrapper">
              <img
                src={slides[randomIndex].image}
                alt="Random Slide"
                className="random-slide-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="controllers">
        <button className="controller-button" onClick={prevSlide}>
          &lt;
        </button>
        <button className="controller-button" onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HomePage;
