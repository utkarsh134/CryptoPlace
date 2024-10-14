import React, { useState } from "react";
import axios from "axios";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    organization: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Organization: ${formData.organization}\nDescription: ${formData.description}`;

    // Replace with your actual Telegram Bot token and chat ID
    const botToken = `${process.env.BOT_TOKEN}`;
    const chatId = `${process.env.CHAT_ID}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      message
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          alert("Your message has been sent!");
          setFormData({
            organization: "",
            description: "",
          });
        } else {
          alert("Failed to send the message. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Error sending message.");
      });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-heading">Contact Us</h1>
      <p className="contact-description">
        If you have any queries or business proposals, feel free to reach out to
        us!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="organization">Organization Name</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
