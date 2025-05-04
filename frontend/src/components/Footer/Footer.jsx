import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">

  {/* Footer bottom content: text + icons */}
  <div className="footer-bottom">
    <span className="footer-text">
      © 2024 Playdate. All Rights Reserved. | Developed by <strong>Sahasra</strong>
    </span>
  </div>
    <div className="footer-icons">
      <a href="#facebook" aria-label="Facebook">
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
          alt="Facebook"
          className='icons'
        />
      </a>
      <a href="#twitter" aria-label="Twitter">
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
          alt="Twitter"
          className='icons'
        />
      </a>
      <a href="#instagram" aria-label="Instagram">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
          alt="Instagram"
          className='icons'
        />
      </a>
    </div>
    
</footer>

  );
};

export default Footer;
