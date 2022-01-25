import customSelect from 'custom-select';
import { filter } from "./index"; 

const PageList = (argument = "", home=false) => {
  let icons = ["",`<i class="fab fa-windows"></i>`,`<i class="fab fa-playstation"></i>`,`<i class="fab fa-xbox"></i>`,`<i class="fab fa-app-store-ios"></i>`,`<i class="fab fa-apple"></i>`,`<i class="fab fa-linux"></i>`, `<i class="fab fa-nintendo-switch"></i>`, `<i class="fab fa-android"></i>`]

  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const displayResults = (articles, isShowMore = false) => {
      const resultsContent = articles.results.map((article) => (
        `<article class="cardGame">
          <div class="cardGame__img__wrapper">
            <img src="${article.background_image}" alt="illustration for ${article.name}" class="cardGame__img">
            <div class="cardGame__img__wrapper--hover">
              <p class="bold">${article.released}</p>
              <p class="bold">${article.rating}/5 - ${article.ratings_count} votes</p>
              <p class="small">
                ${article.tags.map(tag => " " + tag.name).slice(0,9)}
              </p>
            </div>
          </div>
          <h1><a href="#pagedetail/${article.id}">${article.name}</a></h1>
          <p class="platform-icon mt-1"> ${article.parent_platforms.map(platform => icons[platform.platform.id]).join('')} </p>
        </article>`
      ));
      const resultsContainer = document.querySelector(".page-list .articles");
      if (isShowMore) {
        resultsContainer.innerHTML += resultsContent.join("\n");
      }
      else {
        resultsContainer.innerHTML = resultsContent.join("\n");
      }
      // Prevents 'show more' button from displaying if you can already see 3 pages of games
      if (document.querySelectorAll('.cardGame').length <= 18) {
        document.querySelector(".page-list .btn").innerHTML = `
          <button class="show-more-btn">Show more</button>
        `
      }
      else {
        document.querySelector(".page-list .btn").innerHTML = "";
      }
      showMore(articles);
    };

    const fetchList = (url, argument, isShowMore = false) => {
      const finalURL = argument ? `${url}?search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData, isShowMore)
        });
    };

    const showMore = (articles) => {
      document.querySelector('.page-list .btn button').addEventListener('click', function() {
        fetchList(articles.next, cleanedArgument, true);
      })
    }

    fetchList("https://api.rawg.io/api/games?key=8c82a6939d6a4facb72168ab9664784c&page_size=9&search=", cleanedArgument);
    // " + filter != '' ? '&platforms='+filter : '' + "
  };

  const render = () => {
    pageContent.innerHTML = `
    <section class="page-list">
      <div class="filter-input">
        <select id='mySelect'>
          <option value>Platform: any</option>
          <option value="1">Windows</option>
          <option value="2">PlayStation</option>
          <option value="3">Xbox</option>
          <option value="4">iOS</option>
          <option value="5">Mac</option>
          <option value="6">Linux</option>
          <option value="7">Switch</option>
          <option value="8">Android</option>
        </select>
      </div>
      <div class="articles">...loading</div>
      <div class="btn mt-2"></div>
    </section>
    `;

    preparePage();
  };

  const renderHome = () => {
    pageContent.innerHTML += `
      <section class="page-list">
        <div class="filter-input">
          <select id='mySelect'>
            <option value>Platform: any</option>
            <option value="1">Windows</option>
            <option value="2">PlayStation</option>
            <option value="3">Xbox</option>
            <option value="4">iOS</option>
            <option value="5">Mac</option>
            <option value="6">Linux</option>
            <option value="7">Switch</option>
            <option value="8">Android</option>
          </select>
        </div>
        <div class="articles">...loading</div>
        <div class="btn mt-2"></div>
      </section>
    `;

    preparePage();
  };

  home ? renderHome() : render();
  const cstSel = customSelect(document.getElementById('mySelect'));
  document.getElementById('mySelect').addEventListener('change', function() {
    filter = document.getElementById('mySelect').value;
  })
};

export { PageList };