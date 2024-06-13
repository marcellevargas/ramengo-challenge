import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import backgroundImage from './src/assets/backgroundImage.svg';

document.querySelector('#app').innerHTML = `
    <div class="hero-container" style="background-image: url(${backgroundImage})">
        <div class="go-container"></div>
        <div class="ilustration-container"></div>
        <div class="cta-container"></div>
    </div>
`

// setupCounter(document.querySelector('#counter'))
