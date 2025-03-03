---
sidebar_position: 3
---

# State Management Explanation

Why I chose React Query:

I chose React Query because after some research, I found that it is good for handling asynchronous data such as automatic caching and background refetching. Since this project requires frequent fetching of the live crypto prices, I felt that React Query's caching and automatic data updates would be good for performance and not making the same API calls to fetch the same data (especially when the user refreshes the app many times quickly).

Additionally, I found out that React Query had a refetch function, which allows me to easily trigger a new API request to update the data.