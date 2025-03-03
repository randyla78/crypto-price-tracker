---
sidebar_position: 4
---

# Challenges & Solutions

When building this project, I ran into a few challenges that required me to do some research or to adjust my approach to resolve the issues. Here are some of the challenges I faced and what I did to fix them

## Challenge 1: API error calls

The first problem I ran into was when I initally set up the API calls, some of the searches I made while testing ran into API call errors. I believed this happened because of network issues or when the API was called too frequently too fast.

### Solution

First, I added try-catch blocks to catch the errors and display a message, which helped with not making the app crash and improving the user experience. I then switched from useState (which I initially used to get the app running) to React Query which fixed the issue, thanks to React Query's data-fetching and caching. 

## Challenge 2: Switching from React's useState to React Query

When starting the project, I had initially used React's useState because it was what I was most familiar with. After playing around and getting used to the GeckoCoin API, I started to implement React Query (after some research), to fulfill the project requirements. However, it was my first time using React Query and I ran into barriers and issues in the process.

### Solution

I first watched videos and read some docs on React Query (understanding concepts such as the useQuery hook and caching). I then changed the parts of the app that were managing the API data from useState to React Query, which meant changing the logic of the structure. After some trial and error and reading online, I made the switch which was very useful as I now was able to use React Query's built-in functions and features.

## Challenge 3: Handling Invalid User Inputs

While testing the search feature, I tried inputting gibberish and realized that nothing happened. I noticed that the app having nothing to inform the user that their input didn't match any cryptocurrencies would be confusing and make it seem like the app wasn't working correctly.

### Solution

To fix this, I added a check to see if the results was greater than 0. If no results are found, I showed this message to the user: "No cryptocurrencies found. Please try again with a different search term.". This gives the app a better user experience and prevents any confusion when no currencies show up or nothing happens after the submit button is pressed.


## Conclusion

These challenges and solutions taught me how to efficiently handle errors better and taught me how to use new libraries such as React Query. I feel that these improvements helped me build a more reliable user-friendly app and helped me practice building apps using react.