const chai = require("chai");
const { APP } = require("../source/script/script");

const storage = window.localStorage;

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
      expect(result).to.be.true;
    });
    it("should return false", () => {
      const result = APP.test.isExistInLocalStorage(storage, "xman");
      expect(result).to.be.false;
    });
    after(() => {
      storage.clear();
    });
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
