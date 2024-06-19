export function createBrothSlide(data) {
  const container = document.getElementById("broth-carousel"); 
  const slidesContainer = document.querySelector(".broth-slides");
  const indicatorsBrothContainer = document.querySelector(".broth-indicators");

  slidesContainer.innerHTML = "";
  indicatorsBrothContainer.innerHTML = "";

  let touchStartX = 0;
  let touchEndX = 0;
  let slideData = data; 

  const handleTouchStart = (event) => {
    touchStartX = event.changedTouches[0].screenX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    if (touchEndX < touchStartX) {
      changeToNextSlide();
    } else if (touchEndX > touchStartX) {
      changeToPreviousSlide();
    }
  };

  slidesContainer.addEventListener('touchstart', handleTouchStart);
  slidesContainer.addEventListener('touchend', handleTouchEnd);

  data.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "broth-slide";

    const card = document.createElement("div");
    card.className = "card-broth";

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
    indicatorsBrothContainer.appendChild(indicator);

    if (index === 0) {
      indicator.classList.add("active");
      slide.classList.add("active");
      const event = new CustomEvent('itemSelected', {
        detail: { brothItem: slideData[index].id }
      });
      container.dispatchEvent(event);
    }
  });

  function changeBrothSlide(index) {
    const slides = document.querySelectorAll(".broth-slide");
    const indicators = document.querySelectorAll(".broth-indicator");
    
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === index);
    });

    indicators.forEach((indicator, idx) => {
      indicator.classList.toggle("active", idx === index);
    });

    if (index >= 0 && index < slideData.length) {
      const event = new CustomEvent('itemSelected', {
        detail: { brothItem: slideData[index].id }
      });
      document.dispatchEvent(event);
    }
  }

  function changeToNextSlide() {
    const activeIndex = findActiveSlideIndex();
    if (activeIndex < slideData.length - 1) {
      changeBrothSlide(activeIndex + 1);
    }
  }

  function changeToPreviousSlide() {
    const activeIndex = findActiveSlideIndex();
    if (activeIndex > 0) {
      changeBrothSlide(activeIndex - 1);
    }
  }

  function findActiveSlideIndex() {
    const slides = document.querySelectorAll(".broth-slide");
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains("active")) {
        return i;
      }
    }
    return -1;
  }

  return { changeBrothSlide, findActiveSlideIndex };
}
