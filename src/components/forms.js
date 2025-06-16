import { saveContactForm } from '../services/firebaseDatabase.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando formulario...");
    
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('cv-portfolio');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const contactForm = document.querySelector('form'); // Seleccionar el formulario
    
    // Configuración del drag & drop para archivos
    if (dropzone && fileInput) {
        initializeDropzone();
    }
    
    // Configurar el selector de países
    initializeCountrySelector();
    
    // Configurar envío del formulario
    if (contactForm) {
        setupFormSubmission(contactForm, fileInput, fileInfo);
    }
    
    // Funciones auxiliares
    function initializeDropzone() {
        dropzone.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            displayFileInfo(this.files[0]);
        });
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, unhighlight, false);
        });
        
        dropzone.addEventListener('drop', handleDrop, false);
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight() {
        dropzone.classList.add('border-primary', 'bg-blue-50');
    }
    
    function unhighlight() {
        dropzone.classList.remove('border-primary', 'bg-blue-50');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        displayFileInfo(file);
    }
    
    function displayFileInfo(file) {
        if (!file || !fileInfo || !fileName) return;
        
        fileName.textContent = file.name;
        fileInfo.classList.remove('hidden');
        
        // Validar tipo y tamaño
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
    
    function initializeCountrySelector() {
        // Seleccionar el contenedor
        const selectContainer = document.querySelector('.phone-select-container');
        if (!selectContainer){
            console.error("No se encontró el contenedor para el selector de países.");
            return;
        } 
        
        // Limpiar contenido previo
        selectContainer.innerHTML = '';
        
        // Lista ampliada de países con Ecuador como primero
        const countries = [
            { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
            { code: '+34', name: 'España', flag: '🇪🇸' },
            { code: '+1', name: 'EEUU', flag: '🇺🇸' },
            { code: '+52', name: 'México', flag: '🇲🇽' },
            { code: '+57', name: 'Colombia', flag: '🇨🇴' },
            { code: '+54', name: 'Argentina', flag: '🇦🇷' },
            { code: '+56', name: 'Chile', flag: '🇨🇱' },
            { code: '+51', name: 'Perú', flag: '🇵🇪' },
            { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
            { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
            { code: '+55', name: 'Brasil', flag: '🇧🇷' },
            { code: '+502', name: 'Guatemala', flag: '🇬🇹' },
            { code: '+503', name: 'El Salvador', flag: '🇸🇻' },
            { code: '+504', name: 'Honduras', flag: '🇭🇳' },
            { code: '+505', name: 'Nicaragua', flag: '🇳🇮' },
            { code: '+506', name: 'Costa Rica', flag: '🇨🇷' },
            { code: '+507', name: 'Panamá', flag: '🇵🇦' },
            { code: '+809', name: 'Rep. Dominicana', flag: '🇩🇴' },
            { code: '+53', name: 'Cuba', flag: '🇨🇺' },
            { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
            { code: '+595', name: 'Paraguay', flag: '🇵🇾' },
            { code: '+44', name: 'Reino Unido', flag: '🇬🇧' },
            { code: '+49', name: 'Alemania', flag: '🇩🇪' },
            { code: '+33', name: 'Francia', flag: '🇫🇷' },
            { code: '+39', name: 'Italia', flag: '🇮🇹' }
        ];
        
        // Crear contenedor
        const wrapper = document.createElement('div');
        wrapper.className = 'relative inline-block';
        
        // Botón selector con diseño mejorado - ECUADOR como predeterminado
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all';
        
        button.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="text-lg">🇪🇨</span>
                <span class="text-sm font-medium">+593</span>
            </div>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        `;
        
        // Input oculto - Ecuador como valor predeterminado
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'country-code';
        hiddenInput.id = 'country-code-hidden';
        hiddenInput.value = '+593'; // Ecuador predeterminado
        
        // Dropdown estilizado con más países
        const dropdown = document.createElement('div');
        dropdown.className = 'absolute left-0 z-20 w-auto min-w-[180px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg hidden';
        dropdown.style.maxHeight = '250px'; // Un poco más alto para más países
        dropdown.style.overflowY = 'auto';
        
        // Añadir opciones al dropdown
        countries.forEach(country => {
            const option = document.createElement('div');
            option.className = 'flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 cursor-pointer';
            
            // Destacar Ecuador como seleccionado por defecto
            if (country.code === '+593') {
                option.classList.add('bg-blue-50');
            }
            
            option.innerHTML = `
                <span class="text-lg">${country.flag}</span>
                <span class="font-medium">${country.name}</span>
                <span class="text-gray-500">${country.code}</span>
            `;
            
            option.addEventListener('click', function() {
                // Actualizar botón de forma más limpia
                button.querySelector('div.flex').innerHTML = `
                    <span class="text-lg">${country.flag}</span>
                    <span class="text-sm font-medium">${country.code}</span>
                `;
                hiddenInput.value = country.code;
                
                // Ocultar dropdown
                dropdown.classList.add('hidden');
                
                // Actualizar clases de opciones
                dropdown.querySelectorAll('div').forEach(opt => {
                    opt.classList.remove('bg-blue-50');
                });
                option.classList.add('bg-blue-50');
            });
            
            dropdown.appendChild(option);
        });
        
        // Toggle dropdown
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
        
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function() {
            dropdown.classList.add('hidden');
        });
        
        // Prevenir cierre al hacer clic dentro del dropdown
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Añadir todo al DOM
        wrapper.appendChild(button);
        wrapper.appendChild(hiddenInput);
        wrapper.appendChild(dropdown);
        selectContainer.appendChild(wrapper);
        
        // Ajustar el estilo del contenedor para que se alinee con el input
        selectContainer.style.display = 'flex';
        selectContainer.style.alignItems = 'center';
        
        // Ajustar el ancho del botón para que sea compacto pero legible
        button.style.minWidth = '90px';
    }
    
    function setupFormSubmission(form, fileInput, fileInfo) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Mostrar indicador de carga
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...`;
            
            try {
                // Recopilar datos del formulario
                const formData = {
                    nombre: document.getElementById('nombre').value,
                    email: document.getElementById('email').value,
                    telefono: {
                        codigo: document.getElementById('country-code-hidden')?.value || '+34',
                        numero: document.getElementById('telefono').value
                    },
                    profesion: document.getElementById('profesion').value,
                    descripcion: document.getElementById('descripcion').value,
                    redesSociales: {
                        linkedin: document.getElementById('linkedin')?.value || null,
                        instagram: document.getElementById('instagram')?.value || null,
                        tiktok: document.getElementById('tiktok')?.value || null
                    },
                    consentimiento: document.getElementById('consentimiento').checked,
                    archivoAdjunto: fileInput && fileInput.files.length > 0 ? fileInput.files[0].name : null
                };
                
                console.log("Enviando datos:", formData);
                
                // Guardar en Firebase
                const result = await saveContactForm(formData);
                
                if (result.success) {
                    // Mostrar mensaje de éxito
                    Swal.fire({
                        title: '¡Enviado correctamente!',
                        text: 'Nos pondremos en contacto contigo pronto.',
                        icon: 'success',
                        confirmButtonColor: '#0000FF'
                    });
                    
                    // Resetear el formulario
                    form.reset();
                    if (fileInfo) fileInfo.classList.add('hidden');
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error("Error al enviar formulario:", error);
                
                // Mostrar mensaje de error
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu información. Por favor, inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#0000FF'
                });
            } finally {
                // Restaurar botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});