const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const text = `
<!DOCTYPE html>
<html>
  <body>
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
const option = {};

const dom = new JSDOM(text, option);

document = dom.window.document;

const APP = require("../source/script/script");

describe("APP", () => {
  describe("Initiate Storage", () => {
    it("should return object");
    it("should return null");
  });
  describe("is Exist in Local Storage ?", () => {
    it("should return true");
    it("should return false");
  });
  describe("Fetch data from API", () => {
    it("should return object");
    it("should return error");
  });
  describe("Set data to localStorage", () => {
    it("Data should be set to localStorage");
  });
  describe("Render", () => {
    describe("Check Paremeter", () => {
      it("articles should be an array of object");
      it("article should own propery 'title'");
      it("container should be a div ");
    });
    describe("Check Result", () => {
      it("container should have $n children element");
      it("container's children element should be a div ");
    });
  });
});
