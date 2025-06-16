
const phrases = [
    "Destácate entre la multitud",
    "Tu portafolio Web personal comienza aquí..."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;

async function welcome(){
    //Disculpe la baja calidad de codigo, pronto se arreglará

    callback = () => console.log("Callback executed");
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
        window.location.href = 'ejemplo.html'; 
    }, 7200); 

}


function typeWrite(elementId, text, speed, callback){

    //elementId is always gun be "main-title"
    const element = document.getElementById(elementId); // I have the power to start writing as a h1

    // if (currentPhraseIndex ===1) {
    //     typeDelete
    // }
    const interval = setInterval(() => {
        element.textContent += text.charAt(currentCharIndex); 
        currentCharIndex++;
        if (currentCharIndex === text.length) {
            clearInterval(interval);
            setTimeout(callback, 500); // Esperar 500ms antes de pasar a la siguiente frase
        }
    }, speed);

}

function typeDelete(elementId, speed, callback){
    const element = document.getElementById(elementId);
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
                callback(); // Llamar al callback si no hay más frases
            }
        }
    }, speed);

}


const skipButton= document.getElementById("skipButton");

skipButton.addEventListener('click', ( ) => window.location.href = 'ejemplo.html')

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const btn = document.getElementById('skipButton');
        btn.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        btn.classList.add('opacity-100', 'scale-100');
    }, 500);
});

welcome();


























// typeDelete("main-title", 125, () => {
//     // Aquí puedes agregar cualquier acción que quieras realizar después de que se haya completado la escritura y eliminación
//     console.log("All phrases have been typed and deleted.");
// });


// const phrases = [
        //     "Destácate entre la multitud",
        //     "Tu portafolio Web personal comienza aquí..."
        // ];
        // let currentPhraseIndex = 0;
        // let currentCharIndex = 0;

        // function typeWriter(elementId, text, speed, callback) {
        //     const element = document.getElementById(elementId);
        //     element.textContent = ''; // Limpiar el contenido anterior
        //     currentCharIndex = 0; // Reiniciar el índice de caracteres para cada frase
        //     const interval = setInterval(() => {
        //         element.textContent += text.charAt(currentCharIndex);
        //         currentCharIndex++;
        //         if (currentCharIndex === text.length) {
        //             clearInterval(interval);
        //             setTimeout(callback, 500); 
        //         }
        //     }, speed);
        // }
        

        // // Función que cambia entre las frases
        // function switchPhrase() {
        //     const elementId = 'main-title'; // ID del elemento donde se mostrará la frase
        //     const phrase = phrases[currentPhraseIndex]; // Get the current phrase
        //     const speed = 125; // Speed of typing

        //     typeWriter(elementId, phrase, speed, () => {
        //         currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        //         currentCharIndex = 0;
        //         switchPhrase(); // Cambiar a la siguiente frase
        //     });
        // }

        // // Comienza el efecto de escritura
        // window.onload = () => {
        //     switchPhrase();
            
        // };

