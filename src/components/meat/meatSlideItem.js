export function createMeatSlide(data) {
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
    indicator.className = "indicator";
    indicator.addEventListener("click", () => changeSlide(index));
    if (index === 0) {
      indicator.classList.add("active");
      slide.classList.add("active");
    }
    indicatorsContainer.appendChild(indicator);
  });
}

function changeSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

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
