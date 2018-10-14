const APP = (() => {
  // local storage model
  /*
  *  searchResult: {
  *    { query1: { search: [],
  *                searchInfo: {}
  *                }
  *    },
  *  },
  *
  */

  // Global variable : API & DOM
  const ENDPOINT = "https://en.wikipedia.org/w/api.php";
  const OPT = "?action=query&list=search&utf8=&format=json&origin=*&srsearch=";
  const MY_FORM = document.querySelector(".myform");
  const LIST_CONTAINER = document.querySelector(".listContainer");

  const initStorage = () => {
    // console.log("init storage");
    try {
      const store = window.localStorage;
      if (!store.searchResult) store.setItem("searchResult", "{}");
      return store;
    } catch (err) {
      return err;
    }
  };

  const isExistInLocalStorage = (storage, searchKey) => {
    // console.log("check data existence in local storage");
    const currentStorage = JSON.parse(storage.searchResult);
    const hasSearchKey = Object.prototype.hasOwnProperty.call(
      currentStorage,
      searchKey
    );
    if (hasSearchKey) {
      return true;
    }
    return false;
  };

  const setDataToLocalStorage = (storage, searchKey, data) => {
    // console.log("write to local storage");
    try {
      const oldSearchResult = JSON.parse(storage.searchResult);
      const updatedSearchResult = Object.assign(oldSearchResult, {
        [searchKey]: data
      });
      storage.setItem("searchResult", JSON.stringify(updatedSearchResult));
      return true;
    } catch (err) {
      return err;
    }
  };

  const fetchData = async url => {
    // console.log("fetch");
    try {
      let result = await fetch(url);
      result = await result.json();
      return result;
    } catch (error) {
      return error;
    }
  };

  const render = (articles, container) => {
    // console.log("render");
    while (container.firstChild) container.removeChild(container.firstChild);
    articles.forEach(article => {
      const div = document.createElement("div");
      const text = document.createTextNode(article.title);
      div.appendChild(text);
      container.appendChild(div);
    });
    return true;
  };

  const main = async (searchKey, container) => {
    try {
      if (typeof searchKey !== "string") throw new Error();
      const storage = initStorage();
      const isExist = isExistInLocalStorage(storage, searchKey);
      if (!isExist) {
        const result = await fetchData(`${ENDPOINT}${OPT}${searchKey}`);
        await setDataToLocalStorage(storage, searchKey, result.query);
      }
      render(JSON.parse(storage.searchResult)[searchKey].search, container);
      return true;
    } catch (err) {
      return null;
    }
  };

  const submitHandler = async (e, container = LIST_CONTAINER) => {
    try {
      const searchKey = e.target.elements.query.value;
      e.preventDefault();
      if (!searchKey) throw new Error();
      const result = await main(searchKey, container);
      if (!result) return null;
      return true;
    } catch (error) {
      return null;
    }
  };

  const init = async (initialSearchKey, container = LIST_CONTAINER) => {
    try {
      MY_FORM.addEventListener("submit", submitHandler);
      const result = await main(initialSearchKey, container);
      if (!result) throw new Error();
      return true;
    } catch (error) {
      return null;
    }
  };

  const test = {
    initStorage,
    isExistInLocalStorage,
    fetchData,
    setDataToLocalStorage,
    render,
    submitHandler,
    main,
    init
  };

  return {
    init,
    test
  };
})();

exports.APP = APP;
