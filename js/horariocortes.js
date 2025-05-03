
const servicesData = [
    { id: 'clasico', name: 'Corte Clásico', description: 'Un estilo atemporal y definido.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-cut', imageUrl: 'https://i.pinimg.com/1200x/ee/de/9e/eede9eecc73040b969fa6f263c98ea8c.jpg' }, // <- Añadir imageUrl
    { id: 'taper', name: 'Taper Fade', description: 'Desvanecido gradual en sienes y nuca.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-signature', imageUrl: 'img/corte/Taperfade.png', videoUrl: 'video/corte/taperfade.mp4' },
    { id: 'low', name: 'Low Fade', description: 'Desvanecido bajo para un look sutil.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-level-down-alt', imageUrl: 'https://i.pinimg.com/1200x/b1/d4/1b/b1d41b5c73fd9a2883bb1765157ac072.jpg', videoUrl: 'video/corte/lowfade.mp4' },
    { id: 'mid', name: 'Mid Fade', description: 'Desvanecido medio, versátil y moderno.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-arrows-alt-h', imageUrl: 'img/corte/midfade.jpg', videoUrl: 'video/corte/midfade.mp4' },
    { id: 'burst', name: 'Burst Fade', description: 'Desvanecido circular alrededor de la oreja.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-adjust', imageUrl: 'https://i.pinimg.com/736x/b3/46/31/b346314e675c66c006493c4f06bf45c8.jpg', videoUrl: 'video/corte/burtsfade.mp4' },
    { id: 'diseno', name: 'Corte con Diseño', description: 'Líneas o figuras simples.', priceWeekday: 35, priceWeekend: 55, icon: 'fa-pencil-ruler', imageUrl: 'https://i.pinimg.com/736x/86/48/b9/8648b91efdd493b5be9b8285fcffff26.jpg', videoUrl: 'video/corte/diseño.mp4' },
    { id: 'corte_barba', name: 'Corte + Barba', description: 'Incluye definición y navaja.', priceWeekday: 40, priceWeekend: 60, icon: 'fa-beard', imageUrl: 'https://i.pinimg.com/1200x/dc/92/a5/dc92a5c18334ecf734767cabe922db06.jpg', videoUrl: 'video/corte/barba.mp4' },
    { id: 'ninos', name: 'Corte para Niños', description: 'Menores de 12 años.', priceWeekday: 30, priceWeekend: 50, icon: 'fa-child', imageUrl: 'https://i.pinimg.com/736x/1c/d4/54/1cd454d308c685806f1d3607bb48d4f9.jpg', videoUrl: 'video/corte/niñomenor12.mp4' },
    { id: 'facial', name: 'Limpieza Facial', description: 'Revitaliza y cuida tu piel.', priceWeekday: 30, priceWeekend: 30, icon: 'fa-spa', imageUrl: 'https://i.pinimg.com/736x/3f/78/97/3f7897ac4f9c7fdda8eaa7a923e611b5.jpg' },
    { id: 'cejas', name: 'Cejas', description: 'Gratis con cualquier servicio.', priceWeekday: 0, priceWeekend: 0, icon: 'fa-eye', imageUrl: 'https://i.pinimg.com/736x/01/9f/30/019f30027c8dc0fc34a5a656a56fc50c.jpg' }
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
                <div class="w-full h-48 overflow-hidden relative cursor-pointer service-image-trigger" data-lightbox-src="${service.imageUrl || 'img/servicios/placeholder.jpg'}">
                     <img src="${service.imageUrl || 'img/servicios/placeholder.jpg'}" alt="${service.name}" class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105">
                     <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                         <i class="fas fa-expand text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                     </div>
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex items-start mb-3">
                        <div class="rounded-full gold-bg p-2 mr-3 text-sm"><i class="fas ${service.icon || 'fa-star'} text-black"></i></div>
                        <h3 class="text-xl font-bold pt-1">${service.name}</h3>
                    </div>
                    <p class="text-gray-400 text-sm mb-4 flex-grow">${service.description || ''}</p>
                    <div class="mt-auto flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-gray-700">
                        <span class="gold-text font-bold text-lg" id="price-span-${service.id}">${priceString}</span>
                        <div class="flex gap-2">
                             ${hasVideo ? `<button class="text-xs btn-gold bg-opacity-80 hover:bg-opacity-100 py-1 px-2 rounded service-video-trigger" data-video-src="${service.videoUrl}"><i class="fas fa-play mr-1"></i> Ver Video</button>` : ''}
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

        // Obtener referencias a los elementos AHORA que el DOM está listo
        const servicesGridContainer = document.getElementById('services-grid');
        const weeklyIndicatorContainer = document.getElementById('weekly-price-indicator');
        const serviceSelectElement = document.getElementById('service');
        const dateInputElement = document.getElementById('date');
        const priceDisplayElement = document.getElementById('appointment-price-display');
        const appointmentFormElement = document.getElementById('appointment-form');

        // Verificar si los elementos existen antes de usarlos
        if (!servicesGridContainer) console.error("Falta el div #services-grid");
        if (!weeklyIndicatorContainer) console.error("Falta el div #weekly-price-indicator");
        if (!serviceSelectElement) console.error("Falta el select #service");
        if (!dateInputElement) console.error("Falta el input #date");
        if (!priceDisplayElement) console.error("Falta el span #appointment-price-display");
        if (!appointmentFormElement) console.error("Falta el form #appointment-form");

        // Ejecutar las funciones de renderizado
        renderWeeklyIndicator(weeklyIndicatorContainer);
        renderServiceCards(servicesGridContainer);
        populateServiceSelect(serviceSelectElement);

        // Configurar fecha mínima y listeners del formulario de reserva
        if (dateInputElement) {
            const today = new Date().toISOString().split('T')[0];
            dateInputElement.setAttribute('min', today);
            dateInputElement.addEventListener('change', () => updateAppointmentPrice(serviceSelectElement, dateInputElement, priceDisplayElement));
            // Si ya hay una fecha (p.ej. por autocompletar), actualizar precio
            if(dateInputElement.value) {
                 updateAppointmentPrice(serviceSelectElement, dateInputElement, priceDisplayElement);
            }
        }

        if (serviceSelectElement) {
            serviceSelectElement.addEventListener('change', () => updateAppointmentPrice(serviceSelectElement, dateInputElement, priceDisplayElement));
             // Si ya hay un servicio seleccionado (p.ej. por caché del navegador), actualizar precio
             if(serviceSelectElement.value) {
                 updateAppointmentPrice(serviceSelectElement, dateInputElement, priceDisplayElement);
            }
        }

        // Listener del formulario de reserva
        if (appointmentFormElement) {
            appointmentFormElement.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log("Formulario de reserva enviado.");

                const name = document.getElementById('name')?.value || ''; // Añadir '?' por seguridad
                const phone = document.getElementById('phone')?.value || '';
                const email = document.getElementById('email')?.value || '';
                const dateValue = dateInputElement?.value || '';
                const time = document.getElementById('time')?.value || '';
                const serviceId = serviceSelectElement?.value || '';
                const notes = document.getElementById('notes')?.value || '';

                if (!dateValue || !serviceId) {
                    console.error("Falta fecha o servicio seleccionado.");
                    // Podrías mostrar una notificación al usuario aquí
                    return;
                }

                const service = servicesData.find(s => s.id === serviceId);
                const serviceName = service ? service.name : 'Servicio Desconocido';

                const selectedDate = new Date(dateValue + 'T00:00:00');
                const dayOfWeek = selectedDate.getDay();
                const finalPrice = service ? getPriceForDay(service, dayOfWeek) : 0;
                const priceText = formatPrice(finalPrice);

                const message = `Hola, me gustaría agendar una cita:\n\n` +
                                `Nombre: ${name}\n` +
                                `Teléfono: ${phone}\n` +
                                `Email: ${email}\n` +
                                `Fecha: ${dateValue}\n` +
                                `Hora: ${time}\n` +
                                `Servicio: ${serviceName}\n` +
                                `Precio Estimado: ${priceText}\n` +
                                `Notas: ${notes || 'Ninguna'}`;

                const whatsappUrl = `https://wa.me/51917277552?text=${encodeURIComponent(message)}`; // Reemplaza con tu número
                console.log("Abriendo WhatsApp con URL:", whatsappUrl);
                window.open(whatsappUrl, '_blank');
            });
        } else {
            console.error("No se pudo añadir el listener al formulario de reserva.");
        }
         // Inicializar otras funcionalidades si existen
         // Por ejemplo, inicializar GSAP, carrito, etc. que estaban en el DOMContentLoaded original

    });
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