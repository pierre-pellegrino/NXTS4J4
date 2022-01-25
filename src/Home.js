import { PageList } from "./PageList";

const Home = (argument = "") => {
  pageContent.innerHTML = `
  <div class="home-title mb-3">
    <h1 class="mb-1">Welcome,</h1>
    <p>
      The Hyper Progame is the world’s premier event for computer and video games and related products. 
      At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, 
      connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industry. 
      For three exciting days, leading-edge companies, groundbreaking new technologies, 
      and never-before-seen products will be showcased. 
      The Hyper Progame connects you with both new and existing partners, industry executives, gamers, 
      and social influencers providing unprecedented exposure to the entire video game industry, all under one roof. 
      This text seems familiar.
    </p>
  </div>
    `
  PageList("", true);
};

export { Home };