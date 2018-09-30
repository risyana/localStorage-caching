// API 
const URL = 'https://en.wikipedia.org/w/api.php';
const OPTION = '?action=query&list=search&utf8=&format=json&srsearch='

// Local Storage Model

/*
 * 
 * wikipediaSearchApp : {
 *  query: '',
 *  searchResult: {
 *    { query1: { search: [],
 *                searchInfo: {}
 *                }
 *    },
 *  },
 * }
 * 
 */

// MODEL
let query = ''; 
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
  const result = await fetchData();
  render(result.query.search);
});

// fetch data
const fetchData = async function() {
  try {
    let result = await fetch(`${URL}${OPTION}${query}`);
    result = await result.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// render
const render = function(articles) {
  listContainer.innerHTML = '';
  articles.forEach(article => {
    const div = document.createElement('div');
    const text = document.createTextNode(article.title);
    div.appendChild(text);
    listContainer.appendChild(div);
  });
}


