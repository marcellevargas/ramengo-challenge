import "./style.css";
import "./firstSection.css";
import backgroundImage from "./src/assets/backgroundImage.svg";
import ilustration from "./src/assets/ilustration.svg";
import arrow from "./src/assets/arrow.svg";
import logo from "./src/assets/logo.svg";
import { createBrothItem } from "./src/components/broth/brothItem.js";
import { createMeatItem } from "./src/components/meat/meatItem.js";
import { createBrothSlide } from "./src/components/broth/brothSlideItem.js";
import { createMeatSlide } from "./src/components/meat/meatSlideItem.js";

const options = {
  method: "GET",
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
};

function fetchBrothData() {
  fetch("https://api.tech.redventures.com.br/broths", options)
    .then((response) => response.json())
    .then((data) => {
      createBrothItem(data);
      createBrothSlide(data);
    })
    .catch((error) => {
      alert("Não foi possível obter os dados da API.");
    });
}

function fetchMeatData() {
  fetch("https://api.tech.redventures.com.br/proteins", options)
    .then((response) => response.json())
    .then((data) => {
      createMeatItem(data);
      createMeatSlide(data);
    })
    .catch((error) => {
      alert("Não foi possível obter os dados da API.");
    });
}

function handleClick(event) {
  switch (event.target.id) {
    case "order-button":
      event.preventDefault();
      const destination = document.querySelector('#broth-section');
    
      if (destination) {
          destination.scrollIntoView({ behavior: 'smooth' });
      }
      break;

    case "finish-order-button":
      window.location.href = '/#broth-section';
      break;

    default:
      break;
  }
}

document.querySelector("#app").innerHTML = `
    <section class="first-section" style="background-image: url(${backgroundImage})">
        <div class="sidebar-container">
            <img class="logo-image" src=${logo} />
        </div>
        <div class="hero-container">
            <div class="ilustration-container">
                <img class="ilustration-image" src=${ilustration} />
            </div>
            <div class="hero-content"> </div>
            <div class="go-container">
                <div class="go-container">
                    <p> ラーメン </p>
                    <h1>GO!</h1>
                </div>
            </div>
            <div class="cta-container">
                <p>
                    Enjoy a good ramen in the comfort of your house.
                    Create your own ramen and 
                    choose your favorite flavour combination!
                </p>
                <button
                  id="order-button"
                >
                    order now
                    <img src=${arrow} />
                </button>
            </div>
        </div>
    </section>

    <section id="broth-section">
        <h1>First things first: select your favorite broth.</h1>
        <p>It will give the whole flavor on your ramen soup.</p>
        <div id="broth-items"> </div>
        <div id="broth-carousel" class="carousel">
            <div class="broth-slides"></div>
            <div class="broth-indicators"></div>
        </div>
    </section>

    <section id="meat-section">
        <h1>It’s time to choose (or not) your meat!</h1>
        <p>Some people love, some don’t. We have options for all tastes.</p>
        <div id="meat-items"></div>
        <div class="carousel">
            <div class="slides"></div>
            <div class="indicators"></div>
        </div>
    </section>

    <section id="finish-order">
      <button id="finish-order-button">
          Place my order
          <img src=${arrow} />
      </button>
    </section>
`;

document.addEventListener("DOMContentLoaded", function () {
  fetchBrothData();
  fetchMeatData();

  const orderButton = document.getElementById("order-button");
  const finishOrderButton = document.getElementById("finish-order-button");
  const targetNode = document.body;

  orderButton.addEventListener("click", function (event) {
    handleClick(event);
  });

  finishOrderButton.addEventListener("click", function (event) {
    handleClick(event);
  });

  function updateButtonVisibility() {
    const activeCards = document.querySelectorAll(
      ".card-broth.active, .card-meat.active"
    );
    const isSmallScreen = window.matchMedia("(max-width: 500px)").matches;

    finishOrderButton.disabled =
      activeCards.length > 1 || isSmallScreen ? false : true;
    finishOrderButton.enabled =
      activeCards.length > 1 || isSmallScreen ? true : false;
  }

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" || mutation.type === "attributes") {
        updateButtonVisibility();
      }
    });
  });

  const config = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  };

  observer.observe(targetNode, config);

  updateButtonVisibility();
});