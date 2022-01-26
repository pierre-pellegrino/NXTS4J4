import customSelect from 'custom-select';

const PageList = (argument = "", home=false) => {
  let icons = ["",`<i class="fab fa-windows"></i>`,`<i class="fab fa-playstation"></i>`,`<i class="fab fa-xbox"></i>`,`<i class="fab fa-app-store-ios"></i>`,`<i class="fab fa-apple"></i>`,`<i class="fab fa-linux"></i>`, `<i class="fab fa-nintendo-switch"></i>`, `<i class="fab fa-android"></i>`]

  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");
    const displayResults = (articles, isShowMore = false) => {
      const resultsContent = articles.results.map((article) => (
        `<article class="cardGame">
          <div class="cardGame__img__wrapper">
            <img src="${article.background_image ? article.background_image : `./src/no_pic.jpg`}" alt="illustration for ${article.name}" class="cardGame__img">
            <div class="cardGame__img__wrapper--hover">
              <p class="bold">${article.released}</p>
              <p class="bold">${article.rating}/5 - ${article.ratings_count} votes</p>
              <p class="small">
                ${article.genres.map(genre => " " + genre.name).slice(0,9)}
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
      if (document.querySelectorAll('.cardGame').length <= 18 && articles.next !== null) {
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
      const finalURL = argument ? `${url}&search=${argument}` : url;
      console.log(finalURL)
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData, isShowMore)
        });
    };

    // Executes the same API query with the next page (can only be called two times before 'show more' button disappears)
    const showMore = (articles) => {
      if (document.querySelector('.page-list .btn button') !== null)
      {
        document.querySelector('.page-list .btn button').addEventListener('click', function() {
          fetchList(articles.next, cleanedArgument, true);
        })
      }
    }

    // When choosing a filter (e.g. 'playstation', 'linux'), calls the API with the selected parameter (parent_platforms)
    document.getElementById('mySelect').addEventListener('change', function() {
      // console.log(document.getElementById('mySelect').value)
      let searchValue = document.querySelector('.search-input').value.replace(/\s+/g, "-");
      let url = `https://api.rawg.io/api/games?key=8c82a6939d6a4facb72168ab9664784c${document.getElementById('mySelect').value != '' ? '&parent_platforms='+document.getElementById('mySelect').value : ''}&page_size=9&page_size=9${searchValue != '' ? '' : '&dates=2021-06-01,2022-12-01&ordering=-added'}`;
      // console.log(url)
      fetchList(url, searchValue);
    })

    // Executes the API with the string specified in text input
    document.querySelector('.search-input').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        let searchValue = document.querySelector('.search-input').value.replace(/\s+/g, "-");
        let url = `https://api.rawg.io/api/games?key=8c82a6939d6a4facb72168ab9664784c${document.getElementById('mySelect').value != '' ? '&parent_platforms='+document.getElementById('mySelect').value : ''}&page_size=9`;
        fetchList(url, searchValue)
      }
    })

    let url = `https://api.rawg.io/api/games?key=8c82a6939d6a4facb72168ab9664784c${document.getElementById('mySelect').value != '' ? '&parent_platforms='+document.getElementById('mySelect').value : ''}&page_size=9&dates=2021-06-01,2022-12-01&ordering=-added`;
    fetchList(url, cleanedArgument);
    const cstSel = customSelect(document.getElementById('mySelect'));
  };

  const render = () => {
    pageContent.innerHTML = `
    <section class="page-list active">
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
      <div class="articles">Loading...</div>
      <div class="btn mt-2"></div>
    </section>
    `;

    preparePage();
  };

  const renderHome = () => {
    pageContent.innerHTML += `
      <section class="page-list active">
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
        <div class="articles">Loading...</div>
        <div class="btn mt-2"></div>
      </section>
    `;

    preparePage();
  };

  home ? renderHome() : render();
};

export { PageList };