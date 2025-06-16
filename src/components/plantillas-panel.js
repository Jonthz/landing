const templates = [
    {
        name: "Administración",
        src: "/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    },
    {
        name: "Salud",
        src: "/plantillas/plantillaSalud.html",
        img: "Images/imgPlantillaSalud.webp"
    },
    // Agrega más plantillas para probar el efecto carrusel
    {
        name: "E-commerce",
        src: "/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    },
    {
        name: "Blog",
        src: "/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    },
    {
        name: "Portfolio",
        src: "/plantillas/plantillaAdministracion.html",
        img: "Images/imgPlantillaAdmi.webp"
    }
];

let currentIndex = 0;
let isTransitioning = false;

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado, inicializando carrusel");
    
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
        
        /* Estilos simplificados para el carrusel */
        #template-list {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-x: auto;
            position: relative;
            padding: 1rem 0;
            width: 100%;
            scroll-behavior: smooth;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
        }
        
        #template-list::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }
        
        /* Tarjeta del carrusel */
        .carousel-item {
            flex: 0 0 auto;
            transition: all 0.5s ease;
            margin: 0 0.5rem;
            transform-origin: center center;
        }
        
        /* Efectos de escala */
        .carousel-item:not(.active) {
            transform: scale(0.85);
            opacity: 0.7;
        }
        
        .carousel-item.active {
            transform: scale(1);
            opacity: 1;
        }
        
        /* Espaciadores */
        .carousel-spacer {
            flex: 0 0 auto;
        }
    `;
    document.head.appendChild(style);

    // Verificar que todos los elementos existen
    if (!templateList) {
        console.error('No se encontró el elemento #template-list');
        return;
    }
    if (!iframe) {
        console.error('No se encontró el elemento #plantilla-iframe');
        return;
    }
    if (!prevBtn) {
        console.error('No se encontró el elemento #prev-template');
        return;
    }
    if (!nextBtn) {
        console.error('No se encontró el elemento #next-template');
        return;
    }
    
    console.log("Elementos encontrados correctamente");

    // Array para almacenar referencias a los elementos de plantilla
    let templateItems = [];

    function renderTemplateList() {
        console.log("Renderizando lista de plantillas");
        templateList.innerHTML = '';
        templateItems = []; // Reiniciar el array
        
        // Espaciador inicial
        const spacerStart = document.createElement('div');
        spacerStart.className = 'carousel-spacer';
        spacerStart.style.width = 'calc(50% - 88px)';
        templateList.appendChild(spacerStart);
        
        templates.forEach((tpl, idx) => {
            const item = document.createElement('button');
            
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
                console.log(`Cambiando a plantilla ${idx}: ${tpl.name}`);
                smoothUpdateIframe();
                renderTemplateList();
            };
            
            templateList.appendChild(item);
            templateItems.push(item); // Guardar referencia al elemento
        });
        
        // Espaciador final
        const spacerEnd = document.createElement('div');
        spacerEnd.className = 'carousel-spacer';
        spacerEnd.style.width = 'calc(50% - 88px)';
        templateList.appendChild(spacerEnd);
        
        // Centrar después de renderizar
        setTimeout(centerActiveItem, 50);
    }

    // Función corregida para centrar el elemento activo
    function centerActiveItem() {
        if (!templateItems[currentIndex]) {
            console.error("No se puede centrar: elemento no encontrado");
            return;
        }
        
        const activeItem = templateItems[currentIndex];
        
        // Calcular la posición para centrar
        const containerWidth = templateList.offsetWidth;
        const itemOffsetLeft = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;
        
        // Calcular el scroll necesario para centrar el elemento
        const scrollTo = Math.max(0, itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2));
        
        console.log(`Centrando: item ${currentIndex}, scroll a ${scrollTo}px, offsetLeft: ${itemOffsetLeft}`);
        
        // Aplicar scroll suave
        templateList.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }

    function updateIframe() {
        if (!iframe) return;
        iframe.src = templates[currentIndex].src;
        iframe.title = templates[currentIndex].name;
    }
    
    function smoothUpdateIframe() {
        if (!iframe || isTransitioning) return;
        
        isTransitioning = true;
        console.log("Iniciando transición de iframe");
        
        // Fade out
        iframe.classList.add('fade-out');
        
        setTimeout(() => {
            // Cambiar la fuente
            iframe.src = templates[currentIndex].src;
            iframe.title = templates[currentIndex].name;
            
            // Cuando la nueva página termine de cargar
            iframe.onload = () => {
                console.log("Iframe cargado, iniciando fade-in");
                // Fade in
                iframe.classList.remove('fade-out');
                iframe.classList.add('fade-in');
                
                // Limpiar clases después de la animación
                setTimeout(() => {
                    iframe.classList.remove('fade-in');
                    isTransitioning = false;
                    console.log("Transición completada");
                }, 300);
            };
            
            // Por si el evento onload no se dispara
            setTimeout(() => {
                if (isTransitioning) {
                    console.log("Fallback por timeout del iframe");
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
        console.log(`Cambiando a plantilla anterior: ${currentIndex}`);
        smoothUpdateIframe();
        renderTemplateList();
    };
    
    nextBtn.onclick = (e) => {
        e.preventDefault();
        
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % templates.length;
        console.log(`Cambiando a plantilla siguiente: ${currentIndex}`);
        smoothUpdateIframe();
        renderTemplateList();
    };

    console.log("Inicializando carrusel");
    renderTemplateList();
    updateIframe();
    
    // Reajustar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', centerActiveItem);
    
    console.log("Carrusel inicializado correctamente");
});