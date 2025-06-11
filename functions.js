export const fetchFakerData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la respuesta');
        }
        const data = await response.json();
        return { success: true, body: data.data }; // Ajusta según la estructura de la API
    } catch (error) {
        return { success: false, error: error.message };
    }
};
