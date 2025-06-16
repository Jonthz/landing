import { db } from '../config/firebase.js';
import { ref, push, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
  
// IMPORTANTE: Usar una función nombrada en lugar de un event listener anónimo
function initPopup() {
    console.log("Inicializando popup...");
    
    // Forzar que aparezca el popup para depuración (comentar en producción)
    //sessionStorage.removeItem('popup_shown');
    
    // Verificar si ya se mostró el popup en esta sesión
    const popupShownThisSession = sessionStorage.getItem('popup_shown');
    console.log("Popup ya mostrado:", popupShownThisSession ? "Sí" : "No");
    
    if (!popupShownThisSession) {
        console.log("Programando popup para mostrar en 3 segundos...");
        // Esperar unos segundos antes de mostrar el popup
        setTimeout(() => {
            console.log("Mostrando popup ahora");
            createAndShowPopup();
        }, 3000); // Mostrar después de 3 segundos
    }
}

// El resto de funciones igual...
function createAndShowPopup() {
    console.log("Creando popup...");
    // Crear el contenedor del popup
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    popupOverlay.id = 'popup-overlay';
    
    // Contenido del popup
    popupOverlay.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full m-4 transform transition-all duration-300 scale-95 opacity-0" id="popup-content">
            <div class="relative p-6">
                <!-- Botón de cierre -->
                <button id="close-popup" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <!-- Encabezado -->
                <div class="text-center mb-6">
                    <div class="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900">¡Bienvenido a Sengicon!</h3>
                    <p class="text-gray-600 mt-2">Déjanos tus datos para recibir información sobre nuestros servicios de diseño web.</p>
                </div>
                
                <!-- Formulario -->
                <form id="popup-lead-form" class="space-y-4">
                    <div>
                        <label for="popup-name" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input 
                            type="text" 
                            id="popup-name" 
                            name="name" 
                            required 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Tu nombre"
                        >
                    </div>
                    
                    <div>
                        <label for="popup-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            id="popup-email" 
                            name="email" 
                            required 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="tucorreo@ejemplo.com"
                        >
                    </div>
                    
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input 
                                id="popup-more-info" 
                                name="more_info" 
                                type="checkbox" 
                                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            >
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="popup-more-info" class="text-gray-600">
                                Deseo recibir más información sobre servicios y ofertas
                            </label>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        class="w-full bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-[1.02] duration-200 flex items-center justify-center"
                    >
                        <span>Quiero saber más</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </form>
                
                <!-- Texto legal -->
                <p class="text-xs text-gray-500 mt-4 text-center">
                    Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio.
                </p>
            </div>
        </div>
    `;
    
    // Añadir al DOM
    document.body.appendChild(popupOverlay);
    
    // Animar entrada
    setTimeout(() => {
        const popupContent = document.getElementById('popup-content');
        popupContent.classList.remove('scale-95', 'opacity-0');
        popupContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    // Manejar cierre del popup
    document.getElementById('close-popup').addEventListener('click', closePopup);
    
    // También cerrar cuando se hace clic fuera
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Manejar envío del formulario
    document.getElementById('popup-lead-form').addEventListener('submit', handlePopupFormSubmit);
    
    // Marcar como mostrado en esta sesión
    sessionStorage.setItem('popup_shown', 'true');
}

function closePopup() {
    const popupContent = document.getElementById('popup-content');
    const popupOverlay = document.getElementById('popup-overlay');
    
    // Animar salida
    popupContent.classList.remove('scale-100', 'opacity-100');
    popupContent.classList.add('scale-95', 'opacity-0');
    
    // Eliminar después de la animación
    setTimeout(() => {
        if (popupOverlay) {
            popupOverlay.remove();
        }
    }, 300);
}


async function handlePopupFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('popup-name').value;
    const email = document.getElementById('popup-email').value;
    const wantsMoreInfo = document.getElementById('popup-more-info').checked;
    
    // Cambiar botón a estado de carga
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonContent = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2">Enviando...</span>
    `;
    
    try {
        // Preparar los datos
        const leadData = {
            name,
            email,
            wantsMoreInfo,
            source: 'popup',
            timestamp: new Date().toISOString()
        };
        
        // Guardar en Firebase
        const leadsRef = ref(db, 'leads');
        const newLeadRef = push(leadsRef);
        await set(newLeadRef, leadData);
        
        // Mostrar mensaje de éxito
        closePopup();
        
        // Crear y mostrar mensaje de agradecimiento
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'fixed bottom-5 right-5 bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-lg z-50 transform transition-all duration-500 translate-x-full';
        thankYouMessage.innerHTML = `
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">
                        ¡Gracias ${name}! Hemos recibido tu información.
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(thankYouMessage);
        
        // Mostrar con animación
        setTimeout(() => {
            thankYouMessage.classList.remove('translate-x-full');
            thankYouMessage.classList.add('translate-x-0');
        }, 100);
        
        // Eliminar después de unos segundos
        setTimeout(() => {
            thankYouMessage.classList.remove('translate-x-0');
            thankYouMessage.classList.add('translate-x-full');
            
            // Eliminar del DOM después de la animación
            setTimeout(() => {
                thankYouMessage.remove();
            }, 500);
        }, 5000);
        
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        
        // Restaurar el botón
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
        
        // Mostrar error
        alert('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
}

// Este enfoque evita conflictos con otros event listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
} else {
    // Si el DOM ya está cargado, ejecutar inmediatamente
    initPopup();
}