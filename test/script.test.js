const chai = require("chai");
const { APP } = require("../source/script/script");

const storage = window.localStorage;
const MY_FORM = document.querySelector(".myform");
const LIST_CONTAINER = document.querySelector(".listContainer");

const { expect } = chai;

describe("APP", () => {
  beforeEach(() => {
    while (LIST_CONTAINER.firstChild) 
      LIST_CONTAINER.removeChild(LIST_CONTAINER.firstChild);
  });

  describe("Initiate Storage", () => {
    let temp;
    before(() => {
      temp = window;
    });
    it("should return Storage", async () => {
      const result = APP.test.initStorage();
      expect(result).to.be.an("Storage");
    });

    it("should return error, since window object is null", () => {
      window = null;
      try {
        APP.test.initStorage();
      } catch (err) {
        expect(err).to.be.a(Error);
      }
    });
    after(() => {
      window = temp;
    });
  });

  describe("is Exist in Local Storage ?", () => {
    before(() => {
      const data = { search: [], searchInfo: {} };
      APP.test.setDataToLocalStorage(storage, "hello", data);
    });

    it("should return true", () => {
      const result = APP.test.isExistInLocalStorage(storage, "hello");
      return expect(result).to.be.true;
    });

    it("should return false", () => {
      const result = APP.test.isExistInLocalStorage(storage, "xman");
      return expect(result).to.be.false;
    });

    after(() => {
      storage.setItem("searchResult", "{}");
    });
  });

  describe("Fetch data from API", () => {
    const VALID_ENDPOINT = "https://en.wikipedia.org/w/api.php";
    const INVALID_ENDPOINT = "https://en.wikipediaxxxxxxxx.org/w/api.php";
    const OPT =
      "?action=query&list=search&utf8=&format=json&origin=*&srsearch=";
    const searchKey = "Jakarta";

    it("should return object", async () => {
      const result = await APP.test.fetchData(
        `${VALID_ENDPOINT}${OPT}${searchKey}`
      );
      expect(result).to.be.an("object");
      expect(result).to.have.property("continue");
      expect(result).to.have.property("query");
    });

    it("should return error", async () => {
      const result = await APP.test.fetchData(
        `${INVALID_ENDPOINT}${OPT}${searchKey}`
      );
      expect(result).to.be.an("object");
      expect(result).to.have.property("message");
      expect(result).to.have.property("type");
      expect(result).to.have.property("errno");
      expect(result).to.have.property("code");
    });
  });

  describe("Set data to localStorage", () => {
    it("Data should be set to localStorage", () => {
      const searchKey = "Some Search Key";
      const data = { search: [{ title: "sample" }], searchInfo: { x: "x" } };
      const result = APP.test.setDataToLocalStorage(storage, searchKey, data);
      expect(result).to.equal(true);
      expect(JSON.parse(storage.getItem("searchResult"))).to.have.property(
        searchKey
      );
    });

    it("It should be error, since localStorage 'searchResult' item does not exist ", () => {
      storage.clear();
      const searchKey = "hello";
      const data = { search: [{ title: "sample" }], searchInfo: { x: "x" } };
      try {
        APP.test.setDataToLocalStorage(storage, searchKey, data);
      } catch (err) {
        expect(err).to.be.a(Error);
      }
    });

    after(() => {
      storage.setItem("searchResult", "{}");
    });
  });

  describe("Render", () => {
    describe("Check Paremeter. It should error because :", () => {
      let container = LIST_CONTAINER;
      it("articles is not an array", () => {
        const article = "some string";
        const result = APP.test.render(article, container);
        expect(result).to.equal(null);
      })

      it("articles is not an array of object ", () => {
        const article = ["my title 1", "my title 2"];
        const result = APP.test.render(article, container);
        expect(result).to.equal(null);
      });

      it("article does not have 'title'", () => {
        const article = [{ head: "my title 1" }];
        const result = APP.test.render(article, container);
        expect(result).to.equal(null);
      });

      it("container is not a div ", () => {
        const article = [{ title: "title 1" }];
        container = document.createElement("span");
        const result = APP.test.render(article, container);
        expect(result).to.equal(null);
      });
    });

    describe("Check Result", () => {
      const container = LIST_CONTAINER;
      const article = [{ title: "title 1" }, { title: "title 2" }];

      it("container should have $n children element", () => {
        const result = APP.test.render(article, container);
        expect(result).to.equal(true);
        expect(container.children.length).to.equal(article.length);
      });

      it("container's children element should be a div ", () => {
        const result = APP.test.render(article, container);
        expect(result).to.equal(true);
        expect(container.children[0]).to.be.a("HTMLDivElement");
      });
    });
  });

  describe("Submit Handler", () => {
    const container = LIST_CONTAINER;
    MY_FORM.addEventListener("submit", APP.test.submitHandler);
    const event = document.createEvent("HTMLEvents");
    event.initEvent("submit", false, true);
    MY_FORM.dispatchEvent(event);

    it("should return true. Get from local Storage", async () => {
      const searchKey = "Hello";
      // prepare data in local storage
      storage.setItem("searchResult", "{}");
      const data = { search: [{ title: "sample" }], searchInfo: { x: "x" } };
      APP.test.setDataToLocalStorage(storage, searchKey, data);

      MY_FORM.elements.query.value = searchKey;
      const result = await APP.test.submitHandler(event, container);
      expect(result).to.equal(true);
      expect(container.childElementCount).to.be.greaterThan(0);
    });

    it("should return true. Get from API", async () => {
      const searchKey = "Hello";
      // prepare data in local storage
      storage.setItem("searchResult", "{}");

      MY_FORM.elements.query.value = searchKey;
      const result = await APP.test.submitHandler(event, container);
      expect(result).to.equal(true);
      expect(container.childElementCount).to.be.greaterThan(0);
    });

    it("should return null, since seach key is null", async () => {
      const searchKey = null;
      MY_FORM.elements.query.value = searchKey;
      const result = await APP.test.submitHandler(event, container);
      expect(result).to.equal(null);
      expect(container.childElementCount).to.equal(0);
    });
  });

  describe("Init function", () => {
    const container = LIST_CONTAINER;

    it("should return true and render the result in list container", async () => {
      const initialSearchKey = "risya";
      const result = await APP.test.init(initialSearchKey, container);
      expect(result).to.equal(true);
      expect(container.childElementCount).to.be.greaterThan(0);
    });

    it("should return true and render nothing to list container", async () => {
      const initialSearchKey = "adfadfadfefadf adfad daf"; // any value that seems not exist in Wikipedia
      const result = await APP.test.init(initialSearchKey, container);
      expect(result).to.equal(true);
      expect(container.childElementCount).to.equal(0);
    });

    it("should return null, since pass non-string as a search key", async () => {
      const initialSearchKey = ["any", "title", "you want"];
      const result = await APP.test.init(initialSearchKey);
      expect(result).to.equal(null);
      expect(container.childElementCount).to.equal(0);
    });
  });
});
