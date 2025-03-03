---
sidebar_position: 2
---


# API Integration

In this project, I decided to used the CoinGecko API to fetch the cryptocurrency prices because it doesn't require authenitcation to access price data. The API is called whenever the page loads, when the user presses the update button, or when the user searches for specific currencies. 

CoinGecko API Docs used:
https://docs.coingecko.com/v3.0.1/reference/introduction

The API endpoint used is https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=cad

 In the 'Coin Price by IDs' section of the CoinGecko docs, it states that {ids} is a comma-separated list of cryptocurrency IDs (e.g., `bitcoin,ethereum,ripple,dogecoin`). The JSON response would then look something like:
 ```bash
 {
  "bitcoin": { "cad": 132760 },
  "ethereum": { "cad": 3400 },
  "xrp": { "cad": 3.79 },
  "dogecoin": { "cad": 0.31 },
}
```
Which is extracted and displayed on the app.

## API Integration

I decided to fetch the data using React Query to cache the responses and refetch when needed (The full explanation of this choice is in the State Management Explanation page).

```bash
const fetchPrices = async () => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,xrp,tether&vs_currencies=cad'
  );
  return res.json();
};

const { data, error, isLoading } = useQuery('cryptoPrices', fetchPrices);
```
In my code, I show a loading spinner when isLoading is true and an error message when error != null. If neither of these conditions are met, then I display the cryptocurrency prices.

## Error Handling
To Handle errors, I use try and catch statements to catch and display error messages. Sometimes during testing, I had notice that it would fail once in a while due to network or other issues, so I added this error handling to ensure the app doesn't crash.