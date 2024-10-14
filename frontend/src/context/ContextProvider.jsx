import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CoinAndLoginContext = createContext(null);

const ContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    Symbol: "$",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default is not logged in
  const [user, setUser] = useState(null); // To store user information

  const fetchAllCoins = async () => {
    try {
      const response = await axios.get(`/api/coins/${currency.name}`);
      setAllCoin(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    setUser,
    setIsLoggedIn,
    isLoggedIn,
    user,
  };

  return (
    <CoinAndLoginContext.Provider value={contextValue}>
      {props.children}
    </CoinAndLoginContext.Provider>
  );
};

export default ContextProvider;
