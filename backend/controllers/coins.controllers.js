import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios"

async function handleGetAllCoins(req, res) {
  const currency = req.params.currency; // Get currency from the request parameter
  const options = {
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-ga3pG9zCJHQAdbrkqTzJZJu7", // API key
    },
  };

  try {
    // Fetch data from CoinGecko API
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      {
        params: {
          vs_currency: currency,
        },
        ...options,
      }
    );

    res.json(response.data); // Send the fetched data back to the frontend
  } catch (error) {
    console.error("Error fetching coins:", error);
    res.status(500).json({ error: "Failed to fetch coins" });
  }
}

async function handleGetHistoricalCoinData(req, res) {
  const { coin, currency } = req.params;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-ga3pG9zCJHQAdbrkqTzJZJu7", // Replace with your API key if needed
    },
  };

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=30&interval=daily`,
      options
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({ message: "Failed to fetch historical data" });
  }
}

export {handleGetAllCoins, handleGetHistoricalCoinData} ;