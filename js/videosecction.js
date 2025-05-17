document.addEventListener('DOMContentLoaded', function() {
    const videoContainers = document.querySelectorAll('.video-container video');
    const videoSection = document.getElementById('about-section');
    const expandedVideoContainer = document.getElementById('expanded-overlay');
    const expandedVideo = document.getElementById('expanded-video');
    const playButton = document.getElementById('play-button');
    const expandButton = document.getElementById('expand-button');
    const closeExpandedButton = document.getElementById('close-expanded');

    if (!videoSection || !videoContainers.length) {
        console.log("Elementos de video no encontrados en la página");
        return;
    }

    let currentVideoIndex = 0;
    let isPlaying = false;

    function playNextVideo() {
        if (currentVideoIndex < videoContainers.length) {
            const video = videoContainers[currentVideoIndex];
            video.muted = true; // Asegúrate de que el video esté silenciado
            video.play().then(() => {
                isPlaying = true;
                currentVideoIndex++;
            }).catch(error => {
                console.error("Error al reproducir el video:", error);
            });
        }
    }

    function handleScroll() {
        const windowHeight = window.innerHeight;
        videoContainers.forEach((video, index) => {
            const rect = video.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                if (currentVideoIndex === index && !isPlaying) {
                    playNextVideo();
                }
            }
        });
    }

    function expandVideo() {
        if (!expandedVideoContainer) return;

        expandedVideoContainer.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        // Aquí puedes agregar la lógica para reproducir el video expandido
    }

    function closeExpandedVideo() {
        if (!expandedVideoContainer) return;

        expandedVideoContainer.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isPlaying) {
                playNextVideo();
            } else if (!entry.isIntersecting && isPlaying) {
                videoContainers[currentVideoIndex - 1].pause();
                isPlaying = false;
            }
        });
    }, { threshold: 0.5 });

    videoContainers.forEach(container => {
        observer.observe(container);
    });

    window.addEventListener('scroll', handleScroll);
    if (expandButton) expandButton.addEventListener('click', expandVideo);
    if (closeExpandedButton) closeExpandedButton.addEventListener('click', closeExpandedVideo);
});
