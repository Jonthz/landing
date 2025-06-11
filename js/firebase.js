// Importar las funciones de Firebase desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";


// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener una referencia a la base de datos en tiempo real
const database = getDatabase(app);

/**
 * Obtiene todos los votos de la colección "votes" en la base de datos
 * @returns {Promise} Una promesa que resuelve con los datos de los votos
 */
export const getVotes = async () => {
  const votesRef = ref(database, 'votes');
  try {
    const snapshot = await get(votesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No hay votos disponibles");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener votos:", error);
    throw error;
  }
};

/**
 * Guarda un voto para un producto específico en la base de datos
 * @param {string} productID - El ID del producto votado
 * @returns {Promise} Una promesa que resuelve con un mensaje de éxito o error
 */
export const saveVote = async (productID) => {
  try {
    // Obtener una referencia a la colección votes
    const votesRef = ref(database, 'votes');
    
    // Crear una nueva referencia para este voto específico
    const newVoteRef = push(votesRef);
    
    // Guardar los datos en la base de datos
    await set(newVoteRef, {
      productID: productID,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: true,
      message: "Voto guardado exitosamente"
    };
  } catch (error) {
    console.error("Error al guardar el voto:", error);
    return {
      success: false,
      message: "Error al guardar el voto",
      error: error.message
    };
  }
};