import { PageList } from "./PageList";
const PageDetail = (argument = "") => {
  let icons = ["",`<i class="fab fa-windows"></i>`,`<i class="fab fa-playstation"></i>`,`<i class="fab fa-xbox"></i>`,`<i class="fab fa-app-store-ios"></i>`,`<i class="fab fa-apple"></i>`,`<i class="fab fa-linux"></i>`, `<i class="fab fa-nintendo-switch"></i>`, `<i class="fab fa-android"></i>`];
  let months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, released, description, background_image, website, 
              rating, ratings_count, developers, parent_platforms, publishers, 
              genres, tags, stores, background_image_additional} = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector(".page-detail__image").innerHTML = `
          <img src="${background_image ? background_image : `./src/no_pic.jpg`}" alt="${name} illustration">
          <a href="${website}" class='btn' target='_blank'>Check Website <i class="fas fa-play"></i></a>`;
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector(".rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector("p.release-date").innerHTML = `${months[parseInt(released.split('-')[1],10)]} ${released.split('-')[2]}, ${released.split('-')[0]}`;
      articleDOM.querySelector("p.developer").innerHTML = `<a href='#pagelist/&dates=&developers=${developers[0].id}'>${developers[0].name}</a>`;
      articleDOM.querySelector("p.platforms").innerHTML = parent_platforms.map(platform => icons[platform.platform.id]).join('');
      articleDOM.querySelector("p.publisher").innerHTML = `<a href='#pagelist/&dates=&publishers=${publishers[0].id}'>${publishers[0].name}</a>`;
      articleDOM.querySelector("p.genre").innerHTML = genres.map(g => `<a href="#pagelist/&dates&genres=${g.id}">${g.name}</a>`); 
      articleDOM.querySelector("p.tags").innerHTML = tags.map(t => t.name).slice(0,6);
      articleDOM.querySelector(".stores").innerHTML = stores.map(s => `<p class='mb-1'><a target='_blank' href='https://${s.store.domain}'>${s.store.name}</a></p>`).join('');
      articleDOM.querySelector(".screens").innerHTML = background_image ? `<img class='game-screen' alt='${name} screenshot' src='${background_image}'>` : '';
      articleDOM.querySelector(".screens").innerHTML += background_image_additional ? `<img class='game-screen' alt='${name} 2nd screenshot' src='${background_image_additional}'>` : '';
      articleDOM.querySelector(".similar").innerHTML = PageList("", true);
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=8c82a6939d6a4facb72168ab9664784c`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail active">
        <div class="article">
          <div class="page-detail__image mb-1"></div>
          <div class="title-div mb-3">
            <h1 class="title"></h1>
            <p class="rating red"></p>
          </div>
          <p class="description"></p>
          <div class="game-infos mt-3 mb-4">
            <div>
              <p class="bold">Release date</p>
              <p class="release-date"></p> 
            </div>
            <div>
              <p class="bold">Developer</p>
              <p class="developer"></p> 
            </div>
            <div>
              <p class="bold">Platforms</p>
              <p class="platforms"></p> 
            </div>
            <div>
              <p class="bold">Publisher</p>
              <p class="publisher"></p> 
            </div>
            <div>
              <p class="bold">Genre</p>
              <p class="genre"></p> 
            </div>
            <div>
              <p class="bold">Tags</p>
              <p class="tags"></p> 
            </div>
          </div>
          <div class="detail-buy mt-2">
            <h2 class="red mb-2">SHOP</h2>
            <div class="stores"></div>
          </div>
          <div class="detail-screens mt-4">
            <h2 class="red mb-2">SCREENSHOTS</h2>
            <div class="screens"></div>
          </div>
          <div class="detail-similar mt-4">
            <h2 class="red mb-2">SIMILAR GAMES</h2>
            <div class="similar"></div>
          </div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageDetail };