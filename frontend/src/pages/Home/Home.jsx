import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinAndLoginContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinAndLoginContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const inputHandler = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const searchedCoins = await allCoin.filter((item, index) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(searchedCoins);
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
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
              <option key={index} value={item.name}></option>
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coins/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.Symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_24h > 0 ? "green" : "red"}>
              {item.price_change_24h.toFixed(2)}
            </p>
            <p className="market-cap">
              {currency.Symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
