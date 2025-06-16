import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import {  getDatabase} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js"; 
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Para depuración: verificar que las variables se están cargando correctamente
console.log("Firebase config loaded:", {
    apiKey: firebaseConfig.apiKey ? "✓" : "✗",
    authDomain: firebaseConfig.authDomain ? "✓" : "✗",
    projectId: firebaseConfig.projectId ? "✓" : "✗",
    storageBucket: firebaseConfig.storageBucket ? "✓" : "✗",
    messagingSenderId: firebaseConfig.messagingSenderId ? "✓" : "✗",
    appId: firebaseConfig.appId ? "✓" : "✗",
    measurementId: firebaseConfig.measurementId ? "✓" : "✗"
});

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { app, db, analytics };
// Exporting the Firebase app, database, and analytics for use in other parts of the application