import React, { useState } from "react";
import axios from "axios"; // Importing axios
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HandleSubmit");

    try {
      console.log("Signup is Starting");
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        formData
      );
      console.log("Signup is Done");
      console.log("Signup Success:", response.data);
      navigate("/user/signin") ;

      // Example: redirect to the login page after successful signup
      // window.location.href = '/login'; // Redirect after signup
    } catch (error) {
      console.log("Error: ", error) ;
      setErrorMessage(error.message || "Something went wrong");
      console.error("Signup Error:", errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>

        <div className="switch-container">
          <p>
            Already registered?{"  "}
            <a href="/user/login" className="switch-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
