import React, { useContext, useState, useEffect } from "react";
import "./CompareSearch.css";
import { CoinAndLoginContext } from "../../context/ContextProvider";
import axios from "axios";
const CompareSearch = ({ setHistoricalCoinData }) => {
  const { allCoin, currency } = useContext(CoinAndLoginContext);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const historicalDataHandler = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.get(
        `/api/coins/historical-data/${input.toLowerCase()}/${currency.name}`
      );
      setHistoricalCoinData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   historicalDataHandler();
  // }, [currency, input]);

  return (
    <form onSubmit={(e) => historicalDataHandler(e)}>
      <input
        onChange={(e) => inputHandler(e)}
        list="coinlist"
        value={input}
        type="text"
        placeholder="Search crypto.."
        required
      />

      <datalist id="coinlist">
        {allCoin.map((item, index) => (
          <option key={index} value={item.id}></option>
        ))}
      </datalist>

      <button className="add-coin-btn" type="submit">
        Add
      </button>
    </form>
  );
};

export default CompareSearch;
