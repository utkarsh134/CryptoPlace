import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const MergedChart = ({ historicalCoinData_1, historicalCoinData_2 }) => {
  const [data, setData] = useState([["Date", "Price 1", "Price 2"]]);

  useEffect(() => {
    // Initialize the data array with headers for two price lines
    let dataCopy = [["Date", "Price 1", "Price 2"]];

    // Check if both datasets have prices and synchronize by date
    if (historicalCoinData_1.prices && historicalCoinData_2.prices) {
      // Create a merged array of dates and prices
      historicalCoinData_1.prices.forEach((item, index) => {
        const date = new Date(item[0]).toLocaleDateString().slice(0, -5);
        const price1 = item[1];
        const price2 = historicalCoinData_2.prices[index]?.[1] || 0; // Handle missing data in second dataset
        dataCopy.push([date, price1, price2]);
      });
    }
    setData(dataCopy);
  }, [historicalCoinData_1, historicalCoinData_2]);

  const options = {
    title: "Historical Data Comparison",
    hAxis: { title: "Date" },
    vAxis: { title: "Price" },
    series: {
      0: { color: "#007BFF" }, // Color for Price 1 line
      1: { color: "#FF5733" }, // Color for Price 2 line
    },
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="LineChart"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default MergedChart;
