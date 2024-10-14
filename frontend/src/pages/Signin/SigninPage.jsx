import React, { useContext, useState } from "react";
import axios from "axios"; // Importing axios
import "./SigninPage.css";
import { useNavigate } from "react-router-dom";
import { CoinAndLoginContext } from "../../context/ContextProvider";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn, setUser } = useContext(CoinAndLoginContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/user/signin",
        formData,
        { withCredentials: true }
      );
      console.log("Login Success:", response.data);
      // On successful login, update the auth context
      console.log("Before setIsLoggedIn")
      setIsLoggedIn(true);
      console.log("After setIsLoggedIn")
      // setUser(response.data.user); // Save user info in context
      navigate("/");

      // Example: store the token or redirect the user
      // localStorage.setItem('token', response.data.token);
      // window.location.href = '/dashboard'; // Redirect to another page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      console.error("Login Error:", errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <div className="switch-container">
          <p>
            Not registered yet?{" "}
            <a href="/user/signup" className="switch-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
