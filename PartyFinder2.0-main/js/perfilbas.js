 document.addEventListener('DOMContentLoaded', function() {
    // Ajustar sidebar en móviles
    function handleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth < 768) {
            sidebar.style.width = '75px';
            sidebar.querySelectorAll('.nav-text, .logo-text, .profile-info').forEach(el => {
                el.style.opacity = '0';
            });
        }
    }

    // Navegación entre pestañas
    const navItems = document.querySelectorAll('.venue-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Aquí iría la lógica para cargar el contenido correspondiente
            // Ejemplo: cargarSeccion(this.dataset.section);
        });
    });

    // Ajustar layout al cambiar tamaño de pantalla
    function handleResize() {
        handleSidebar();
        
        const sidebar = document.querySelector('.venue-sidebar');
        if (window.innerWidth < 992) {
            sidebar.style.position = 'relative';
        } else {
            sidebar.style.position = 'sticky';
        }
    }

    // Inicializar
    handleResize();
    window.addEventListener('resize', handleResize);

    // Lightbox para galería (opcional)
    const galleryItems = document.querySelectorAll('.gallery-grid-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="" class="lightbox-img">
            <div class="lightbox-nav">
                <div class="lightbox-button prev"><i class="fas fa-chevron-left"></i></div>
                <div class="lightbox-button next"><i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            lightbox.classList.add('active');
            lightbox.querySelector('.lightbox-img').src = images[currentImageIndex];
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.querySelector('.prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightbox.querySelector('.lightbox-img').src = images[currentImageIndex];
    });

    lightbox.querySelector('.next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightbox.querySelector('.lightbox-img').src = images[currentImageIndex];
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                lightbox.querySelector('.prev').click();
            } else if (e.key === 'ArrowRight') {
                lightbox.querySelector('.next').click();
            }
        }
    });
});