import { db } from '../config/firebase.js';
import { ref, push, set, get } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

/**
 * Guarda los datos del formulario de contacto en Firebase
 * @param {Object} formData - Datos del formulario
 * @returns {Promise} - Promise con el resultado de la operación
 */
export const saveContactForm = async (formData) => {
    try {
        // Crear una referencia a la colección "contact_requests"
        const contactsRef = ref(db, 'contact_requests');
        
        // Generar una nueva entrada con ID único
        const newContactRef = push(contactsRef);
        
        // Añadir timestamp
        formData.timestamp = new Date().toISOString();
        formData.status = 'pending'; // Estado inicial
        
        // Guardar los datos
        await set(newContactRef, formData);
        
        return {
            success: true,
            id: newContactRef.key,
            message: 'Datos guardados correctamente'
        };
    } catch (error) {
        console.error("Error al guardar datos del formulario:", error);
        return {
            success: false,
            error: error.message,
            message: 'Error al guardar los datos'
        };
    }
};

/**
 * Obtiene todos los formularios de contacto
 * @returns {Promise} - Promise con los datos
 */
export const getAllContactForms = async () => {
    try {
        const contactsRef = ref(db, 'contact_requests');
        const snapshot = await get(contactsRef);
        
        if (snapshot.exists()) {
            return {
                success: true,
                data: snapshot.val()
            };
        } else {
            return {
                success: true,
                data: {},
                message: 'No hay solicitudes de contacto'
            };
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return {
            success: false,
            error: error.message,
            message: 'Error al obtener los datos'
        };
    }
};

// Drag and drop functionality for CV/Portfolio upload
document.addEventListener('DOMContentLoaded', function() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('cv-portfolio');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    
    // Open file dialog when clicking on dropzone
    dropzone.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        displayFileInfo(this.files[0]);
    });
    
    // Handle drag and drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropzone.classList.add('border-primary', 'bg-blue-50');
    }
    
    function unhighlight() {
        dropzone.classList.remove('border-primary', 'bg-blue-50');
    }
    
    dropzone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        displayFileInfo(file);
    }
    
    function displayFileInfo(file) {
        if (file) {
            fileName.textContent = file.name;
            fileInfo.classList.remove('hidden');
            
            // Validate file type and size
            const fileTypes = ['.pdf', '.doc', '.docx'];
            const maxFileSize = 5 * 1024 * 1024; // 5MB
            
            if (!fileTypes.some(type => file.name.toLowerCase().endsWith(type))) {
                fileInfo.classList.remove('bg-green-50', 'text-green-700');
                fileInfo.classList.add('bg-red-50', 'text-red-700');
                fileName.textContent = 'Tipo de archivo no válido. Por favor, sube un PDF, DOC o DOCX.';
                return;
            }
            
            if (file.size > maxFileSize) {
                fileInfo.classList.remove('bg-green-50', 'text-green-700');
                fileInfo.classList.add('bg-red-50', 'text-red-700');
                fileName.textContent = 'El archivo es demasiado grande. El tamaño máximo es 5MB.';
                return;
            }
            
            fileInfo.classList.remove('bg-red-50', 'text-red-700');
            fileInfo.classList.add('bg-green-50', 'text-green-700');
        }
    }
});