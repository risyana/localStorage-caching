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
      expect(result).to.be.true;
      expect(JSON.parse(storage.getItem("searchResult"))).to.have.property(
        searchKey
      );
    });
    after(() => {
      storage.setItem("searchResult", "{}");
    });
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
