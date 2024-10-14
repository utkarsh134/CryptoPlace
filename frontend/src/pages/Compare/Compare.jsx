import React, { useState, useContext, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./Compare.css";
import MergedChart from "../../components/MergedChart/MergedChart";
import CompareSearch from "../../components/CompareSearch/CompareSearch";

const Compare = () => {
  // Destructure coin data from context
  const [historicalCoinData_1, setHistoricalCoinData_1] = useState();
  const [historicalCoinData_2, setHistoricalCoinData_2] = useState();
  const [displayChart, setDisplayChart] = useState(false);

  return (
    <div className="compare-page">
      <h2 className="title">Compare Coins</h2>
      <div className="input-container">
        <CompareSearch setHistoricalCoinData={setHistoricalCoinData_1} />
        <CompareSearch setHistoricalCoinData={setHistoricalCoinData_2} />
      </div>
      <p className="compare-msg">
        Please add both coins and wait for a few seconds.
      </p>
      {historicalCoinData_1 && historicalCoinData_2 && (
        <div className="dynamic-display">
          <button
            className="merge-button"
            onClick={() => setDisplayChart(true)}
          >
            Compare Coin
          </button>
          {displayChart && (
            <div className="coin-chart">
              <MergedChart
                historicalCoinData_1={historicalCoinData_1}
                historicalCoinData_2={historicalCoinData_2}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Compare;
