import { db } from '../config/firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando testimonios...");
    loadTestimonials();
});

async function loadTestimonials() {
    try {
        // Contenedor de testimonios
        const testimonialsContainer = document.getElementById('testimonials-container');
        if (!testimonialsContainer) {
            console.error("No se encontró el contenedor de testimonios");
            return;
        }

        // Mostrar loader
        testimonialsContainer.innerHTML = `
            <div class="flex justify-center items-center py-10">
                <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
        `;

        // Realizar el GET a Firebase
        const testimonialsRef = ref(db, 'testimonials');
        const snapshot = await get(testimonialsRef);

        if (snapshot.exists()) {
            // Convertir los datos a un array
            const testimonials = [];
            snapshot.forEach((childSnapshot) => {
                testimonials.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            // Ordenar por fecha o rating
            testimonials.sort((a, b) => b.rating - a.rating);

            // Mostrar los testimonios
            if (testimonials.length > 0) {
                testimonialsContainer.innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${testimonials.map(testimonial => `
                            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div class="flex items-center mb-4">
                                    <div class="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold">${testimonial.name}</h4>
                                        <p class="text-sm text-gray-500">${testimonial.company}</p>
                                    </div>
                                </div>
                                
                                <div class="mb-3 flex">
                                    ${generateStarRating(testimonial.rating)}
                                </div>
                                
                                <p class="text-gray-700">${testimonial.text}</p>
                                
                                <p class="mt-4 text-sm text-gray-500">
                                    ${formatDate(testimonial.date)}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                testimonialsContainer.innerHTML = `
                    <div class="text-center py-8">
                        <p>Aún no hay testimonios disponibles.</p>
                    </div>
                `;
            }
        } else {
            testimonialsContainer.innerHTML = `
                <div class="text-center py-8">
                    <p>Aún no hay testimonios disponibles.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error al cargar testimonios:", error);
        document.getElementById('testimonials-container').innerHTML = `
            <div class="text-center py-8 text-red-600">
                <p>Error al cargar los testimonios. Por favor, intenta más tarde.</p>
            </div>
        `;
    }
}

function generateStarRating(rating) {
    let starsHTML = '';
    
    // Estrellas completas
    for (let i = 0; i < Math.floor(rating); i++) {
        starsHTML += `<svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>`;
    }
    
    // Media estrella si es necesario
    if (rating % 1 >= 0.5) {
        starsHTML += `<svg class="w-5 h-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <defs>
                <linearGradient id="half">
                    <stop offset="50%" stop-color="currentColor"></stop>
                    <stop offset="50%" stop-color="#e5e7eb"></stop>
                </linearGradient>
            </defs>
            <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>`;
    }
    
    // Estrellas vacías
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += `<svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>`;
    }
    
    return starsHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}