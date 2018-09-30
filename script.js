// API 
const URL = 'https://en.wikipedia.org/w/api.php';
const OPTION = '?action=query&list=search&utf8=&format=json&srsearch='

// Local Storage Model

/*
 *  query: '',
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
  console.log('init storage');
  const store = window.localStorage; 
  if (!store.searchResult){
    store.setItem('searchResult', '{}');
  }
}

const storage = window.localStorage;

// MODEL
let query = 'hello'; 
let searchResult = null; // { query1: {...}, query2: {...}}

// populate DOM
const myForm = document.querySelector(".myform");
const inputText = document.querySelector("[name='query']");
const listContainer = document.querySelector(".listContainer");

// add event listener
myForm.addEventListener('submit', async function(e) {
  query = inputText.value;
  e.preventDefault();
  if(!query) {
    return null;
  }
  init();
});

// checking existence in local storage
const isExistInLocalStorage = function (query) {
  console.log("check data existence in local storage");
  //console.log(JSON.parse(storage['searchResult']), query);
  if (JSON.parse(storage['searchResult']).hasOwnProperty(query)) {
    return true;
  }
  return false;
}

// set new data to local storage
const setDataToLocalStorage = function(query, data) {
  console.log("write to local storage");
  const oldSearchResult = JSON.parse(storage['searchResult']);
  console.log(oldSearchResult)
  const updatedSearchResult = {...oldSearchResult, [query]: data}
  console.log(updatedSearchResult)
  storage.setItem('searchResult', JSON.stringify(updatedSearchResult));
}

// fetch data
const fetchData = async function () {
  console.log('fetch');
  try {
    let result = await fetch(`${URL}${OPTION}${query}`);
    result = await result.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// render
const render = function(articles) {
  console.log('render');
  listContainer.innerHTML = '';
  articles.forEach(article => {
    const div = document.createElement('div');
    const text = document.createTextNode(article.title);
    div.appendChild(text);
    listContainer.appendChild(div);
  });
}

// init
const init = async function() {
  await initStorage();
  const isExist = isExistInLocalStorage(query);
  if(!isExist) {
    const result = await fetchData();
    await setDataToLocalStorage(query, result.query);
  }
  render(JSON.parse(storage['searchResult'])[query].search);
}

init();
