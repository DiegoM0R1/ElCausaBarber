// Configuración de precios base por día de la semana
const preciosServicios = {
    // Precios de lunes a jueves [0] y viernes a sábado [1]
    clasico: [30.00, 50.00],
    taper: [30.00, 50.00],
    low: [30.00, 50.00],
    mid: [30.00, 50.00],
    burst: [30.00, 50.00],
    diseno: [35.00, 55.00],
    corte_barba: [40.00, 60.00],
    ninos: [30.00, 50.00],
    facial: [30.00, 30.00]  // La limpieza facial se mantiene igual todos los días
};

// Nombres de los días en español
const diasSemana = [
    "Domingo", "Lunes", "Martes", "Miércoles", 
    "Jueves", "Viernes", "Sábado"
];

// Al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    actualizarPreciosSegunDia();
    crearIndicadorSemanal();
});

// Función para actualizar precios según el día actual
function actualizarPreciosSegunDia() {
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 es domingo, 1 es lunes, etc.
    
    // Determinar el índice de precio (0 para lunes-jueves, 1 para viernes-sábado)
    const indicePrecio = (diaSemana === 5 || diaSemana === 6) ? 1 : 0;
    
    // Actualizar los precios en la interfaz
    for (const servicio in preciosServicios) {
        const precioSpan = document.getElementById(`price-span-${servicio}`);
        if (precioSpan) {
            precioSpan.textContent = `$${preciosServicios[servicio][indicePrecio].toFixed(2)}`;
        }
    }
    
    // Mostrar mensaje extra de cejas gratis
    const serviciosGrid = document.getElementById('services-grid');
    if (serviciosGrid) {
        // Comprobar si ya existe el mensaje
        const mensajeCejasExistente = document.getElementById('cejas-gratis-mensaje');
        if (!mensajeCejasExistente) {
            // Crear un elemento para mostrar "Cejas gratis con cualquier servicio"
            const extraInfo = document.createElement('div');
            extraInfo.className = 'col-span-1 md:col-span-2 lg:col-span-3 text-center mt-6';
            extraInfo.id = 'cejas-gratis-mensaje';
            extraInfo.innerHTML = `
                <div class="dark-gray-bg rounded-lg overflow-hidden shadow-lg p-4">
                    <p class="gold-text font-bold">
                        <i class="fas fa-gift mr-2"></i> 
                        Cejas – Gratis con cualquier servicio
                    </p>
                </div>
            `;
            serviciosGrid.appendChild(extraInfo);
        }
    }
}

// Función para crear el indicador visual de precios semanales
function crearIndicadorSemanal() {
    const indicador = document.getElementById('weekly-price-indicator');
    if (!indicador) return;
    
    indicador.innerHTML = ''; // Limpiar el contenido existente
    
    // Crear un elemento para cada día de la semana
    for (let i = 0; i < 7; i++) {
        // Determinar si es día con precio alto (viernes o sábado)
        const esPrecioAlto = (i === 5 || i === 6);
        
        // Crear el elemento del día
        const diaElement = document.createElement('div');
        diaElement.className = `day-indicator px-3 py-1 rounded ${esPrecioAlto ? 'gold-bg text-black' : 'dark-gray-bg text-white'}`;
        diaElement.textContent = diasSemana[i];
        
        // Determinar si es el día actual
        const hoy = new Date().getDay();
        if (i === hoy) {
            diaElement.className += ' ring-2 ring-white';
        }
        
        indicador.appendChild(diaElement);
    }
}

// Función para reservar servicio
function reservarServicio(serviceId) {
    console.log(`Reservando servicio: ${serviceId}`);
    
    // Seleccionar elementos necesarios
    const serviceSelect = document.getElementById('service');
    const appointmentSection = document.getElementById('appointment');
    
    if (!serviceSelect || !appointmentSection) {
        console.error("Error: No se encontraron los elementos necesarios");
        alert("No se puede completar la acción en este momento.");
        return;
    }
    
    // Seleccionar el servicio en el dropdown
    serviceSelect.value = serviceId;
    
    // Disparar el evento change
    const event = new Event('change');
    serviceSelect.dispatchEvent(event);
    
    // Hacer scroll a la sección de citas
    setTimeout(function() {
        window.scrollTo({
            top: appointmentSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }, 100);
}