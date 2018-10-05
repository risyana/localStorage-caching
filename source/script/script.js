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
    const store = window.localStorage;
    if (!store) return null;
    if (!store.searchResult) store.setItem("searchResult", "{}");
    return store;
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
  };

  const main = async searchKey => {
    const storage = initStorage();
    const isExist = isExistInLocalStorage(storage, searchKey);
    if (!isExist) {
      const result = await fetchData(`${ENDPOINT}${OPT}${searchKey}`);
      await setDataToLocalStorage(storage, searchKey, result.query);
    }
    render(JSON.parse(storage.searchResult)[searchKey].search, LIST_CONTAINER);
  };

  const submitHandler = async e => {
    const searchKey = e.target.elements.query.value;
    e.preventDefault();
    if (!searchKey) return null;
    await main(searchKey);
    return true;
  };

  const init = initialSearchKey => {
    MY_FORM.addEventListener("submit", submitHandler);
    main(initialSearchKey);
  };

  const test = {
    initStorage,
    isExistInLocalStorage,
    fetchData,
    setDataToLocalStorage,
    render
  };

  return {
    init,
    test
  };
})();

exports.APP = APP;
