"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';


const fetchPrices = async (cryptos, currency) => {
  const ids = cryptos.join(',');
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${currency}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch prices');
  }
  return response.json();
};

const CryptoPriceTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptos, setCryptos] = useState(['bitcoin', 'ethereum', 'dogecoin', 'tether', 'ripple']);
  const [noResults, setNoResults] = useState(false);
  const [currency, setCurrency] = useState('cad');

  //Use React Query to fetch prices
  const { data: prices, error, isLoading, refetch } = useQuery({
    queryKey: ['cryptoPrices', cryptos, currency], 
    queryFn: () => fetchPrices(cryptos, currency),
    enabled: cryptos.length > 0,
  });

  //Search for crypto when submit button pressed, also checking if 0 cryptos show up in the results
  const handleSearchSubmit = async () => {
    const searchResults = await searchCryptos(searchQuery);
    if (searchResults.length === 0) {
      setNoResults(true); 
    } else {
      setNoResults(false); 
    }
    setCryptos(searchResults);
  };

  //Use coingecko api to fetch crypto currencies matching the search the user submitted
  const searchCryptos = async (query) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.coins.map(coin => coin.id);
  } catch (error) {
    console.error('Error fetching search results:', error);
    setError('Failed to fetch search results. Please try again.');
    setNoResults(true);
    return [];
  }
};


/*
  //When crypro currency prices are fetched or changed, we want to then fetch the price of each coin
  //Here, I joined the ids to be separated by commas because the CoinGecko api expects the ids to be a comma separated list
  useEffect(() => {
    if (cryptos.length > 0) {
      const fetchPrices = async () => {
        setLoading(true);
        setError('');
        try {
          const ids = cryptos.join(',');
          const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=cad`);
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setError('Failed to fetch prices. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
    }
  }, [cryptos]);


  //Refresh prices by setting prices to empty then fetching them again
  const handleRefreshPrices = () => {
    setPrices({});
    setLoading(true);
    setError('');
    const fetchPrices = async () => {
      try {
        const ids = cryptos.join(',');
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=cad`);
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setError('Failed to fetch prices. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  };
*/

  return (
    <div className="min-h-screen bg-[#F2F0EF] flex flex-col items-center justify-center p-6">
      <div className="p-6 rounded-lg w-full max-w-md border ">
      <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Crypto Price Tracker</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for cryptocurrencies"
          className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-800 dark:placeholder-gray-400"
        />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="ml-2 p-2 border border-gray-700 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
          >
            <option value="cad">CAD</option>
            <option value="usd">USD</option>
          </select>


      </div>
          <button onClick={handleSearchSubmit} className="w-full py-2 rounded-md border mt-3 mb-4  hover:bg-gray-100 transition cursor-pointer dark:bg-gray-800 dark:text-white">Search</button>
          {error && (
            <div className="bg-red-100 text-red-700 mt-4 p-4 rounded-md">
              {error.message}
            </div>
          )}

        {noResults && (
          <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md mt-4 mb-3">
            No cryptocurrencies found. Please try again with a different search term.
          </div>
        )}

        <div>
          <h2 className="text-lg mb-4 font-semibold text-gray-700">Cryptocurrency Prices</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : prices ? (
            
              Object.entries(prices).map(([crypto, data]) => (
                <div key={crypto} className="mb-2 p-4 bg-gray-50 rounded-md shadow-sm">
                  <h3 className="text-lg text-gray-900 dark:text-gray-800">{crypto.toUpperCase()}</h3>
                  <p className="text-green-500">Price: ${data[currency]}</p>
                </div>
              ))
            ) : (

            <p>No results found</p>
          )}
        </div>

        <button
          onClick={refetch}
          className="w-full py-2 rounded-md mt-4 text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 cursor-pointer"
        >
          Refresh Prices
        </button>
      </div>
    </div>
  );
};


export default CryptoPriceTracker;