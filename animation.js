
// Espera a que cargue la página
window.addEventListener('load', () => {
    // Después de 3 segundos, ocultamos la animación y redirigimos a la página principal
    setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('fade'); // Aplicamos la animación fadeOut
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirige a index.html después de la animación
    }, 1000); // Tiempo de espera antes de la redirección (durante el fade)
    }, 3000); // Duración de la animación (en milisegundos)
});
