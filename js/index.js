//HTML Elements
var countryButton = document.querySelectorAll("nav a");
var categroyButton = document.querySelectorAll("aside a");
var newsContainer = document.querySelector(".news-container");
//App Variables
var strcurrentCountry = "us";
var strcurrentCategory = "Business";
//functions 
async function getNews(country,category) {
  var response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=596d0d9e5e854419b619c58505778880`);
  data = await response.json();
  return data;
}
function toggleActiveClass(element,elementClass){
  var currentElement = document.querySelector(`.${elementClass} .active`);
  currentElement.classList.toggle("active");
  element.classList.toggle("active");
}

function createArticleCard(imgUrl,articleAuthor,description,articleUrl) {
  var cardContainer = document.createElement("div");
  cardContainer.classList.add("col-12","col-lg-4");
  var articleCard = document.createElement("article");
  cardContainer.append(articleCard);
  var innerCard = document.createElement("div");
  innerCard.classList.add("inner","shadow");
  articleCard.append(innerCard);
  var cardImg = document.createElement("img");
  cardImg.classList.add("w-100");
  imgUrl = imgUrl == null ? "./images/Placeholder.svg.png" : imgUrl;
  cardImg.setAttribute("src",imgUrl);
  innerCard.append(cardImg);
  var articleBody = document.createElement("div");
  articleBody.classList.add("article-body","p-3");
  innerCard.append(articleBody);
  var articleTitle = document.createElement("h2");
  articleTitle.classList.add("h5","article-author");
  articleTitle.innerText = articleAuthor;
  articleBody.append(articleTitle);
  var articleDescription = document.createElement("p");
  articleDescription.innerText = description;
  articleBody.append(articleDescription);
  var readMoreBtn = document.createElement("a");
  readMoreBtn.classList.add("btn","btn-primary");
  readMoreBtn.innerText = "Read More";
  readMoreBtn.setAttribute("href",articleUrl);
  readMoreBtn.setAttribute("target","_blank");
  articleBody.append(readMoreBtn);
  return cardContainer;
}
async function showAllNews(){
  newsContainer.innerHTML = ``;
  var response = await getNews(strcurrentCountry,strcurrentCategory);
  var allNews = response.articles;
  console.log(allNews);
  for(var i=0;i<allNews.length;i++){
    newsContainer.append(createArticleCard(allNews[i].urlToImage,allNews[i].author,allNews[i].description,allNews[i].url));
  }
}
showAllNews();
//events.
for(var i=0;i<countryButton.length;i++){
  countryButton[i].addEventListener("click", function(e){
    toggleActiveClass(e.target,"country-list");
    strcurrentCountry = e.target.getAttribute("country-code");
    showAllNews()
  });
}
for(var i=0;i<categroyButton.length;i++){
  categroyButton[i].addEventListener("click", function(e){
    toggleActiveClass(e.target,"category-list");
    strcurrentCategory = e.target.innerHTML;
    showAllNews();
  });
}
