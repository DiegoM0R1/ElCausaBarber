document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si los elementos existen antes de continuar
    const videoSection = document.getElementById('about-section');
    const video = document.getElementById('barber-video');
    
    // Salir si no hay sección de video o elemento de video
    if (!videoSection || !video) {
        console.log("Elementos de video no encontrados en la página");
        return;
    }
    
    const expandedVideoContainer = document.getElementById('expanded-overlay');
    const expandedVideo = document.getElementById('expanded-video');
    const playButton = document.getElementById('play-button');
    const expandButton = document.getElementById('expand-button');
    const closeExpandedButton = document.getElementById('close-expanded');
    
    // Verificar que todos los elementos necesarios existen
    if (!expandedVideoContainer || !expandedVideo || !playButton || !expandButton || !closeExpandedButton) {
        console.error("Faltan elementos necesarios para el reproductor de video");
        return;
    }
    
    const playIcon = playButton.querySelector('.play-icon');
    const pauseIcon = playButton.querySelector('.paused');
    
    // Verificar que los iconos existen
    if (!playIcon || !pauseIcon) {
        console.error("Iconos de reproducción no encontrados");
        return;
    }

    let userPaused = false;
    let isPlaying = false;
    
    // No hay necesidad de sincronizar la fuente si ya está en el HTML

    function togglePlay() {
        if (video.paused) {
            // Intentar reproducir con manejo de errores mejorado
            try {
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            if (expandedVideoContainer.classList.contains('active') && expandedVideo) {
                                expandedVideo.play().catch(e => console.log("No se pudo reproducir video expandido:", e));
                            }
                            if (playIcon) playIcon.classList.add('hidden');
                            if (pauseIcon) pauseIcon.classList.remove('hidden');
                            isPlaying = true;
                            userPaused = false;
                        })
                        .catch(error => {
                            console.error("Error al reproducir el video:", error);
                            // Si falla, mantener el estado como pausado
                            isPlaying = false;
                        });
                }
            } catch (e) {
                console.error("Error al intentar reproducir:", e);
            }
        } else {
            video.pause();
            if (expandedVideoContainer.classList.contains('active') && expandedVideo) {
                expandedVideo.pause();
            }
            if (playIcon) playIcon.classList.remove('hidden');
            if (pauseIcon) pauseIcon.classList.add('hidden');
            isPlaying = false;
            userPaused = true;
        }
    }

    function expandVideo() {
        if (!expandedVideoContainer) return;
        
        // Utilizar classList.remove('hidden') en lugar de active
        expandedVideoContainer.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        
        if (expandedVideo && video) {
            expandedVideo.currentTime = video.currentTime;
            
            if (!video.paused) {
                try {
                    expandedVideo.play().catch(e => 
                        console.error("Error al reproducir video expandido:", e)
                    );
                } catch (e) {
                    console.error("Error al intentar reproducir video expandido:", e);
                }
            }
        }
    }

    function closeExpandedVideo() {
        if (!expandedVideoContainer) return;
        
        // Utilizar classList.add('hidden') en lugar de active
        expandedVideoContainer.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        
        if (video && expandedVideo) {
            video.currentTime = expandedVideo.currentTime;
            
            if (!expandedVideo.paused && userPaused === false) {
                try {
                    video.play().catch(e => 
                        console.error("Error al reproducir video principal:", e)
                    );
                } catch (e) {
                    console.error("Error al intentar reproducir video principal:", e);
                }
            }
        }
    }

    // Configurar reproducción automática con muted para mejorar compatibilidad
    if (video) {
        video.muted = true; // Esto aumenta la probabilidad de reproducción automática
        
        // Variable para rastrear si ya intentamos activar el sonido
        let audioUnmuteAttempted = false;
        
        // Intentar reproducir el video al cargar la página
        try {
            const initialPlayPromise = video.play();
            
            if (initialPlayPromise !== undefined) {
                initialPlayPromise
                    .then(() => {
                        isPlaying = true;
                        if (playIcon) playIcon.classList.add('hidden');
                        if (pauseIcon) pauseIcon.classList.remove('hidden');
                        
                        // Evento click en el documento para poder activar el audio
                        if (!audioUnmuteAttempted) {
                            document.addEventListener('click', function tryUnmute() {
                                if (video && !video.paused && video.muted) {
                                    video.muted = false;
                                    audioUnmuteAttempted = true;
                                    // Eliminar este listener después de un intento
                                    document.removeEventListener('click', tryUnmute);
                                }
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error al intentar la reproducción automática:", error);
                        isPlaying = false;
                        if (playIcon) playIcon.classList.remove('hidden');
                        if (pauseIcon) pauseIcon.classList.add('hidden');
                    });
            }
        } catch (e) {
            console.error("Error intentando reproducción inicial:", e);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!video) return;
                
                if (entry.isIntersecting && !userPaused && !isPlaying) {
                    video.muted = true; // Importante para móviles
                    
                    try {
                        const observerPlayPromise = video.play();
                        
                        if (observerPlayPromise !== undefined) {
                            observerPlayPromise
                                .then(() => {
                                    isPlaying = true;
                                    if (playIcon) playIcon.classList.add('hidden');
                                    if (pauseIcon) pauseIcon.classList.remove('hidden');
                                })
                                .catch(error => {
                                    console.error("Error al reproducir en observer:", error);
                                    isPlaying = false;
                                });
                        }
                    } catch (e) {
                        console.error("Error al intentar reproducir en observer:", e);
                    }
                } else if (!entry.isIntersecting && isPlaying && !userPaused) {
                    video.pause();
                    if (playIcon) playIcon.classList.remove('hidden');
                    if (pauseIcon) pauseIcon.classList.add('hidden');
                    isPlaying = false;
                }
            });
        }, { threshold: 0.5 });

        // Listeners de eventos
        if (playButton) playButton.addEventListener('click', togglePlay);
        if (expandButton) expandButton.addEventListener('click', expandVideo);
        if (closeExpandedButton) closeExpandedButton.addEventListener('click', closeExpandedVideo);
        
        // Cerrar al hacer clic fuera del video
        if (expandedVideoContainer) {
            expandedVideoContainer.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeExpandedVideo();
                }
            });
        }
        
        // Sincronizar los estados de los videos
        if (video) {
            video.addEventListener('pause', function() {
                if (expandedVideoContainer && expandedVideoContainer.classList.contains('active') && expandedVideo) {
                    expandedVideo.pause();
                }
                isPlaying = false;
                if (playIcon) playIcon.classList.remove('hidden');
                if (pauseIcon) pauseIcon.classList.add('hidden');
            });
            
            video.addEventListener('play', function() {
                if (expandedVideoContainer && expandedVideoContainer.classList.contains('active') && expandedVideo) {
                    try {
                        expandedVideo.play().catch(e => console.error("Error al sincronizar play:", e));
                    } catch (e) {
                        console.error("Error al intentar sincronizar play:", e);
                    }
                }
                isPlaying = true;
                if (playIcon) playIcon.classList.add('hidden');
                if (pauseIcon) pauseIcon.classList.remove('hidden');
            });
        }

        if (videoSection) observer.observe(videoSection);
    } 
});