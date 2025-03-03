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
    <div className="min-h-screen bg-[gray-100] flex flex-col items-center justify-center p-6">
      <div className="p-6 rounded-lg w-full max-w-md border ">
      <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Crypto Price Tracker</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for cryptocurrencies"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          <button onClick={handleSearchSubmit} className="w-full py-2 rounded-md border mt-3 mb-4  hover:bg-gray-100 transition">Search</button>
        
        <div>
          <h2 className="text-lg mb-4 font-semibold text-gray-700">Cryptocurrency Prices</h2>
          {Object.keys(prices).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(prices).map(([crypto, data]) => (
                <div key={crypto} className="mb-2 p-4 bg-gray-50 rounded-md shadow-sm">
                  <h3 className="text-lg">{crypto.toUpperCase()}</h3>
                  <p className="text-green-500">Price: ${data.cad}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default CryptoPriceTracker;