import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.map((item, index) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
    }
    setData(dataCopy);
  }, [historicalData]);

  const options = {
    title: "Company Performance",
    hAxis: { title: "DATE" },
    vAxis: { title: "PRICE" },
    legend: "none",
  };

  return (
    <Chart
      chartType="LineChart"
      height="100%"
      data={data}
      options={options}
      legendToggle
    />
  );
};

export default LineChart;
