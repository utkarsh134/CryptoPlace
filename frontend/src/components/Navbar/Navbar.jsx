import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinAndLoginContext } from "../../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { setCurrency } = useContext(CoinAndLoginContext);
  const { isLoggedIn, setIsLoggedIn, user, setUser } =
    useContext(CoinAndLoginContext); // Access auth context
  const navigate = useNavigate();

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", Symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", Symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      }
    }
  };
  useEffect(() => {}, [isLoggedIn, setIsLoggedIn, user, setUser]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/user/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUser(null); // Clear user state after logout
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/compare"}>
          <li>Compare</li>
        </Link>
        <li>News</li>
        <Link to={"/subscription"}>
          <li>Subscription</li>
        </Link>
        <Link to={"/contact"}>
          <li>Contact</li>
        </Link>
      </ul>
      <div className="nav-right">
        <select onChange={(e) => currencyHandler(e)}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <ul>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/user/signup">Create Account</Link>
              </li>
              <li>
                <Link to="/user/signin">Login</Link>
              </li>
            </>
          ) : (
            <>
              {/* <li>Welcome, {user && user.fullName}</li> */}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
