"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';

const CryptoPriceTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptos, setCryptos] = useState([]);
  const [prices, setPrices] = useState({});

  //Set searchQuery state when search box input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //Search for crypto when submit button pressed
  const handleSearchSubmit = async () => {
    const searchResults = await searchCryptos(searchQuery);
    setCryptos(searchResults);
  };

  //Use coingecko api to fetch crypto currencies matching the search the user submitted
  const searchCryptos = async (query) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
    const data = await response.json();
    return data.coins.map(coin => coin.id);
  };

  //When crypro currency prices are fetched, we want to then fetch the price of each coin
  //Here, I joined the ids to be separated by commas because the CoinGecko api expects the ids to be a comma separated list
  useEffect(() => {
    if (cryptos.length > 0) {
      const fetchPrices = async () => {
        const ids = cryptos.join(',');
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=cad`);
        const data = await response.json();
        setPrices(data);
      };
      fetchPrices();
    }
  }, [cryptos]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for cryptocurrencies"
      />
      <button onClick={handleSearchSubmit}>Search</button>
      
      <div>
        <h2>Cryptocurrency Prices</h2>
        {Object.keys(prices).length > 0 ? (
          Object.entries(prices).map(([crypto, data]) => (
            <div key={crypto}>
              <h3>{crypto}</h3>
              <p>Price: ${data.cad}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};


export default CryptoPriceTracker;