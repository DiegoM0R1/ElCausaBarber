
const servicesData = [
    { id: 'clasico', name: 'Corte Clásico', description: 'Un estilo atemporal y definido.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-cut'  }, // <- Añadir imageUrl
    { id: 'taper', name: 'Taper Fade', description: 'Desvanecido gradual en sienes y nuca.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-signature' },
    { id: 'low', name: 'Low Fade', description: 'Desvanecido bajo para un look sutil.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-level-down-alt'},
    { id: 'mid', name: 'Mid Fade', description: 'Desvanecido medio, versátil y moderno.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-arrows-alt-h' },
    { id: 'burst', name: 'Burst Fade', description: 'Desvanecido circular alrededor de la oreja.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-adjust' },
    { id: 'diseno', name: 'Corte con Diseño', description: 'Líneas o figuras simples.', priceWeekday: 35, priceWeekend: 55, icon: 'fa-pencil-ruler' },
    { id: 'corte_barba', name: 'Corte + Barba', description: 'Incluye definición y navaja.', priceWeekday: 40, priceWeekend: 60, icon: 'fa-beard' },
    { id: 'ninos', name: 'Corte para Niños', description: 'Menores de 12 años.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-child'},
    { id: 'facial', name: 'Limpieza Facial', description: 'Revitaliza y cuida tu piel.', priceWeekday: 30, priceWeekend: 30, icon: 'fa-spa' }
];

    // --- Funciones ---
    function getPriceForDay(service, dayOfWeek) {
        if (!service) return 0; // Manejar caso donde el servicio no se encuentre
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

    function renderWeeklyIndicator(container) {
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
         console.log("Indicador semanal renderizado.");
    }

    function renderServiceCards(gridContainer) {
        if (!gridContainer) {
            console.error("Contenedor #services-grid no encontrado.");
            return;
        }
        gridContainer.innerHTML = ''; // Limpiar
    
        const currentDay = new Date().getDay();
    
        servicesData.forEach(service => { // <- Inicio del bucle
            const currentPrice = getPriceForDay(service, currentDay);
            const priceString = formatPrice(currentPrice);
    
            const card = document.createElement('div'); // <- 'card' definida aquí
            card.className = 'service-item dark-gray-bg rounded-lg overflow-hidden shadow-lg flex flex-col group';
    
            const hasVideo = service.videoUrl && service.videoUrl.trim() !== '';
    
            // Generar el HTML interno de la tarjeta
            card.innerHTML = `
                
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex items-start mb-3">
                        <div class="rounded-full gold-bg p-2 mr-3 text-sm"><i class="fas ${service.icon || 'fa-star'} text-black"></i></div>
                        <h3 class="text-xl font-bold pt-1">${service.name}</h3>
                    </div>
                    <p class="text-gray-400 text-sm mb-4 flex-grow">${service.description || ''}</p>
                    <div class="mt-auto flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-gray-700">
                        <span class="gold-text font-bold text-lg" id="price-span-${service.id}">${priceString}</span>
                        <div class="flex gap-2">
                             <button class="text-xs btn-gold py-1 px-2 rounded book-service-btn" data-service-id="${service.id}">Reservar</button>
                        </div>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
    
            // Listener para el botón Reservar DENTRO del bucle
            const reserveButton = card.querySelector('.book-service-btn');
            if (reserveButton) {
                reserveButton.addEventListener('click', function() {
                    const serviceId = this.getAttribute('data-service-id');
                    console.log(`==> Clic en Reservar (dentro loop) para servicio ID: ${serviceId}`);
                    bookService(serviceId); // Llama a la función global
                });
            }
            // No se necesitan listeners para imagen/video aquí (se usa delegación)
    
        }); // <- FIN del bucle forEach
    
        // !!!! ASEGÚRATE DE QUE NO HAYA CÓDIGO AQUÍ QUE USE 'card' O INTENTE AÑADIR LISTENERS CON gridContainer.querySelectorAll !!!
        // !!!! LA LÍNEA 122 DEL ERROR ESTABA AQUÍ !!!!
    
        console.log("Tarjetas de servicio renderizadas."); // Este log debe ser lo último dentro de esta función (o casi lo último)
    }

    function populateServiceSelect(selectElement) {
        if (!selectElement) {
             console.error("Elemento select de servicios no encontrado.");
            return;
        }
        const placeholderOption = selectElement.querySelector('option[value=""]');
        selectElement.innerHTML = '';
        if (placeholderOption) {
            selectElement.appendChild(placeholderOption);
        }
        servicesData.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name + (service.id === 'cejas' ? ' (Gratis con servicio)' : '');
            selectElement.appendChild(option);
        });
         console.log("Select de servicios poblado.");
    }

    function updateAppointmentPrice(selectElement, dateInputElement, priceDisplayElement) {
        console.log("--- updateAppointmentPrice INICIADO ---"); // Log 1
    
        // Verificar si los elementos existen
        if (!selectElement || !dateInputElement || !priceDisplayElement) {
            console.error("Error en updateAppointmentPrice: Uno o más elementos no fueron encontrados.");
            priceDisplayElement.textContent = "Error"; // Mostrar error si falta algo
            return;
        }
    
        const selectedServiceId = selectElement.value;
        const selectedDateStr = dateInputElement.value;
    
        console.log(`Valores leídos: serviceId='${selectedServiceId}', dateStr='${selectedDateStr}'`); // Log 2
    
        // Si no hay servicio seleccionado o no hay fecha, mostrar 0 y salir
        if (!selectedServiceId || !selectedDateStr) {
            priceDisplayElement.textContent = '$0.00';
            console.log("Saliendo de updateAppointmentPrice: Falta servicio o fecha."); // Log 3
            return;
        }
    
        // Buscar el servicio en los datos
        const service = servicesData.find(s => s.id === selectedServiceId);
        console.log("Servicio encontrado en servicesData:", service); // Log 4
    
        if (!service) {
            priceDisplayElement.textContent = 'N/A'; // Servicio no encontrado
            console.error(`Error: Servicio con ID '${selectedServiceId}' no encontrado en servicesData.`); // Log 5
            return;
        }
    
        // Calcular el día de la semana de la fecha seleccionada
        try {
            const selectedDate = new Date(selectedDateStr + 'T00:00:00'); // Importante para evitar problemas de zona horaria
            // Verificar si la fecha es válida
            if (isNaN(selectedDate.getTime())) {
                 console.error("Error: Fecha inválida:", selectedDateStr);
                 priceDisplayElement.textContent = "Fecha Inválida";
                 return;
            }
            const dayOfWeek = selectedDate.getDay(); // 0 = Domingo, 6 = Sábado
            console.log(`Fecha parseada: ${selectedDate}, Día de la semana: ${dayOfWeek}`); // Log 6
    
            // Obtener el precio para ese día
            const price = getPriceForDay(service, dayOfWeek);
            console.log(`Precio calculado por getPriceForDay: ${price}`); // Log 7
    
            // Formatear y mostrar el precio
            const formattedPrice = formatPrice(price);
            priceDisplayElement.textContent = formattedPrice;
            console.log(`Precio final mostrado: ${formattedPrice}`); // Log 8
    
        } catch (error) {
             console.error("Error al procesar la fecha o calcular el precio:", error);
             priceDisplayElement.textContent = "Error";
        }
         console.log("--- updateAppointmentPrice FINALIZADO ---"); // Log 9
    }

    function bookService(serviceId) {
        console.log(`--- bookService INICIADO --- ID: ${serviceId}`); // Log 1
    
        const serviceSelectElement = document.getElementById('service');
        const appointmentSection = document.getElementById('appointment');
    
        // Verificar si los elementos necesarios existen
        if (!serviceSelectElement) {
            console.error("Error en bookService: No se encontró el elemento select #service.");
            alert("Error: No se encuentra el selector de servicios."); // Alerta para el usuario
            return; // Detener si falta el select
        }
         if (!appointmentSection) {
            console.error("Error en bookService: No se encontró la sección #appointment.");
             alert("Error: No se encuentra la sección de reserva."); // Alerta para el usuario
            return; // Detener si falta la sección
        }
    
        console.log("Elementos #service y #appointment encontrados correctamente."); // Log 2
    
        // 1. Seleccionar el servicio en el dropdown
        try {
            serviceSelectElement.value = serviceId;
            // Verificar si el valor se estableció correctamente
            if (serviceSelectElement.value === serviceId) {
                 console.log(`Valor del select #service establecido en: ${serviceSelectElement.value}`); // Log 3
            } else {
                 console.warn(`Advertencia: No se pudo establecer el valor '${serviceId}' en el select #service. ¿Existe esa opción? Valor actual: ${serviceSelectElement.value}`);
                 // A pesar de la advertencia, intentamos actualizar el precio y hacer scroll
            }
        } catch (error) {
            console.error("Error al establecer el valor del select:", error);
        }
    
    
        // 2. Disparar el evento 'change' para que la función updateAppointmentPrice se ejecute
        try {
            const changeEvent = new Event('change', { bubbles: true });
            serviceSelectElement.dispatchEvent(changeEvent);
            console.log("Evento 'change' disparado en #service para actualizar precio."); // Log 4
        } catch (error) {
            console.error("Error al disparar el evento change:", error);
        }
    
    
        // 3. Scroll suave hacia la sección de reserva
        console.log("Intentando hacer scroll hacia #appointment..."); // Log 5
        // Usamos un pequeño timeout para dar tiempo a que el navegador procese el cambio del select si fuera necesario
        setTimeout(() => {
            try {
                // Método 1: scrollTo (generalmente bueno con offset)
                 const offsetTop = appointmentSection.offsetTop - 80; // 80px para compensar el header fijo, ajusta si es necesario
                 console.log(`Calculado offsetTop para scroll: ${offsetTop}`);
                 window.scrollTo({
                     top: offsetTop,
                     behavior: 'smooth'
                 });
    
                // Método 2: scrollIntoView (alternativa si scrollTo falla)
                // appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
                console.log("Scroll hacia #appointment ejecutado."); // Log 6
            } catch (scrollError) {
                 console.error("Error durante el scroll:", scrollError);
                 // Si falla, intentar un scroll simple sin smooth
                 try {
                      console.log("Intentando scroll simple...");
                     appointmentSection.scrollIntoView();
                 } catch (simpleScrollError){
                      console.error("También falló el scroll simple:", simpleScrollError);
                 }
            }
        }, 50); // 50ms de espera
    
         console.log(`--- bookService FINALIZADO --- ID: ${serviceId}`); // Log 7
    }

    // --- Punto de Entrada Principal ---
   document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado y parseado.");

    // --- 1. Obtener referencias a TODOS los elementos del DOM necesarios ---
    const servicesGridContainer = document.getElementById('services-grid');
    const weeklyIndicatorContainer = document.getElementById('weekly-price-indicator');
    const serviceSelectElement = document.getElementById('service');
    const dateInputElement = document.getElementById('date');       // <--- Input de Fecha
    const timeInputElement = document.getElementById('time');       // <--- Input de Hora
    const priceDisplayElement = document.getElementById('appointment-price-display');
    const appointmentFormElement = document.getElementById('appointment-form');
    // Añade aquí otros elementos si los necesitas (lightbox, botones, etc.)

    // --- Verificar si los elementos esenciales existen ---
    if (!dateInputElement || !timeInputElement || !serviceSelectElement || !priceDisplayElement || !appointmentFormElement) {
        console.error("Error Crítico: Faltan uno o más elementos esenciales del formulario (date, time, service, price-display, form). Verifica los IDs en tu HTML.");
        // Puedes detener la ejecución aquí si lo deseas, o manejarlo de otra forma
        // return;
    }

    // --- 2. Definir Datos y Constantes ---
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
        // { id: 'cejas', name: 'Cejas', description: 'Gratis con cualquier servicio.', priceWeekday: 0, priceWeekend: 0, icon: 'fa-eye' } // Descomenta si usas cejas
    ];

    const operatingHours = {
        0: { open: '10:00', close: '14:00' }, // Domingo
        1: { open: '13:00', close: '20:00' }, // Lunes
        2: { open: '13:00', close: '17:30' }, // Martes
        3: { open: '13:00', close: '20:00' }, // Miércoles
        4: { open: '13:00', close: '20:00' }, // Jueves
        5: { open: '10:00', close: '20:00' }, // Viernes
        6: { open: '10:00', close: '20:00' }  // Sábado
    };

    // --- 3. Definir Funciones Auxiliares ---

    function getPriceForDay(service, dayOfWeek) {
        // ... (tu código actual) ...
        if (!service) return 0;
        if (dayOfWeek === 5 || dayOfWeek === 6) { return service.priceWeekend; }
        else { return service.priceWeekday; }
    }

    function formatPrice(price) {
         // ... (tu código actual) ...
        if (price === 0 && price !== undefined) return 'Gratis*'; // Asegurar que no sea undefined
        if (typeof price === 'number') return `$${price.toFixed(2)}`;
        return 'N/A'; // O '$0.00' si prefieres
    }

    function renderWeeklyIndicator(container) {
        // ... (tu código actual, verifica que 'container' no sea null) ...
        if (!container) { console.error("Contenedor del indicador semanal no encontrado."); return; }
        container.innerHTML = ''; // Limpiar
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const todayIndex = new Date().getDay();
        dayNames.forEach((name, index) => { /* ... crear y añadir dayElement ... */
            const dayElement = document.createElement('div');
            dayElement.classList.add('day-item');
            dayElement.textContent = name;
            if (index === 5 || index === 6) { dayElement.classList.add('weekend-price'); dayElement.title = 'Precio de fin de semana'; }
            else { dayElement.title = 'Precio regular'; }
            if (index === todayIndex) { dayElement.classList.add('current-day'); dayElement.title += ' (Hoy)'; }
            container.appendChild(dayElement);
         });
        console.log("Indicador semanal renderizado.");
    }

    function renderServiceCards(gridContainer) {
        // ... (tu código actual, verifica que 'gridContainer' no sea null) ...
         if (!gridContainer) { console.error("Contenedor #services-grid no encontrado."); return; }
         gridContainer.innerHTML = ''; // Limpiar
         const currentDay = new Date().getDay();
         servicesData.forEach(service => { /* ... crear y añadir card ... */
             const currentPrice = getPriceForDay(service, currentDay);
             const priceString = formatPrice(currentPrice);
             const card = document.createElement('div');
             card.className = 'service-item dark-gray-bg rounded-lg overflow-hidden shadow-lg flex flex-col group';
             card.innerHTML = `... tu HTML para la tarjeta ... usa ${priceString} ...`; // Asegúrate que el HTML interno esté correcto
              // Añadir listener al botón reservar DENTRO del bucle
             const reserveButton = card.querySelector('.book-service-btn');
             if (reserveButton) {
                 reserveButton.addEventListener('click', function() {
                     const serviceId = this.getAttribute('data-service-id');
                     console.log(`==> Clic en Reservar (loop) para servicio ID: ${serviceId}`);
                     if (typeof bookService === 'function') {
                        bookService(serviceId);
                     } else {
                        console.error("Función bookService no definida.");
                     }
                 });
             } else {
                 console.warn("Botón .book-service-btn no encontrado en la tarjeta para", service.name);
             }
             gridContainer.appendChild(card);
         });
        console.log("Tarjetas de servicio renderizadas.");
    }

    function populateServiceSelect(selectElement) {
        // ... (tu código actual, verifica que 'selectElement' no sea null) ...
         if (!selectElement) { console.error("Elemento select de servicios no encontrado."); return; }
         const placeholderOption = selectElement.querySelector('option[value=""]');
         selectElement.innerHTML = '';
         if (placeholderOption) { selectElement.appendChild(placeholderOption); }
         servicesData.forEach(service => { /* ... crear y añadir option ... */
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name + (service.id === 'cejas' ? ' (Gratis con servicio)' : '');
            selectElement.appendChild(option);
          });
         console.log("Select de servicios poblado.");
    }

    // Función para actualizar el precio estimado (usa las variables globales del DOM)
    function updateAppointmentPriceDisplay() {
        console.log("--- updateAppointmentPriceDisplay INICIADO ---");
        if (!serviceSelectElement || !dateInputElement || !priceDisplayElement) {
            console.error("Faltan elementos para actualizar precio.");
            if(priceDisplayElement) priceDisplayElement.textContent = "Error";
            return;
        }
        const selectedServiceId = serviceSelectElement.value;
        const selectedDateStr = dateInputElement.value;

        if (!selectedServiceId || !selectedDateStr) {
            priceDisplayElement.textContent = '$0.00';
            console.log("Saliendo de updateAppointmentPriceDisplay: Falta servicio o fecha.");
            return;
        }
        const service = servicesData.find(s => s.id === selectedServiceId);
        if (!service) {
             priceDisplayElement.textContent = 'N/A';
             console.error(`Servicio ID '${selectedServiceId}' no encontrado.`);
             return;
        }
        try {
            const selectedDate = new Date(selectedDateStr + 'T00:00:00');
             if (isNaN(selectedDate.getTime())) { priceDisplayElement.textContent = "Fecha Inválida"; return; }
            const dayOfWeek = selectedDate.getDay();
            const price = getPriceForDay(service, dayOfWeek);
            const formattedPrice = formatPrice(price);
            priceDisplayElement.textContent = formattedPrice;
            console.log(`Precio estimado actualizado a: ${formattedPrice}`);
        } catch (error) {
            console.error("Error al actualizar precio:", error);
            priceDisplayElement.textContent = "Error";
        }
        console.log("--- updateAppointmentPriceDisplay FINALIZADO ---");
    }

    // Función para actualizar las horas disponibles (usa las variables globales del DOM)
    // ... (otras variables como dateInputElement, timeInputElement, operatingHours ya definidas) ...
const timeValidationMessageElement = document.getElementById('time-validation-message'); // Obtén el nuevo elemento

function updateAvailableTimes() {
    console.log("--- updateAvailableTimes ejecutada ---");
    if (!dateInputElement || !timeInputElement || !timeValidationMessageElement) { // Incluir el nuevo elemento en la verificación
        console.error("Inputs de fecha/hora o elemento de mensaje de validación no encontrado.");
        return;
    }

    // Limpiar mensaje previo
    timeValidationMessageElement.textContent = '';
    const selectedDateStr = dateInputElement.value;

    if (!selectedDateStr) {
        timeInputElement.min = '';
        timeInputElement.max = '';
        timeInputElement.disabled = true;
        timeInputElement.value = '';
        timeValidationMessageElement.textContent = "Por favor, selecciona una fecha primero."; // Mensaje si no hay fecha
        console.log("Fecha no seleccionada. Input de hora deshabilitado.");
        return;
    }

    try {
        const selectedDate = new Date(selectedDateStr + 'T00:00:00');
        if (isNaN(selectedDate.getTime())) {
            timeValidationMessageElement.textContent = "La fecha seleccionada es inválida.";
            // ... (resto del código para deshabilitar timeInput) ...
            return;
        }

        const dayOfWeek = selectedDate.getDay();
        const hours = operatingHours[dayOfWeek]; // operatingHours debe estar definido

        if (hours) {
            timeInputElement.min = hours.open;
            timeInputElement.max = hours.close;
            timeInputElement.disabled = false;
            timeInputElement.step = "1800"; // 30 minutos

            console.log(`Atributos aplicados a #time: min="${timeInputElement.min}" max="${timeInputElement.max}"`);

            // Comprobar si la hora actual es válida y mostrar mensaje si es necesario
            const currentTimeValue = timeInputElement.value;
            if (currentTimeValue) {
                if (currentTimeValue < hours.open || currentTimeValue > hours.close) {
                    timeValidationMessageElement.textContent = `Hora inválida. Para esta fecha atendemos de ${formatTime(hours.open)} a ${formatTime(hours.close)}.`;
                    // No limpies el valor aquí necesariamente, el navegador ya lo valida.
                    // Podrías añadir una clase de error al input si quieres.
                    // timeInputElement.classList.add('border-red-500');
                } else {
                    // timeInputElement.classList.remove('border-red-500');
                    timeValidationMessageElement.textContent = ''; // Hora válida, sin mensaje
                }
            } else {
                 // Si no hay hora seleccionada aún, puedes poner un mensaje general
                 timeValidationMessageElement.textContent = `Horario disponible: ${formatTime(hours.open)} - ${formatTime(hours.close)}.`;
            }

        } else {
            timeValidationMessageElement.textContent = "No laboramos en la fecha seleccionada.";
            timeInputElement.min = '';
            timeInputElement.max = '';
            timeInputElement.disabled = true;
            timeInputElement.value = '';
            console.warn(`No se encontraron horarios para el día ${dayOfWeek}.`);
        }
    } catch (error) {
        console.error("Error dentro de updateAvailableTimes:", error);
        timeValidationMessageElement.textContent = "Error al determinar el horario.";
        // ... (código para deshabilitar timeInput) ...
    }
    console.log("--- updateAvailableTimes finalizada ---");
}

// Función auxiliar para formatear la hora (opcional, para mensajes más amigables)
function formatTime(timeStr) { // timeStr es HH:MM
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
}


// --- Modifica también el listener del input de hora (si ya tienes uno, si no, añádelo) ---
//     para que actualice el mensaje de validación cuando el usuario cambie la hora.

if (timeInputElement) {
    timeInputElement.addEventListener('input', () => { // 'input' se dispara al cambiar el valor
        // Volver a llamar a updateAvailableTimes es una forma de revalidar
        // o crear una función más específica para solo actualizar el mensaje de validación
        // basado en el min/max ya establecidos.

        // Opción simple: re-ejecutar la lógica de mensajes de updateAvailableTimes
        // (o una sub-función de ella)
        const selectedDateStr = dateInputElement.value;
        if (selectedDateStr && operatingHours) { // Asegurarse que hay fecha y horarios
            const selectedDate = new Date(selectedDateStr + 'T00:00:00');
             if (!isNaN(selectedDate.getTime())) {
                const dayOfWeek = selectedDate.getDay();
                const hours = operatingHours[dayOfWeek];
                const currentTimeValue = timeInputElement.value;

                if (hours && currentTimeValue) {
                     if (currentTimeValue < hours.open || currentTimeValue > hours.close) {
                        timeValidationMessageElement.textContent = `Hora inválida. Atendemos de ${formatTime(hours.open)} a ${formatTime(hours.close)}.`;
                        // timeInputElement.classList.add('border-red-500');
                     } else {
                        timeValidationMessageElement.textContent = ''; // Hora válida
                        // timeInputElement.classList.remove('border-red-500');
                     }
                } else if (hours && !currentTimeValue) { // Si se borra la hora
                    timeValidationMessageElement.textContent = `Horario disponible: ${formatTime(hours.open)} - ${formatTime(hours.close)}.`;
                }
             }
        }
    });
}
    // Función global para reservar desde tarjeta (usa las variables globales del DOM)
    function bookService(serviceId) {
        console.log(`--- bookService INICIADO --- ID: ${serviceId}`);
         if (!serviceSelectElement || !appointmentSection) { console.error("Faltan elementos para bookService"); return; }
         try {
             serviceSelectElement.value = serviceId;
             if (serviceSelectElement.value !== serviceId) { console.warn(`No se pudo seleccionar servicio ${serviceId}`); }
             // Disparar change para actualizar precio Y hora
             const changeEvent = new Event('change', { bubbles: true });
             serviceSelectElement.dispatchEvent(changeEvent); // Actualiza precio
             if(dateInputElement) dateInputElement.dispatchEvent(changeEvent); // Actualiza hora si hay fecha
             console.log("Evento change disparado en select y date (si existe)");
         } catch (error) { console.error("Error al seleccionar servicio:", error); }
         // Scroll
         setTimeout(() => {
             try {
                 const offsetTop = appointmentSection.offsetTop - 80;
                 window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                 console.log("Scroll ejecutado.");
             } catch (scrollError) { console.error("Error en scroll:", scrollError); }
         }, 50);
        console.log(`--- bookService FINALIZADO ---`);
    }


    // --- 4. Ejecutar Funciones de Inicialización ---
    if (weeklyIndicatorContainer) renderWeeklyIndicator(weeklyIndicatorContainer);
    if (servicesGridContainer) renderServiceCards(servicesGridContainer);
    if (serviceSelectElement) populateServiceSelect(serviceSelectElement);


    // --- 5. Añadir Listeners ---

    // Listener para cambios en Fecha (actualiza precio Y hora)
    if (dateInputElement) {
        const today = new Date().toISOString().split('T')[0];
        dateInputElement.setAttribute('min', today);
        dateInputElement.addEventListener('change', () => {
            updateAppointmentPriceDisplay(); // Actualizar precio
            updateAvailableTimes();        // Actualizar hora
        });
        // Llamada inicial para establecer estado correcto de la hora y precio si hay fecha
        if (dateInputElement.value) {
             updateAppointmentPriceDisplay();
             updateAvailableTimes();
        } else {
             updateAvailableTimes(); // Asegura que la hora esté deshabilitada si no hay fecha inicial
        }
    } else {
         console.error("Listener no añadido: #date no encontrado.");
    }

    // Listener para cambios en Servicio (solo actualiza precio)
    if (serviceSelectElement) {
        serviceSelectElement.addEventListener('change', updateAppointmentPriceDisplay);
        // Llamada inicial si hay servicio seleccionado
         if (serviceSelectElement.value && dateInputElement && dateInputElement.value) {
             updateAppointmentPriceDisplay();
         }
    } else {
         console.error("Listener no añadido: #service no encontrado.");
    }

    // Listener para envío del formulario
    if (appointmentFormElement) {
        appointmentFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Formulario de reserva enviado.");
            // Reúne los datos del formulario (asegúrate de que los IDs name, phone, email, notes existan)
            const name = document.getElementById('name')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const email = document.getElementById('email')?.value || ''; // ¿Tienes campo email?
            const dateValue = dateInputElement?.value || '';
            const timeValue = timeInputElement?.value || ''; // Usar timeInputElement
            const serviceId = serviceSelectElement?.value || '';
            const notes = document.getElementById('notes')?.value || '';

             if (!dateValue || !serviceId || !timeValue) { // Añadir validación de hora
                 console.error("Falta fecha, servicio u hora seleccionados.");
                 alert("Por favor, selecciona fecha, hora y servicio."); // Feedback al usuario
                 return;
             }

            const service = servicesData.find(s => s.id === serviceId);
            const serviceName = service ? service.name : 'Servicio Desconocido';
            const finalPriceText = priceDisplayElement ? priceDisplayElement.textContent : 'N/A'; // Usar el precio ya mostrado

            const message = `Hola, me gustaría agendar una cita:\n\n` +
                          `Nombre: ${name}\n` +
                          `Teléfono: ${phone}\n` +
                          (email ? `Email: ${email}\n` : '') + // Incluir email solo si existe
                          `Fecha: ${dateValue}\n` +
                          `Hora: ${timeValue}\n` +
                          `Servicio: ${serviceName}\n` +
                          `Precio Estimado: ${finalPriceText}\n` +
                          `Notas: ${notes || 'Ninguna'}`;

            const whatsappUrl = `https://wa.me/51917277552?text=${encodeURIComponent(message)}`; // Reemplaza con TU número
            console.log("Abriendo WhatsApp con URL:", whatsappUrl);
            window.open(whatsappUrl, '_blank');
            // Considera si quieres resetear el formulario después de enviar a WhatsApp
            // appointmentFormElement.reset();
            // updateAvailableTimes(); // Resetea el estado de la hora
            // updateAppointmentPriceDisplay(); // Resetea el precio
        });
    } else {
         console.error("Listener no añadido: #appointment-form no encontrado.");
    }

    // Inicializar otros componentes (Lightbox, etc.) si es necesario
    // ... tu código para el lightbox ...

}); // --- FIN DEL DOMContentLoaded ---




// --- Lógica del Lightbox (Revisada para Depuración) ---
const lightbox = document.getElementById('gallery-lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const closeLightboxBtn = document.getElementById('close-lightbox');

function openLightbox(contentElement) {
    if (!lightbox || !lightboxContent) {
        console.error("Error: Elementos del lightbox no encontrados.");
        return;
    }
    console.log("Intentando abrir lightbox...");
    lightboxContent.innerHTML = ''; // Limpiar
    lightboxContent.appendChild(contentElement); // Añadir

    // Forzar la eliminación de 'hidden' y añadir 'flex'
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    console.log("Clases del Lightbox después de abrir:", lightbox.classList.toString()); // Verificar clases

    // Si es video, intentar reproducir
    if (contentElement.tagName === 'VIDEO') {
        contentElement.play().catch(e => console.log("Autoplay prevenido:", e));
    }
    console.log("Lightbox debería estar visible.");
}

function closeLightbox() {
     if (!lightbox || !lightboxContent) return;
     console.log("Intentando cerrar lightbox...");

    const video = lightboxContent.querySelector('video');
    if (video) {
        video.pause();
        console.log("Video pausado en lightbox.");
    }

    // Forzar la adición de 'hidden' y quitar 'flex'
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    lightboxContent.innerHTML = ''; // Limpiar contenido
    console.log("Clases del Lightbox después de cerrar:", lightbox.classList.toString()); // Verificar clases
    console.log("Lightbox debería estar oculto.");
}

// Listener para cerrar el Lightbox (Botón)
if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
} else {
    console.error("Botón de cierre del lightbox (#close-lightbox) no encontrado.");
}

// Listener para cerrar el Lightbox (Click fuera)
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            console.log("Click detectado fuera del contenido del lightbox.");
            closeLightbox();
        }
    });
} else {
    console.error("Elemento principal del lightbox (#gallery-lightbox) no encontrado.");
}

// Listener para cerrar el Lightbox (Tecla Escape)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
         console.log("Tecla Escape presionada, cerrando lightbox.");
        closeLightbox();
    }
});

// --- Event Delegation para Abrir Lightbox (Revisado para Depuración) ---
const servicesGridContainer = document.getElementById('services-grid'); // Asegúrate que esta variable esté definida en este scope

if (servicesGridContainer) {
    servicesGridContainer.addEventListener('click', function(e) {
        console.log("Click detectado en services-grid."); // <- Log para ver si el listener general funciona

        const imageTrigger = e.target.closest('.service-image-trigger');
        const videoTrigger = e.target.closest('.service-video-trigger');

        if (imageTrigger) {
            console.log("Click detectado en imageTrigger:", imageTrigger); // <- Log específico
            e.preventDefault();
            const imgSrc = imageTrigger.getAttribute('data-lightbox-src');
            console.log("Obtenido data-lightbox-src:", imgSrc); // <- Log de la URL

            if (imgSrc) {
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.alt = "Vista ampliada del servicio";
                imgElement.className = 'max-w-full max-h-[85vh] object-contain block'; // block para evitar espacio extra
                imgElement.onload = () => console.log("Imagen cargada en el elemento para lightbox.");
                imgElement.onerror = () => console.error("Error al cargar la imagen para el lightbox:", imgSrc);
                openLightbox(imgElement);
            } else {
                console.error("El atributo data-lightbox-src está vacío o no existe.");
            }
        } else if (videoTrigger) {
            console.log("Click detectado en videoTrigger:", videoTrigger); // <- Log específico
            e.preventDefault();
            const videoSrc = videoTrigger.getAttribute('data-video-src');
             console.log("Obtenido data-video-src:", videoSrc); // <- Log de la URL

            if (videoSrc) {
                const videoElement = document.createElement('video');
                videoElement.src = videoSrc;
                videoElement.controls = true;
                videoElement.autoplay = true;
                videoElement.className = 'max-w-full max-h-[85vh] block'; // block para evitar espacio extra
                 videoElement.onerror = () => {
                    lightboxContent.innerHTML = '<p class="text-red-500 p-4">Error al cargar el video.</p>';
                    console.error("Error cargando video en lightbox:", videoSrc);
                 };
                 videoElement.oncanplay = () => console.log("Video listo para reproducir en lightbox.");
                openLightbox(videoElement);
            } else {
                 console.error("El atributo data-video-src está vacío o no existe.");
            }
        }
    });
} else {
     console.error("Contenedor #services-grid no encontrado para añadir el listener de clics del lightbox.");
}