export function createBrothSlide(data) {
  const slidesContainer = document.querySelector(".broth-slides");
  const indicatorsBrothContainer = document.querySelector(".broth-indicators");

  slidesContainer.innerHTML = "";
  indicatorsBrothContainer.innerHTML = "";

  data.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "broth-slide";

    const card = document.createElement("div");
    card.className = "card-broth";
    card.onclick = () => handleClickElement(".card-broth", card, item);

    const img = document.createElement("img");
    img.src = item.imageActive;
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
    indicator.className = "broth-indicator";
    indicator.addEventListener("click", () => changeBrothSlide(index));
    if (index === 0) {
      indicator.classList.add("active");
      slide.classList.add("active");
    }
    indicatorsBrothContainer.appendChild(indicator);
  });
}

function changeBrothSlide(index) {
  const slides = document.querySelectorAll(".broth-slide");
  const indicators = document.querySelectorAll(".broth-indicator");

  slides.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  indicators.forEach((indicator, idx) => {
    if (idx === index) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}