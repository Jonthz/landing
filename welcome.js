const phrases = [
    "Destácate entre la multitud",
    "Tu portafolio Web personal comienza aquí..."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;

// Encapsular todo dentro del evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM cargado, iniciando efectos de texto");
    
    // Verificar que los elementos necesarios existen
    const mainTitle = document.getElementById("main-title");
    const skipButton = document.getElementById("skipButton");
    
    if (!mainTitle) {
        console.error("Elemento 'main-title' no encontrado");
        return;
    }
    
    if (skipButton) {
        skipButton.addEventListener('click', () => window.location.href = './merge.html');
        
        setTimeout(() => {
            skipButton.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
            skipButton.classList.add('opacity-100', 'scale-100');
        }, 500);
    } else {
        console.warn("Botón de saltar no encontrado");
    }
    
    // Iniciar la animación del texto
    welcome();
});

async function welcome() {
    // Definir correctamente la función callback
    const callback = () => console.log("Callback executed");
    
    typeWrite("main-title", phrases[currentPhraseIndex], 90, callback);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await sleep(4700);
    
    typeDelete("main-title", 60, () => {
        if (currentPhraseIndex < phrases.length - 1) {
            typeWrite("main-title", phrases[currentPhraseIndex + 1], 125, callback);
        } else {
            console.log("All phrases have been typed and deleted.");
        }
    });

    setTimeout(() => {
        console.log("Redirigiendo a merge.html");
        try {
            window.location.href = 'merge.html'; 
        } catch (error) {
            console.error("Error al redirigir:", error);
        }
    }, 7200); 
}

function typeWrite(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    
    // Verificar si el elemento existe
    if (!element) {
        console.error(`Elemento con ID "${elementId}" no encontrado`);
        return;
    }
    
    const interval = setInterval(() => {
        element.textContent += text.charAt(currentCharIndex); 
        currentCharIndex++;
        if (currentCharIndex === text.length) {
            clearInterval(interval);
            setTimeout(callback, 500);
        }
    }, speed);
}

function typeDelete(elementId, speed, callback) {
    const element = document.getElementById(elementId);
    
    // Verificar si el elemento existe
    if (!element) {
        console.error(`Elemento con ID "${elementId}" no encontrado`);
        return;
    }
    
    const interval = setInterval(() => {
        if (currentCharIndex > 0) {
            element.textContent = element.textContent.slice(0, -1);
            currentCharIndex--;
        } else {
            clearInterval(interval);
            currentPhraseIndex++;
            if (currentPhraseIndex < phrases.length) {
                typeWrite(elementId, phrases[currentPhraseIndex], speed, callback);
            } else {
                callback();
            }
        }
    }, speed);
}

