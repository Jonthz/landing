"use strict";

// Importar la función fetchFakerData
import { fetchFakerData } from './functions.js';
import {  getVotes,
 saveVote } from './firebase.js';

 
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
     * Habilita el formulario de votación para guardar datos en Firebase.
     * Agrega un event listener al formulario que envía los datos a Firebase
     * cuando se realiza un submit.
     * 
     * @returns {void} No retorna ningún valor.
     */
    const enableForm = () => {
        const form = document.getElementById('form_voting');
        if (form) {
            form.addEventListener('submit', async (event) => {
                // Prevenir el comportamiento por defecto del formulario
                event.preventDefault();
                
                // Obtener el valor del campo de entrada
                const productSelect = document.getElementById('select_product');
                const productID = productSelect.value;
                
                // Llamar a la función saveVote con el valor obtenido
                const result = await saveVote(productID);
                
                // Mostrar resultado (opcional)
                if (result.success) {
                    console.log(result.message);
                    // Aquí podrías mostrar un mensaje de éxito al usuario
                    
                    // Actualizar la tabla de votos después de guardar un voto exitosamente
                    await displayVotes();
                } else {
                    console.error(result.message, result.error);
                    // Aquí podrías mostrar un mensaje de error al usuario
                }
                
                // Limpiar el formulario
                form.reset();
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
    
    /**
     * Obtiene y muestra los votos actuales en una tabla HTML.
     * 
     * @async
     * @returns {Promise<void>} No retorna ningún valor.
     */
    const displayVotes = async () => {
        try {
            // Obtener el elemento donde se mostrarán los resultados
            const resultsContainer = document.getElementById('results');
            if (!resultsContainer) return;
            
            // Mostrar un indicador de carga
            resultsContainer.innerHTML = '<p class="text-center">Cargando votos...</p>';
            
            // Obtener los votos usando la función getVotes
            const votes = await getVotes();
            
            if (!votes) {
                resultsContainer.innerHTML = '<p class="text-center">No hay votos disponibles</p>';
                return;
            }
            
            // Procesar los votos para contar por producto
            const voteCount = {};
            
            // Iterar sobre los votos y contar por productID
            Object.values(votes).forEach(vote => {
                const productID = vote.productID;
                if (!voteCount[productID]) {
                    voteCount[productID] = 0;
                }
                voteCount[productID]++;
            });
            
            // Crear la tabla HTML
            let tableHTML = `
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Producto</th>
                            <th scope="col" class="px-6 py-3">Total de Votos</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            // Agregar filas a la tabla
            Object.entries(voteCount).forEach(([productID, count]) => {
                tableHTML += `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            Producto ${productID}
                        </td>
                        <td class="px-6 py-4">
                            ${count}
                        </td>
                    </tr>
                `;
            });
            
            // Cerrar la tabla
            tableHTML += `
                    </tbody>
                </table>
            </div>
            `;
            
            // Mostrar la tabla en el contenedor
            resultsContainer.innerHTML = tableHTML;
            
        } catch (error) {
            console.error('Error al mostrar votos:', error);
            const resultsContainer = document.getElementById('results');
            if (resultsContainer) {
                resultsContainer.innerHTML = `
                    <div class="p-4 bg-red-50 rounded-lg dark:bg-gray-700">
                        <p class="text-red-500 dark:text-red-400">Error al cargar los votos: ${error.message}</p>
                    </div>
                `;
            }
        }
    };
    
    // Llamar a las funciones
    showToast();
    showVideo();
    loadData();
    enableForm(); // Invocar la función enableForm
    displayVotes(); // Invocar la función displayVotes para mostrar los votos actuales
})();