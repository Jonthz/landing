"use strict";

(function() {
   
    /**
     * Muestra una notificación tipo toast en la pantalla.
     * Busca el elemento con ID 'toast-interactive' y añade la clase 'md:block'
     * para hacerlo visible en la interfaz.
     * 
     * @returns {void} No retorna ningún valor.
     */
    const showToast = () => {
        const toastElement = document.getElementById("toast-interactive");
        if (toastElement) {
            toastElement.classList.add('md:block');
        }
    };
    
    // Llamar a la función showToast
    showToast();

    
    /**
     * Agrega un manejador de eventos al botón de demostración.
     * Busca el elemento con ID 'demo' y le añade un evento de clic
     * que abre un video de YouTube en una nueva pestaña.
     * 
     * @returns {void} No retorna ningún valor.
     */
    const showVideo = () => {
        const demoElement = document.getElementById('demo');
        if (demoElement) {
            demoElement.addEventListener('click', () => {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            });
        }
    };
    
    // Llamar a la función showVideo
    showVideo();
    
})();