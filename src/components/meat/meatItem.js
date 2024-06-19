import "../../style/meatItem.css";

export function createMeatItem(data) {
  const container = document.getElementById("meat-items");
  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card-meat";
    card.onclick = () => {
      handleClickElement(".card-meat", card, item);
      const event = new CustomEvent("itemSelected", {
        detail: { meatItem: item.id },
      });
      container.dispatchEvent(event);
    };

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
