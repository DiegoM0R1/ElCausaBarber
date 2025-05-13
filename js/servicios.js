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