import React, { useState, useEffect } from "react";
import "./contact.css";
import axios from "axios";
import { server } from "../../main";

const Contact = ({ isAuth, user }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuth) {
      setEmail(user.email);
    } else {
      setEmail("user@example.com");
    }
  }, [isAuth, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    if (!isAuth) {
      setError("Please log in to submit your message.");
      return; // Prevent form submission if the user is not logged in
    }

    const myForm = { email, name, subject, message };

    try {
      const response = await axios.post(`${server}/api/contactus`, myForm);
      if (response.status === 200) {
        setSuccess("Message sent successfully");
        setBtnLoading(false);
        // setEmail("");
        setName("");
        setSubject("");
        setMessage("");
      } else {
        setError("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Contact Us</h2>

        {/* Show error or success messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Form */}
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            // The email field is read-only now, so we disable it
            onChange={(e) => setEmail(e.target.value)} // Optional: You can leave this out since it's read-only
            disabled
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            placeholder="Write your message here..."
            required
            className="common-textarea"
          ></textarea>

          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
