import React from "react";
import "./SubscriptionPage.css";
import { loadStripe } from "@stripe/stripe-js";

const SubscriptionPage = () => {
  const plans = [
    {
      title: "Basic Plan (1 RS)",
      price: 1,
      duration: "1 Year",
      offers: [
        "Access to top 10 cryptocurrencies",
        "Basic Comparison Tools",
        "Email Notifications",
        "Basic Charting Tools:",
      ],
    },
    {
      title: "Advanced Plan (3 RS)",
      price: 3,
      duration: "3 Year",
      offers: [
        "Access to top 50 cryptocurrencies",
        "Advanced Comparison Tools",
        "Real-Time Price Alerts",
        "Portfolio Tracking",
        "Access to News Section",
        "Priority Support",
      ],
    },
    {
      title: "Pro Plan (5 RS)",
      price: 5,
      duration: "5 Year",
      offers: [
        "Unlimited Access to All Cryptocurrencies",
        "Advanced Charting Tools",
        "Multi-Coin Comparison",
        "Real-Time Trading Insights",
        "Unlimited Portfolio Tracking",
        "VIP Support",
        "Exclusive Content",
      ],
    },
  ];

  const makePayment = async (title, price, offers, duration) => {
    const stripe = await loadStripe("kshkhgkhgkhg"); // Use Stripe Publish key here
    const body = {
      title,
      price,
      duration,
      offers,
    };

    const header = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${apiURL}/create-checkout-session`, {
      method: "POST",
      header: header,
      body: JSON.stringify(body),
    });

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.lof(result.error);
    }
  };

  return (
    <div className="subscription-page">
      <h1 className="payment-heading">Choose Your Subscription Plan</h1>
      <div className="card-container">
        {plans.map((plan, index) => (
          <PaymentCard
            key={index}
            title={plan.title}
            duration={plan.duration}
            offers={plan.offers}
            price={plan.price}
          />
        ))}
      </div>
    </div>
  );
};

const PaymentCard = ({ title, price, duration, offers }) => (
  <div className="payment-card">
    <h2 className="card-title">{title}</h2>
    <p className="card-duration">{duration}</p>
    <ul>
      {offers.map((offer) => (
        <li key={offer} className="card-offer">
          {offer}
        </li>
      ))}
    </ul>
    <button
      className="select-plan-btn"
      onClick={(e) => makePayment(title, price, offers, duration)}
    >{`Pay RS${price} `}</button>
  </div>
);

export default SubscriptionPage;
