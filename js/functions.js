"use strict";

/**
 * Obtiene datos de texto de la API Faker.
 * Realiza una solicitud a la API fakerapi.it para obtener textos aleatorios.
 * 
 * @param {string} [url='https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120'] - URL de la API
 * @returns {Promise<Object>} Una promesa que resuelve a un objeto con las claves success y body/error.
 */
const fetchFakerData = (url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120') => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                success: true,
                body: data.data
            };
        })
        .catch(error => {
            console.error('Error fetching faker data:', error);
            return {
                success: false,
                error: error.message || 'Error al obtener datos de la API'
            };
        });
};

// Exportar la función para su uso en otros archivos
export { fetchFakerData };