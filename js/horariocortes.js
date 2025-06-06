// SOLUCIÓN DEFINITIVA PARA FIJAR EL PROBLEMA DE LOS BOTONES DE SERVICIO

// Esta solución reemplaza completamente el archivo horariocortes.js
// El enfoque es detener toda la funcionalidad problemática y comenzar de nuevo

// Datos de servicios
const servicesData = [
    { id: 'clasico', name: 'Corte Clásico', description: 'Un estilo atemporal y definido.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-cut' },
    { id: 'taper', name: 'Taper Fade', description: 'Desvanecido gradual en sienes y nuca.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-signature' },
    { id: 'low', name: 'Low Fade', description: 'Desvanecido bajo para un look sutil.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-level-down-alt'},
    { id: 'mid', name: 'Mid Fade', description: 'Desvanecido medio, versátil y moderno.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-arrows-alt-h' },
    { id: 'burst', name: 'Burst Fade', description: 'Desvanecido circular alrededor de la oreja.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-adjust' },
    { id: 'diseno', name: 'Corte con Diseño', description: 'Líneas o figuras simples.', priceWeekday: 35, priceWeekend: 55, icon: 'fa-pencil-ruler' },
    { id: 'corte_barba', name: 'Corte + Barba', description: 'Incluye definición y navaja.', priceWeekday: 40, priceWeekend: 60, icon: 'fa-beard' },
    { id: 'ninos', name: 'Corte para Niños', description: 'Menores de 12 años.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-child'},
    { id: 'facial', name: 'Limpieza Facial', description: 'Revitaliza y cuida tu piel.', priceWeekday: 30, priceWeekend: 30, icon: 'fa-spa' }
];

// Horarios de operación
const operatingHours = {
    0: { open: '10:00', close: '14:00' }, // Domingo
    1: { open: '13:00', close: '20:00' }, // Lunes
    2: { open: '13:00', close: '17:30' }, // Martes
    3: { open: '13:00', close: '20:00' }, // Miércoles
    4: { open: '13:00', close: '20:00' }, // Jueves
    5: { open: '10:00', close: '20:00' }, // Viernes
    6: { open: '10:00', close: '20:00' }  // Sábado
};

// Funciones de utilidad
function getPriceForDay(service, dayOfWeek) {
    if (!service) return 0;
    if (dayOfWeek === 5 || dayOfWeek === 6) { // Viernes o Sábado
        return service.priceWeekend;
    } else { // Domingo a Jueves
        return service.priceWeekday;
    }
}

function formatPrice(price) {
    if (price === 0) return 'Gratis*';
    return `$${price.toFixed(2)}`;
}

function formatTime(timeStr) {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
}

// Función definitiva para renderizar indicador semanal
function renderWeeklyIndicator() {
    const container = document.getElementById('weekly-price-indicator');
    if (!container) {
        console.error("Contenedor del indicador semanal no encontrado.");
        return;
    }
    
    container.innerHTML = ''; // Limpiar
    
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const todayIndex = new Date().getDay();
    
    dayNames.forEach((name, index) => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day-item');
        dayElement.textContent = name;
        
        if (index === 5 || index === 6) {
            dayElement.classList.add('weekend-price');
            dayElement.title = 'Precio de fin de semana';
        } else {
            dayElement.title = 'Precio regular';
        }
        
        if (index === todayIndex) {
            dayElement.classList.add('current-day');
            dayElement.title += ' (Hoy)';
        }
        
        container.appendChild(dayElement);
    });
    
    console.log("Indicador semanal renderizado correctamente.");
}

// SOLUCIÓN DEFINITIVA: No usar renderServiceCards, usar HTML estático
// La función renderServiceCards se ha eliminado completamente

// Función para popular el dropdown de servicios
function populateServiceSelect() {
    const selectElement = document.getElementById('service');
    if (!selectElement) {
        console.error("Elemento select de servicios no encontrado.");
        return;
    }
    
    // Preservar opción placeholder si existe
    const placeholderOption = selectElement.querySelector('option[value=""]');
    selectElement.innerHTML = '';
    if (placeholderOption) {
        selectElement.appendChild(placeholderOption);
    }
    
    servicesData.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        selectElement.appendChild(option);
    });
    
    console.log("Dropdown de servicios poblado correctamente.");
}

// Función para actualizar el precio del servicio
function updateAppointmentPrice() {
    const serviceSelect = document.getElementById('service');
    const dateInput = document.getElementById('date');
    const priceDisplay = document.getElementById('appointment-price-display');
    
    if (!serviceSelect || !dateInput || !priceDisplay) {
        console.error("Elementos necesarios para actualizar precio no encontrados.");
        return;
    }
    
    const selectedServiceId = serviceSelect.value;
    const selectedDateStr = dateInput.value;
    
    if (!selectedServiceId || !selectedDateStr) {
        priceDisplay.textContent = '$0.00';
        return;
    }
    
    const service = servicesData.find(s => s.id === selectedServiceId);
    if (!service) {
        priceDisplay.textContent = 'N/A';
        console.error(`Servicio con ID '${selectedServiceId}' no encontrado.`);
        return;
    }
    
    try {
        const selectedDate = new Date(selectedDateStr + 'T00:00:00');
        if (isNaN(selectedDate.getTime())) {
            priceDisplay.textContent = "Fecha Inválida";
            return;
        }
        
        const dayOfWeek = selectedDate.getDay();
        const price = getPriceForDay(service, dayOfWeek);
        priceDisplay.textContent = formatPrice(price);
        
    } catch (error) {
        console.error("Error al actualizar precio:", error);
        priceDisplay.textContent = "Error";
    }
}

// Función para actualizar horas disponibles
// Solución simplificada: Añadir selector AM/PM al input de hora existente

// Función para inicializar el selector AM/PM
function initAmPmSelector() {
    console.log("Inicializando selector AM/PM simple");
    
    // Buscar el input de hora existente
    const timeInput = document.getElementById('time');
    if (!timeInput) {
        console.error("No se encontró el input de hora (#time)");
        return;
    }
    
    // 1. Crear el selector AM/PM
    const periodSelect = document.createElement('select');
    periodSelect.id = 'time-period';
    periodSelect.className = 'bg-black border border-gray-700 rounded p-2 ml-2 w-20';
    
    // Añadir opciones AM/PM
    const amOption = document.createElement('option');
    amOption.value = 'AM';
    amOption.textContent = 'AM';
    
    const pmOption = document.createElement('option');
    pmOption.value = 'PM';
    pmOption.textContent = 'PM';
    
    periodSelect.appendChild(amOption);
    periodSelect.appendChild(pmOption);
    
    // 2. Insertar el selector después del input de hora
    if (timeInput.parentNode) {
        // Crear un contenedor que agrupe el input y el selector
        const container = document.createElement('div');
        container.className = 'flex items-center';
        
        // Reemplazar el input original con el contenedor
        timeInput.parentNode.insertBefore(container, timeInput);
        
        // Mover el input original dentro del contenedor
        container.appendChild(timeInput);
        
        // Añadir el selector al contenedor
        container.appendChild(periodSelect);
        
        // Ajustar el estilo del input de hora
        timeInput.style.flex = '1';
        timeInput.style.borderTopRightRadius = '0';
        timeInput.style.borderBottomRightRadius = '0';
    }
    
    // 3. Configurar eventos para sincronizar el input con el selector
    timeInput.addEventListener('change', updatePeriodFromInput);
    periodSelect.addEventListener('change', updateInputFromPeriod);
    
    // Establecer el valor inicial del selector AM/PM basado en el input
    updatePeriodFromInput();
    
    console.log("Selector AM/PM inicializado");
}

// Función para actualizar el selector AM/PM basado en el valor del input
function updatePeriodFromInput() {
    const timeInput = document.getElementById('time');
    const periodSelect = document.getElementById('time-period');
    
    if (!timeInput || !periodSelect || !timeInput.value) return;
    
    // Parsear la hora en formato 24h
    const [hourStr] = timeInput.value.split(':');
    const hour = parseInt(hourStr, 10);
    
    // Determinar si es AM o PM
    if (hour >= 12) {
        periodSelect.value = 'PM';
    } else {
        periodSelect.value = 'AM';
    }
}

// Función para actualizar el input basado en el selector AM/PM
function updateInputFromPeriod() {
    const timeInput = document.getElementById('time');
    const periodSelect = document.getElementById('time-period');
    
    if (!timeInput || !periodSelect || !timeInput.value) return;
    
    // Parsear la hora actual
    const [hourStr, minuteStr] = timeInput.value.split(':');
    let hour = parseInt(hourStr, 10);
    
    // El periodo actual seleccionado
    const selectedPeriod = periodSelect.value;
    
    // Convertir la hora según el periodo seleccionado
    if (selectedPeriod === 'AM' && hour >= 12) {
        // Convertir de PM a AM
        hour = hour - 12;
    } else if (selectedPeriod === 'PM' && hour < 12) {
        // Convertir de AM a PM
        hour = hour + 12;
    }
    
    // Actualizar el input con el nuevo valor
    const formattedHour = hour.toString().padStart(2, '0');
    timeInput.value = `${formattedHour}:${minuteStr}`;
}

// Modificación simplificada de la función updateAvailableTimes para mostrar horarios en formato AM/PM
function updateAvailableTimesWithAmPm() {
    console.log("Actualizando horarios disponibles con indicación AM/PM");
    
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const validationMessage = document.getElementById('time-validation-message');
    const periodSelect = document.getElementById('time-period');
    
    if (!dateInput || !timeInput) {
        console.error("Inputs de fecha/hora no encontrados.");
        return;
    }
    
    // Habilitar/deshabilitar el selector AM/PM junto con el input de hora
    if (periodSelect) {
        periodSelect.disabled = timeInput.disabled;
    }
    
    // Limpiar mensaje previo si existe el elemento
    if (validationMessage) validationMessage.textContent = '';
    
    const selectedDateStr = dateInput.value;
    
    if (!selectedDateStr) {
        timeInput.min = '';
        timeInput.max = '';
        timeInput.disabled = true;
        if (periodSelect) periodSelect.disabled = true;
        timeInput.value = '';
        if (validationMessage) validationMessage.textContent = "Por favor, selecciona una fecha primero.";
        return;
    }
    
    try {
        const selectedDate = new Date(selectedDateStr + 'T00:00:00');
        if (isNaN(selectedDate.getTime())) {
            if (validationMessage) validationMessage.textContent = "La fecha seleccionada es inválida.";
            timeInput.disabled = true;
            if (periodSelect) periodSelect.disabled = true;
            return;
        }
        
        const dayOfWeek = selectedDate.getDay();
        const hours = operatingHours[dayOfWeek];
        
        if (hours) {
            timeInput.min = hours.open;
            timeInput.max = hours.close;
            timeInput.disabled = false;
            if (periodSelect) periodSelect.disabled = false;
            timeInput.step = "1800"; // 30 minutos
            
            // Convertir horarios a formato 12h para mostrar en mensaje
            const openHour = parseInt(hours.open.split(':')[0]);
            const openMinute = hours.open.split(':')[1];
            const closeHour = parseInt(hours.close.split(':')[0]);
            const closeMinute = hours.close.split(':')[1];
            
            const openPeriod = openHour >= 12 ? 'PM' : 'AM';
            const closePeriod = closeHour >= 12 ? 'PM' : 'AM';
            
            const openHour12 = openHour > 12 ? openHour - 12 : (openHour === 0 ? 12 : openHour);
            const closeHour12 = closeHour > 12 ? closeHour - 12 : (closeHour === 0 ? 12 : closeHour);
            
            const currentTimeValue = timeInput.value;
            if (currentTimeValue) {
                if (currentTimeValue < hours.open || currentTimeValue > hours.close) {
                    if (validationMessage) {
                        validationMessage.textContent = `Hora inválida. Para esta fecha atendemos de ${openHour12}:${openMinute} ${openPeriod} a ${closeHour12}:${closeMinute} ${closePeriod}.`;
                        validationMessage.className = 'text-red-500 text-sm mt-1';
                    }
                } else {
                    // Hora válida, actualizar el selector AM/PM
                    updatePeriodFromInput();
                    if (validationMessage) {
                        validationMessage.textContent = '';
                        validationMessage.className = 'text-sm mt-1';
                    }
                }
            } else if (validationMessage) {
                validationMessage.textContent = `Horario disponible: ${openHour12}:${openMinute} ${openPeriod} - ${closeHour12}:${closeMinute} ${closePeriod}.`;
                validationMessage.className = 'text-gray-400 text-sm mt-1';
            }
            
        } else {
            if (validationMessage) validationMessage.textContent = "No laboramos en la fecha seleccionada.";
            timeInput.disabled = true;
            if (periodSelect) periodSelect.disabled = true;
            timeInput.value = '';
        }
    } catch (error) {
        console.error("Error al actualizar horarios:", error);
        if (validationMessage) validationMessage.textContent = "Error al determinar el horario.";
        timeInput.disabled = true;
        if (periodSelect) periodSelect.disabled = true;
    }
}

// Reemplazar la función original con la versión AM/PM
function replaceUpdateAvailableTimes() {
    // Guardar referencia a la función original si existe
    if (typeof window.originalUpdateAvailableTimes !== 'function') {
        window.originalUpdateAvailableTimes = window.updateAvailableTimes || function(){};
    }
    
    // Reemplazar con nuestra versión
    window.updateAvailableTimes = updateAvailableTimesWithAmPm;
    
    console.log("Función updateAvailableTimes reemplazada con versión AM/PM");
}

// Inicializar cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando selector AM/PM simple");
    
    // 1. Inicializar el selector AM/PM
    initAmPmSelector();
    
    // 2. Reemplazar la función de actualización de horarios
    replaceUpdateAvailableTimes();
    
    // 3. Actualizar el estado inicial
    updateAvailableTimesWithAmPm();
});

// FUNCIÓN CLAVE: Esta es la función que se llamará desde los botones HTML
function reservarServicio(serviceId) {
    console.log(`Reservando servicio con ID: ${serviceId}`);
    
    const serviceSelect = document.getElementById('service');
    const appointmentSection = document.getElementById('appointment');
    
    if (!serviceSelect || !appointmentSection) {
        console.error("Elementos necesarios para reservar no encontrados.");
        alert("Error: No se pueden encontrar los elementos necesarios para reservar.");
        return;
    }
    
    // Seleccionar el servicio en el dropdown
    serviceSelect.value = serviceId;
    
    // Disparar evento change para actualizar precios
    serviceSelect.dispatchEvent(new Event('change'));
    
    // Hacer scroll a la sección de citas
    setTimeout(() => {
        window.scrollTo({
            top: appointmentSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }, 100);
    
    console.log(`Reserva iniciada para servicio: ${serviceId}`);
}

// Inicialización cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado, inicializando funciones...");
    
    // 1. Inicializar el indicador semanal
    renderWeeklyIndicator();
    
    // 2. Poblar el select de servicios
    populateServiceSelect();
    
    // 3. Configurar listeners
    
    // Listener para fecha (actualiza precio y horarios)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        // Establecer fecha mínima como hoy
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Añadir listener
        dateInput.addEventListener('change', function() {
            updateAppointmentPrice();
            updateAvailableTimes();
        });
        
        // Inicializar si hay fecha
        if (dateInput.value) {
            updateAppointmentPrice();
            updateAvailableTimes();
        } else {
            updateAvailableTimes(); // Deshabilitar hora
        }
    }
    
    // Listener para servicio (actualiza precio)
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateAppointmentPrice);
    }
    
    // Listener para hora (validación)
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.addEventListener('input', function() {
            // Reutilizar la función de actualización de horarios
            updateAvailableTimes();
        });
    }
    
    // Listener para formulario
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recoger datos
            const name = document.getElementById('name')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const dateValue = dateInput?.value || '';
            const timeValue = timeInput?.value || '';
            const serviceId = serviceSelect?.value || '';
            const notes = document.getElementById('notes')?.value || '';
            
            // Validar campos obligatorios
            if (!dateValue || !serviceId || !timeValue) {
                console.error("Faltan datos obligatorios para la reserva.");
                alert("Por favor, selecciona fecha, hora y servicio.");
                return;
            }
            
            // Preparar mensaje
            const service = servicesData.find(s => s.id === serviceId);
            const serviceName = service ? service.name : 'Servicio Desconocido';
            const priceDisplay = document.getElementById('appointment-price-display');
            const finalPriceText = priceDisplay ? priceDisplay.textContent : 'N/A';
            
            const message = `Hola, me gustaría agendar una cita:\n\n` +
                          `Nombre: ${name}\n` +
                          `Teléfono: ${phone}\n` +
                          `Fecha: ${dateValue}\n` +
                          `Hora: ${timeValue}\n` +
                          `Servicio: ${serviceName}\n` +
                          `Precio Estimado: ${finalPriceText}\n` +
                          `Notas: ${notes || 'Ninguna'}`;
            
            // Enviar a WhatsApp
            const whatsappUrl = `https://wa.me/14382826830?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Definir la función reservarServicio en el ámbito global
    window.reservarServicio = reservarServicio;
    
    console.log("Inicialización completa.");
});

// Asegurarnos de que reservarServicio esté disponible globalmente
window.reservarServicio = reservarServicio;