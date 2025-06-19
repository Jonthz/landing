// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón
    const btn = document.getElementById("seeMoreBtn");
    
    // Verificar si el botón existe
    if (btn) {
        // Primero mostrar el botón que está oculto
        btn.style.display = 'block';
        
        // Añadir el event listener
        btn.addEventListener('click', function() {
            const contentToShow = document.getElementById("after-ver-mas");
            if (contentToShow) {
                contentToShow.style.display = 'block';
            }
        });
    }
});





