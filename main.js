import "./src/style/style.css";
import "./src/style/firstSection.css";
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

const order = {
  brothId: 0,
  proteinId: 0,
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
      const destination = document.querySelector("#broth-section");

      if (destination) {
        destination.scrollIntoView({ behavior: "smooth" });
      }
      break;

    case "finish-order-button":
      pushOrder(order);
      break;

    default:
      break;
  }
}

function pushOrder(order) {
  const postOptions = {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify(order),
    mode: "cors",
  };

  fetch("https://api.tech.redventures.com.br/orders", postOptions)
    .then((response) => {
      if (response.status === 201) {
        return response.json(); 
      } else {
        throw new Error('Pedido não criado.'); 
      }
    })
    .then((data) => {
      console.log(data);
      const params = new URLSearchParams(data).toString();
      window.location.href = `/success?${params}`;
    })
    .catch((error) => {
      alert("Não foi possível enviar os dados para API: " + error.message);
    });
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
            <div id="broth-slides" class="broth-slides"></div>
            <div class="broth-indicators"></div>
        </div>
    </section>

    <section id="meat-section">
        <h1>It’s time to choose (or not) your meat!</h1>
        <p>Some people love, some don’t. We have options for all tastes.</p>
        <div id="meat-items"></div>
        <div id="meat-carousel" class="carousel">
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
    const isSmallScreen = window.matchMedia("(max-width: 500px)").matches;

    finishOrderButton.disabled =
      (order.brothId > 0 && order.proteinId > 0) || isSmallScreen
        ? false
        : true;
    finishOrderButton.enabled =
      (order.brothId > 0 && order.proteinId > 0) || isSmallScreen
        ? true
        : false;
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

  const containerBrothItem = document.getElementById("broth-items");
  containerBrothItem.addEventListener("itemSelected", (event) => {
    order.brothId = event.detail.brothItem;
  });
  const containerMeatItem = document.getElementById("meat-items");
  containerMeatItem.addEventListener("itemSelected", (event) => {
    order.proteinId = event.detail.meatItem;
  });

  const containerBrothSlideItem = document.getElementById("broth-carousel");
  containerBrothSlideItem.addEventListener("itemSelected", (event) => {
    order.brothId = event.detail.brothItem;
  });

  const containerMeatSlideItem = document.getElementById("meat-carousel");
  containerMeatSlideItem.addEventListener("meatItemSelected", (event) => {
    order.proteinId = event.detail.meatItem;
  });
});
