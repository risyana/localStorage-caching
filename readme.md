About
--
Implementation of caching using localStorage object.

Business Logic
--

1. User type keywords and then click submit button or press enter key
2. Check the keywords in localStorage.
   * if not found:
      - get request to Wikipedia API
      - store response to localStorage
3. Get keywords from localStorage and render.

Installation
--
Install packages:

`npm install`

running development server :

`npm start` --it will run on localhost port 3000

Sample Use Case
---
Let say you search several keywords as follow:
* 1st search: Earth
* 2nd search: Jupiter
* 3rd search: Earth

On the 3rd search (Earth), data will be retrieved from local storage instead of fetching from Wikipedia API, because the keyword (Earth) already fetched on the 1st search.

Demo App
--
https://localstorage-caching.netlify.com/

