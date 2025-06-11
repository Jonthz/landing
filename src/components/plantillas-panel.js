const templates = [
    {
        name: "Administración",
        src: "public/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    },
    {
        name: "Salud",
        src: "public/plantillas/plantillaSalud.html",
        img: "Images/imgPlantillaSalud.webp"
    },
    // Agrega más plantillas para probar el efecto carrusel
    {
        name: "E-commerce",
        src: "public/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    },
    {
        name: "Blog",
        src: "public/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    },
    {
        name: "Portfolio",
        src: "public/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    }
];

let currentIndex = 0;
let isTransitioning = false;

window.addEventListener('DOMContentLoaded', () => {
    const templateList = document.getElementById('template-list');
    const iframe = document.getElementById('plantilla-iframe');
    const prevBtn = document.getElementById('prev-template');
    const nextBtn = document.getElementById('next-template');
    
    // Estilos para el carrusel y las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .fade-out {
            animation: fadeOut 0.3s ease-out forwards;
        }
        .fade-in {
            animation: fadeIn 0.3s ease-in forwards;
        }
        
        /* Estilos para el carrusel */
        #template-list {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-x: hidden;
            position: relative;
            padding: 1rem 0;
            width: 100%;
            scroll-behavior: smooth;
        }
        
        /* Tarjeta del carrusel */
        .carousel-item {
            transition: all 0.5s ease;
            margin: 0 0.5rem;
            transform-origin: center center;
        }
        
        /* Efecto para los elementos no seleccionados */
        .carousel-item:not(.active) {
            transform: scale(0.85);
            opacity: 0.7;
        }
        
        /* Efecto para el elemento activo */
        .carousel-item.active {
            transform: scale(1);
            opacity: 1;
        }
            /* Estilos para el carrusel */
#template-list {
    display: flex;
    align-items: center;
    /* Cambiado de justify-content: center a justify-content: flex-start */
    justify-content: flex-start;
    overflow-x: auto;
    position: relative;
    padding: 1rem 0;
    width: 100%;
    scroll-behavior: smooth;
    /* Esconder scrollbar */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
}

#template-list::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

/* Tarjeta del carrusel */
.carousel-item {
    flex: 0 0 auto; /* Importante: evita que los elementos se estiren */
    transition: all 0.5s ease;
    margin: 0 0.5rem;
    transform-origin: center center;
}
    `;
    document.head.appendChild(style);

    // Verificar que todos los elementos existen
    if (!templateList) console.error('No se encontró el elemento #template-list');
    if (!iframe) console.error('No se encontró el elemento #plantilla-iframe');
    if (!prevBtn) console.error('No se encontró el elemento #prev-template');
    if (!nextBtn) console.error('No se encontró el elemento #next-template');

    function renderTemplateList() {
        if (!templateList) return;
        
        templateList.innerHTML = '';
        
        // Añadir elemento espaciador al principio
        const spacerStart = document.createElement('div');
        spacerStart.className = 'flex-grow-0 w-[calc(50%-80px)] min-w-[80px]';
        templateList.appendChild(spacerStart);
        
        templates.forEach((tpl, idx) => {
            const item = document.createElement('button');
            
            // Añadir clase carousel-item para los efectos del carrusel
            item.className = `relative overflow-hidden rounded-lg transition-all duration-200 w-44 h-32 carousel-item
                ${idx === currentIndex ? 'active ring-2 ring-primary ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'}`;
            
            item.innerHTML = `
                <div class="absolute inset-0">
                    <img src="${tpl.img}" alt="${tpl.name}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
                    <span class="font-bold text-white text-center text-sm block">${tpl.name}</span>
                </div>
            `;
            
            item.onclick = () => {
                if (isTransitioning) return;
                currentIndex = idx;
                smoothUpdateIframe();
                renderTemplateList();
                centerActiveItem();
            };
            
            templateList.appendChild(item);
        });
        
        // Añadir elemento espaciador al final
        const spacerEnd = document.createElement('div');
        spacerEnd.className = 'flex-grow-0 w-[calc(50%-80px)] min-w-[80px]';
        templateList.appendChild(spacerEnd);
        
        // Centrar el elemento activo después de renderizar
        centerActiveItem();
    }

    // Función mejorada para centrar el elemento activo en el carrusel
    function centerActiveItem() {
        if (!templateList || !templateList.children[currentIndex]) return;
        
        // Esperamos un momento para asegurar que el DOM está actualizado
        setTimeout(() => {
            const activeItem = templateList.children[currentIndex];
            
            // Calculamos el centro del viewport
            const containerCenter = templateList.offsetWidth / 2;
            
            // Calculamos la posición del centro del elemento activo
            const itemCenter = activeItem.offsetLeft + (activeItem.offsetWidth / 2);
            
            // Calculamos cuánto debemos desplazar
            const scrollAmount = itemCenter - containerCenter;
            
            // Aplicamos el desplazamiento con animación suave
            templateList.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            console.log('Centrando elemento:', currentIndex, 'ScrollAmount:', scrollAmount);
        }, 50);
    }

    function updateIframe() {
        if (!iframe) return;
        iframe.src = templates[currentIndex].src;
        iframe.title = templates[currentIndex].name;
    }
    
    function smoothUpdateIframe() {
        if (!iframe || isTransitioning) return;
        
        isTransitioning = true;
        
        // Fade out
        iframe.classList.add('fade-out');
        
        setTimeout(() => {
            // Cambiar la fuente
            iframe.src = templates[currentIndex].src;
            iframe.title = templates[currentIndex].name;
            
            // Verificar si la carga se completa
            iframe.onload = () => {
                // Fade in
                iframe.classList.remove('fade-out');
                iframe.classList.add('fade-in');
                
                // Limpiar clases después de la animación
                setTimeout(() => {
                    iframe.classList.remove('fade-in');
                    isTransitioning = false;
                }, 300);
            };
            
            // Por si el evento onload no se dispara, establecer un tiempo máximo
            setTimeout(() => {
                if (isTransitioning) {
                    iframe.classList.remove('fade-out');
                    iframe.classList.add('fade-in');
                    setTimeout(() => {
                        iframe.classList.remove('fade-in');
                        isTransitioning = false;
                    }, 300);
                }
            }, 3000);
        }, 300);
    }

    prevBtn.onclick = (e) => {
        e.preventDefault();
        
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + templates.length) % templates.length;
        smoothUpdateIframe();
        renderTemplateList();
        // Llamar a centerActiveItem después de renderizar
        centerActiveItem();
    };
    
    nextBtn.onclick = (e) => {
        e.preventDefault();
        
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % templates.length;
        smoothUpdateIframe();
        renderTemplateList();
        // Llamar a centerActiveItem después de renderizar
        centerActiveItem();
    };

    renderTemplateList();
    updateIframe();
    
    // Ajustar cuando la ventana cambie de tamaño
    window.addEventListener('resize', centerActiveItem);
});