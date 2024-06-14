import "./style.css";
import backgroundImage from "./src/assets/backgroundImage.svg";
import ilustration from "./src/assets/ilustration.svg";
import arrow from "./src/assets/arrow.svg";

document.querySelector("#app").innerHTML = `
    <div class="hero-container" style="background-image: url(${backgroundImage})">
    <div class="ilustration-container">
        <img class="ilustration-image" src=${ilustration} />
    </div>
        <div class="go-container">
            <p> ラーメン </p>
            <h1>GO!</h1>
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
`;