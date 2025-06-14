import React, { useState } from "react";
import "./ContactUs.css";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setStatus("Submitting...");
    console.log(formData)

    try {
      const response = await fetch("https://playdatesport.com/api/User/contact-us/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        console.log("Failed to send message. Please try again.")
        // setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      // setStatus("Error sending message.");
      console.log("Error sending message.")
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        {/* <nav>
          <span>Home</span> <span className="separator">&gt;</span> <span>Contact Us</span>
        </nav> */}
      </div>

      <div className="contact-container">
        <div className="contact-header">
          <p className="contact-subtitle">Contact Us</p>
          <h2>Get In Touch</h2>
          {/* <p className="contact-description">
            IT Solution is a broad category that encompasses various technological solutions
          </p> */}
        </div>

        <div className="contact-box">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message here.."
              rows="5"
              required
            />
            <button type="submit">SUBMIT NOW →</button>
            <p className="status-message">{status}</p>
          </form>

          <div className="contact-info">
            <div className="info-item">
              <span className="icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>contact@palydatesport.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <strong>Phone</strong>
                <p>9618387894</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <strong>Location</strong>
                <p>Uppal , Hyderabad, Telangana-500039</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
