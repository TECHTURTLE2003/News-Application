const API_KEY = "42e9314d89ba4a3b97f30a14beb3177d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles) {
  const cardContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardContainer.innerHTML = "";

  articles.forEach((articles) => {
    if (!articles.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataCard(cardClone, articles);
    cardContainer.appendChild(cardClone);
  });
}
function fillDataCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-item");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectNav?.classList.remove("active");
  curSelectNav = navItem;
  curSelectNav.classList.add("active");
}

const searchbtn = document.getElementById("search-btn");
const searchtext = document.getElementById("search-text");
searchbtn.addEventListener("click", () => {
  const query = searchtext.value;
  if (!query) return;
  fetchNews(query);
  curSelectNav?.classList.remove("active");
  curSelectNav = null;
});
