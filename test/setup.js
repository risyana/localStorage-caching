/* setup.js */
/* https://airbnb.io/enzyme/docs/guides/jsdom.html */

const { JSDOM } = require("jsdom");

const text = `
<!DOCTYPE html>
<html>
  <body onLoad = "APP.init('Selamat Datang')" >
    <div class="container">
      <form class="myform">
        <input name="query" type="text">
        <input type="submit">
      </form> 
      <div class="listContainer">
      </div>
      <button class="loadMore">Load More</button>
    </div>
    <script src="source/script/script.js"></script>
  </body>
</html>
`;

const option = {
  url: "https://localhost:8080"
};

const jsdom = new JSDOM(text, option);
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === "undefined")
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop)
      }),
      {}
    );
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};
copyProps(window, global);
