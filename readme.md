About
--
Implementation of caching using localStorage object.

Business Logic
--

1. User type keywords and then click submit button or press enter key
2. Check the keywords in localStorage.
   * if not found:
      - get request to server
      - store response to localStorage
3. Get keywords from localStorage and render.

Installation
--
Install packages:

`npm install`

running development server :

`npm start` --it will run on localhost port 3000


