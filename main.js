import "./style.css";
import "./firstSection.css";
import backgroundImage from "./src/assets/backgroundImage.svg";
import ilustration from "./src/assets/ilustration.svg";
import arrow from "./src/assets/arrow.svg";
import logo from "./src/assets/logo.svg";

const options = {
    method: 'GET',
    headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
    }
};

function fetchBrothData() {
    fetch('https://api.tech.redventures.com.br/broths',options)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
        alert('Não foi possível obter os dados da API.');
    });
}

document.querySelector("#app").innerHTML = `
    <div class="first-section" style="background-image: url(${backgroundImage})">
        <div class="sidebar-container">
            <img class="logo-image" src=${logo} />
        </div>
        <div class="hero-container">
            <div class="ilustration-container">
                <img class="ilustration-image" src=${ilustration} />
            </div>
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
    </div>
`;

document.addEventListener('DOMContentLoaded', fetchBrothData);