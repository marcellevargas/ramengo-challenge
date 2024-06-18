import "./style.css";
import "./firstSection.css";
import backgroundImage from "./src/assets/backgroundImage.svg";
import ilustration from "./src/assets/ilustration.svg";
import arrow from "./src/assets/arrow.svg";
import logo from "./src/assets/logo.svg";

const options = {
  method: "GET",
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
};

function createBrothItem(data) {
  const container = document.getElementById("broth-items");
  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card-broth";

    card.onclick = () => handleClickElement(".card-broth", card, item);

    const img = document.createElement("img");
    img.src = item.imageInactive;
    img.className = "card-image";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.textContent = item.name;
    title.className = "card-title";

    const text = document.createElement("p");
    text.textContent = item.description;
    text.className = "card-text";

    const price = document.createElement("p");
    price.textContent = `US$ ${item.price}`;
    price.className = "card-price";

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(price);
    card.appendChild(img);
    card.appendChild(body);
    container.appendChild(card);
  });
}

function createMeatItem(data) {
  const container = document.getElementById("meat-items");
  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card-meat";
    card.onclick = () => handleClickElement(".card-meat", card, item);

    const img = document.createElement("img");
    img.src = item.imageInactive;
    img.className = "card-image";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.textContent = item.name;
    title.className = "card-title";

    const text = document.createElement("p");
    text.textContent = item.description;
    text.className = "card-text";

    const price = document.createElement("p");
    price.textContent = `US$ ${item.price}`;
    price.className = "card-price";

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(price);
    card.appendChild(img);
    card.appendChild(body);
    container.appendChild(card);
  });
}

function createMeatSlide(data) {
    const slidesContainer = document.querySelector(".slides");
    const indicatorsContainer = document.querySelector(".indicators");

    slidesContainer.innerHTML = "";
    indicatorsContainer.innerHTML = "";

    data.forEach((item, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";

        const card = document.createElement("div");
        card.className = "card-meat";
        card.onclick = () => handleClickElement(".card-meat", card, item);

        const img = document.createElement("img");
        img.src = item.imageInactive;
        img.className = "card-image";

        const body = document.createElement("div");
        body.className = "card-body";

        const title = document.createElement("h3");
        title.textContent = item.name;
        title.className = "card-title";

        const text = document.createElement("p");
        text.textContent = item.description;
        text.className = "card-text";

        const price = document.createElement("p");
        price.textContent = `US$ ${item.price}`;
        price.className = "card-price";

        body.appendChild(title);
        body.appendChild(text);
        body.appendChild(price);
        card.appendChild(img);
        card.appendChild(body);

        slide.appendChild(card);
        slidesContainer.appendChild(slide);

        const indicator = document.createElement("span");
        indicator.className = "indicator";
        indicator.addEventListener('click', () => changeSlide(index));
        if (index === 0) {
            indicator.classList.add("active");
        }
        indicatorsContainer.appendChild(indicator);
    });
}

function changeSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach((slide, idx) => {
        if (idx === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    indicators.forEach((indicator, idx) => {
        if (idx === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function handleClickElement(cardContainerClass, card, item) {
  document.querySelectorAll(cardContainerClass).forEach((element) => {
    if (element !== card) {
      element.classList.remove("active");

      const imgElement = element.querySelector("img");
      if (imgElement && imgElement.dataset.originalSrc) {
        imgElement.src = imgElement.dataset.originalSrc;
      }

      element.childNodes[1].childNodes[0].classList.remove("active");
      element.childNodes[1].childNodes[1].classList.remove("active");
      element.childNodes[1].childNodes[2].classList.remove("active");
    }
  });
  card.classList.add("active");

  const imgElement = card.querySelector("img");
  if (imgElement) {
    if (!imgElement.dataset.originalSrc) {
      imgElement.dataset.originalSrc = imgElement.src;
    }
    imgElement.src = item.imageActive;
  }

  card.childNodes[0].src = item.imageActive;
  card.childNodes[1].childNodes[0].classList.add("active");
  card.childNodes[1].childNodes[1].classList.add("active");
  card.childNodes[1].childNodes[2].classList.add("active");
}

function fetchBrothData() {
  fetch("https://api.tech.redventures.com.br/broths", options)
    .then((response) => response.json())
    .then((data) => {
      createBrothItem(data);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      alert("Não foi possível obter os dados da API.");
    });
}

function fetchMeatData() {
  fetch("https://api.tech.redventures.com.br/proteins", options)
    .then((response) => response.json())
    .then((data) => {
      createMeatItem(data);
      createMeatSlide(data)
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      alert("Não foi possível obter os dados da API.");
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
                <button>
                    order now
                    <img class="" src=${arrow} />
                </button>
            </div>
        </div>
    </section>

    <section id="broth-section">
        <h1>First things first: select your favorite broth.</h1>
        <p>It will give the whole flavor on your ramen soup.</p>
        <div id="broth-items"> </div>
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

`;

document.addEventListener("DOMContentLoaded", fetchBrothData);
document.addEventListener("DOMContentLoaded", fetchMeatData);