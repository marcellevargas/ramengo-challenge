import "../../style/meatItem.css";

export function createMeatSlide(data) {
  const container = document.getElementById("meat-carousel");
  const slidesContainer = container.querySelector(".slides");
  const indicatorsContainer = container.querySelector(".indicators");

  slidesContainer.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const activeIndex = findActiveSlideIndex();
    if (touchEndX < touchStartX) {
      changeToNextSlide(activeIndex);
    } else if (touchEndX > touchStartX) {
      changeToPreviousSlide(activeIndex);
    }
  };

  slidesContainer.addEventListener('touchstart', handleTouchStart);
  slidesContainer.addEventListener('touchend', handleTouchEnd);

  data.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const card = document.createElement("div");
    card.className = "card-meat";
    card.onclick = () => handleClickElement(".card-meat", card, item);

    const img = document.createElement("img");
    img.src = item.imageActive;
    img.alt = `image of ${item.name}`;
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
    indicatorsContainer.appendChild(indicator);

    if (index === 0) {
      indicator.classList.add("active");
      slide.classList.add("active");
    
      container.dispatchEvent(new CustomEvent('meatItemSelected', { detail: { meatItem: item.id } }));
    }
  });

  function changeSlide(index) {
    const slides = container.querySelectorAll(".slide");
    const indicators = container.querySelectorAll(".indicator");

    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === index);
      if (idx === index) {
        const event = new CustomEvent('meatItemSelected', { detail: { meatItem: data[idx].id } });
        container.dispatchEvent(event);
      }
    });

    indicators.forEach((indicator, idx) => {
      indicator.classList.toggle("active", idx === index);
    });
  }

  function changeToNextSlide(activeIndex) {
    const slides = container.querySelectorAll(".slide");
    if (activeIndex < slides.length - 1) {
      changeSlide(activeIndex + 1);
    }
  }

  function changeToPreviousSlide(activeIndex) {
    if (activeIndex > 0) {
      changeSlide(activeIndex - 1);
    }
  }

  function findActiveSlideIndex() {
    const slides = container.querySelectorAll(".slide");
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains("active")) {
        return i;
      }
    }
    return -1;
  }
}
