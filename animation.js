// const { createRunnableDevEnvironment } = require("vite");

// Espera a que cargue la página
// window.addEventListener('load', () => {
//     Después de 3 segundos, ocultamos la animación y redirigimos a la página principal
//     setTimeout(() => {
//     const loader = document.getElementById('loader');
//     loader.classList.add('fade'); // Aplicamos la animación fadeOut
//     setTimeout(() => {
//         window.location.href = 'index.html'; // Redirige a index.html después de la animación
//     }, 1000); // Tiempo de espera antes de la redirección (durante el fade)
//     }, 3000); // Duración de la animación (en milisegundos)
// });

// document.getElementById("seeMoreBtn").addEventListener("click", function() {
//   document.getElementById("expanded-content").scrollIntoView({ behavior: "smooth" });
// });

function showNavAfterDelay(id, content) {
setTimeout(function() {
var nav_ = document.getElementById(id);
nav_.style.display = 'flex';
nav_.style.justifyContent = content;

}, 4000);
}

window.addEventListener("load", showNavAfterDelay('nav', 'space-between'))
window.addEventListener("load", showNavAfterDelay('seeMoreBtn', 'space-around'))

const tooltip = document.getElementById("tooltip");

const tooltipContainer = document.getElementById("tooltip-container");

tooltip.addEventListener("mouseover", function() {
    tooltipContainer.style.display = "block";

    tooltipContainer.classList.add("fade-in");

    //tooltipContainer.style.left = tooltip.getBoundingClientRect().left + "px";
    tooltipContainer.style.left = e.pageX + "px";
    tooltipContainer.style.top = e.pageY + "px"; // Ajusta la posición vertical
});
tooltip.addEventListener("mouseout", function() {
  tooltipContainer.style.display = "none";
});

