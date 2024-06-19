import "./src/style/success.css";
import "./src/style/reset.css";

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);

    const id = params.get('id');
    const description = params.get('description');
    const image = params.get('image');

    const productImage = document.getElementsByClassName("product-image")[0];
    productImage.src = decodeURIComponent(image);

    const productTitle = document.getElementsByClassName("product-title")[0];
    productTitle.innerText = decodeURIComponent(description);

    const newOrderButton = document.getElementById("new-order")
    newOrderButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = `/`;
    }); 
});
