// API
const ENDPOINT = "https://en.wikipedia.org/w/api.php";
const OPTION = "?action=query&list=search&utf8=&format=json&origin=*&srsearch=";

// Local Storage Model

/*
 *  searchResult: {
 *    { query1: { search: [],
 *                searchInfo: {}
 *                }
 *    },
 *  },
 *
 */

// Local Storage

const initStorage = () => {
  console.log("init storage");
  const store = window.localStorage;
  if (!store.searchResult) {
    store.setItem("searchResult", "{}");
  }
};

const storage = window.localStorage;

// populate DOM
const myForm = document.querySelector(".myform");
const listContainer = document.querySelector(".listContainer");

// checking existence in local storage
const isExistInLocalStorage = searchKey => {
  console.log("check data existence in local storage");
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

// set new data to local storage
const setDataToLocalStorage = (query, data) => {
  console.log("write to local storage");
  const oldSearchResult = JSON.parse(storage.searchResult);
  const updatedSearchResult = { ...oldSearchResult, [query]: data };
  storage.setItem("searchResult", JSON.stringify(updatedSearchResult));
};

// fetch data
const fetchData = async url => {
  console.log("fetch");
  try {
    let result = await fetch(url);
    result = await result.json();
    return result;
  } catch (error) {
    return error;
  }
};

// render
const render = (articles, container) => {
  console.log("render");
  while (container.firstChild) container.removeChild(container.firstChild);
  articles.forEach(article => {
    const div = document.createElement("div");
    const text = document.createTextNode(article.title);
    div.appendChild(text);
    container.appendChild(div);
  });
};

// main
const main = async query => {
  await initStorage();
  const isExist = isExistInLocalStorage(query);
  if (!isExist) {
    const result = await fetchData(`${ENDPOINT}${OPTION}${query}`);
    await setDataToLocalStorage(query, result.query);
  }
  render(JSON.parse(storage.searchResult)[query].search, listContainer);
};

// submit handler
const submitHandler = async e => {
  const searchKey = e.target.elements.query.value;
  e.preventDefault();
  if (!searchKey) return null;
  await main(searchKey);
  return true;
};

// add event listener
myForm.addEventListener("submit", submitHandler);

main("hello world");
