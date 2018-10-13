const chai = require("chai");
const { APP } = require("../source/script/script");

const storage = window.localStorage;
const MY_FORM = document.querySelector(".myform");
const LIST_CONTAINER = document.querySelector(".listContainer");

const { expect } = chai;

describe("APP", () => {
  describe("Initiate Storage", () => {
    it("should return Storage", async () => {
      const result = APP.test.initStorage();
      expect(result).to.be.an("Storage");
    });
    it("should return null");
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
    after(() => {
      storage.setItem("searchResult", "{}");
    });
  });

  describe("Render", () => {
    let container = LIST_CONTAINER;
    describe("Check Paremeter", () => {
      it("Should throw error, since articles is not an array of object ", () => {
        const article = [["my title 1", "my title 2"]];
        const result = APP.test.render(article, container);
        expect(result).to.throw(TypeError);
      });
      it("Should throw error, since article does not have 'title'", () => {
        const article = [{ head: "my title 1" }];
        const result = APP.test.render(article, container);
        expect(result).to.throw(TypeError);
      });
      it("Should throw error, since container is not a div ", () => {
        const article = [{ title: "title 1" }];
        container = document.createElement("span");
        const result = APP.test.render(article, container);
        expect(result).to.throw(TypeError);
      });
    });
    describe("Check Result", () => {
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
});
