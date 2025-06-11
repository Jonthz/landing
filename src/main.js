import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

import { fetchFakerData } from './functions.js';

const renderCards = (items) => {
    const firstThree = items.slice(0, 3);
    const cardsHtml = firstThree.map(item => `
        <div class="card bg-white rounded-lg shadow-md p-6 mb-4">
            <h3 class="text-xl font-bold mb-2">${item.text}</h3>
            <p class="text-gray-700 mb-1"><strong>Texto:</strong> ${item.text}</p>
        </div>
    `).join('');
    
    const container = document.getElementById('skeleton-container');
    if (container) {
        container.innerHTML = cardsHtml;
    }
};

const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';
    try {
        const result = await fetchFakerData(url);
        if (result.success) {
            renderCards(result.body);
            console.log('Datos obtenidos con éxito:', result.body);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }
    } catch (error) {
        console.error('Ocurrió un error inesperado:', error);
    }
};

(() => {
    loadData();
})();

