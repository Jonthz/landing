"use strict";

// Importar la función fetchFakerData
import { fetchFakerData } from './functions.js';

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
    
    /**
     * Renderiza tarjetas con los datos proporcionados en el contenedor.
     * Toma los primeros tres elementos del arreglo y crea tarjetas de TailwindCSS.
     * 
     * @param {Array<Object>} data - Arreglo de objetos con title, author, genre y content
     * @returns {void} No retorna ningún valor.
     */
    const renderCards = (data) => {
        // Usar el skeleton-container para las tarjetas complejas
        const skeletonContainer = document.getElementById('skeleton-container');
        if (skeletonContainer) {
            // Vaciar el contenedor
            skeletonContainer.innerHTML = '';
            
            // Tomar solo los tres primeros elementos
            const itemsToRender = data.slice(0, 3);
            
            // Crear y añadir tarjetas
            itemsToRender.forEach(item => {
                const card = `
                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.title}</h5>
                        <div class="flex gap-2 mb-3">
                            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">${item.author}</span>
                            <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">${item.genre}</span>
                        </div>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${item.content}</p>
                        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Leer más
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                `;
                skeletonContainer.innerHTML += card;
            });
        }
        
        // ADEMÁS usar el faker-texts para mostrar textos simples
        const textsContainer = document.getElementById('faker-texts');
        if (textsContainer) {
            // Vaciar los placeholders
            textsContainer.innerHTML = '';
            
            // Mostrar todos los textos
            data.forEach(item => {
                const card = `
                    <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-700">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${item.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300">${item.content}</p>
                    </div>
                `;
                textsContainer.innerHTML += card;
            });
        }
    };
    
    /**
     * Carga datos de la API Faker y los muestra en la consola.
     * 
     * @async
     * @returns {Promise<void>} No retorna ningún valor.
     */
    const loadData = async () => {
        const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';
        
        try {
            const result = await fetchFakerData(url);
            
            if (result.success) {
                console.log('Datos obtenidos correctamente:', result.body);
                renderCards(result.body);
            } else {
                console.error('Error al obtener datos:', result.error);
                
                // Mostrar mensaje de error en ambos contenedores
                const errorMessage = `
                    <div class="col-span-full p-6 bg-red-50 rounded-lg dark:bg-gray-700">
                        <p class="text-red-500 dark:text-red-400">${result.error}</p>
                    </div>
                `;
                
                const textsContainer = document.getElementById('faker-texts');
                if (textsContainer) {
                    textsContainer.innerHTML = errorMessage;
                }
                
                const skeletonContainer = document.getElementById('skeleton-container');
                if (skeletonContainer) {
                    skeletonContainer.innerHTML = errorMessage;
                }
            }
        } catch (error) {
            console.error('Error inesperado:', error);
        }
    };
    
    // Llamar a las funciones
    showToast();
    showVideo();
    loadData();
})();