class ModernUI {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.carouselContainer = null;
        this.sidebarActive = false;
        this.init();
    }

    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupUI());
        } else {
            this.setupUI();
        }
    }

    setupUI() {
        this.hideLoader();
        this.createParticles();
        this.setupCarousel();
        this.setupSidebar();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupInteractiveEffects();
        console.log('🚀 Modern UI initialized successfully!');
    }

    // ====================================
    // SISTEMA DE LOADER
    // ====================================
    hideLoader() {
        setTimeout(() => {
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }

    // ====================================
    // SISTEMA DE PARTÍCULAS
    // ====================================
    createParticles() {
        const particlesContainer = document.querySelector('.particles') || this.createParticlesContainer();
        const particleCount = window.innerWidth > 768 ? 50 : 30;

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticlesContainer() {
        const container = document.createElement('div');
        container.className = 'particles';
        document.body.appendChild(container);
        return container;
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Duración de animación aleatoria
        particle.style.animationDuration = (Math.random() * 4 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);

        // Recrear partícula después de un tiempo aleatorio
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.createParticle(container);
            }
        }, Math.random() * 10000 + 5000);
    }

    // ====================================
    // SISTEMA DE CARRUSEL
    // ====================================
    setupCarousel() {
        this.carouselContainer = document.querySelector('.carousel-container');
        if (!this.carouselContainer) return;

        const cards = this.carouselContainer.querySelectorAll('.main-card');
        this.totalSlides = Math.max(0, cards.length - Math.floor(window.innerWidth / 320));

        this.createCarouselControls();
        this.setupCarouselEvents();
        this.setupAutoSlide();
    }

    createCarouselControls() {
        const carousel = document.querySelector('.carousel');
        if (!carousel || carousel.querySelector('.carousel-prev')) return;

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-control carousel-prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => this.previousSlide());

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-control carousel-next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => this.nextSlide());

        carousel.appendChild(prevBtn);
        carousel.appendChild(nextBtn);
    }

    setupCarouselEvents() {
        // Touch/Swipe para móviles
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.carouselContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.carouselContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0;
        }
        this.updateCarousel();
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = this.totalSlides;
        }
        this.updateCarousel();
    }

    updateCarousel() {
        if (!this.carouselContainer) return;
        
        const translateX = -this.currentSlide * 320;
        this.carouselContainer.style.transform = `translateX(${translateX}px)`;
    }

    setupAutoSlide() {
        setInterval(() => {
            if (!document.querySelector('.carousel:hover')) {
                this.nextSlide();
            }
        }, 5000);
    }

    // ====================================
    // SISTEMA DE SIDEBAR
    // ====================================
    setupSidebar() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveNavItem(item);
                this.handleNavigation(item.dataset.section || `section-${index}`);
            });
        });

        // Efecto de hover mejorado
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.transform = 'translateX(0) scale(1)';
                }
            });
        });
    }

    setActiveNavItem(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            item.style.transform = 'translateX(0) scale(1)';
        });
        
        activeItem.classList.add('active');
        activeItem.style.transform = 'translateX(8px) scale(1.02)';
    }

    handleNavigation(section) {
        console.log(`Navegando a: ${section}`);
        
        // Simular cambio de contenido
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.opacity = '0.7';
            setTimeout(() => {
                mainContainer.style.opacity = '1';
            }, 300);
        }
    }

    // ====================================
    // MENÚ MÓVIL
    // ====================================
    setupMobileMenu() {
        this.createMobileMenuButton();
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.sidebar');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (this.sidebarActive && 
                !sidebar.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });
    }

    createMobileMenuButton() {
        if (document.querySelector('.mobile-menu-btn')) return;
        
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        document.body.appendChild(menuBtn);
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!sidebar) return;
        
        this.sidebarActive = !this.sidebarActive;
        sidebar.classList.toggle('active', this.sidebarActive);
        
        // Cambiar icono del botón
        const icon = menuBtn.querySelector('i');
        icon.className = this.sidebarActive ? 'fas fa-times' : 'fas fa-bars';
        
        // Efecto en el botón
        menuBtn.style.transform = this.sidebarActive ? 'rotate(90deg)' : 'rotate(0deg)';
    }

    // ====================================
    // EFECTOS DE SCROLL
    // ====================================
    setupScrollEffects() {
        const mainContainer = document.querySelector('.main-container');
        if (!mainContainer) return;

        mainContainer.addEventListener('scroll', () => {
            this.handleScrollEffects(mainContainer.scrollTop);
        });
    }

    handleScrollEffects(scrollTop) {
        // Efecto parallax en títulos
        const titles = document.querySelectorAll('.section-title');
        titles.forEach((title, index) => {
            const speed = 0.5 + (index * 0.1);
            title.style.transform = `translateY(${scrollTop * speed * 0.1}px)`;
        });

        // Efecto en tarjetas
        const cards = document.querySelectorAll('.main-card, .featured-card');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // ====================================
    // EFECTOS INTERACTIVOS
    // ====================================
    setupInteractiveEffects() {
        this.setupCardEffects();
        this.setupButtonEffects();
        this.setupThemeEffects();
    }

    setupCardEffects() {
        const cards = document.querySelectorAll('.main-card, .featured-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e, card);
            });
            
            card.addEventListener('click', (e) => {
                this.handleCardClick(card);
            });
        });
    }

    createRippleEffect(e, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    handleCardClick(card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        console.log('Card clicked:', card);
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('button, .nav-item');
        
        buttons.forEach(button => {
            button.addEventListener('mousedown', () => {
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = '';
            });
        });
    }

    setupThemeEffects() {
        // Cambio dinámico de colores basado en la hora
        const hour = new Date().getHours();
        const root = document.documentElement;
        
        if (hour >= 6 && hour < 18) {
            // Modo día (más sutil)
            root.style.setProperty('--primary-glow', 'rgba(82, 113, 255, 0.3)');
        } else {
            // Modo noche (más intenso)
            root.style.setProperty('--primary-glow', 'rgba(0, 255, 255, 0.4)');
        }
    }

    // ====================================
    // MÉTODOS UTILITARIOS
    // ====================================
    updateOnResize() {
        window.addEventListener('resize', () => {
            this.setupCarousel();
            
            // Recrear partículas si cambia mucho el tamaño
            if (Math.abs(window.innerWidth - this.lastWidth) > 200) {
                document.querySelector('.particles').innerHTML = '';
                this.createParticles();
                this.lastWidth = window.innerWidth;
            }
        });
        
        this.lastWidth = window.innerWidth;
    }

    // Método para agregar contenido dinámico
    addCarouselItem(title, description, imageUrl) {
        const container = this.carouselContainer;
        if (!container) return;

        const card = document.createElement('div');
        card.className = 'main-card';
        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}" />
            <div class="main-card-info">
                <div class="main-card-title">${title}</div>
                <div class="main-card-desc">${description}</div>
            </div>
        `;
        
        container.appendChild(card);
        this.setupCarousel(); // Actualizar carrusel
        
        // Animar entrada
        setTimeout(() => {
            card.style.animation = 'cardAppear 0.6s ease-out';
        }, 100);
    }

    // Método para mostrar notificaciones
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            border-left: 4px solid ${type === 'success' ? '#00FF00' : type === 'error' ? '#FF0000' : '#00FFFF'};
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ====================================
// CSS ADICIONAL PARA ANIMACIONES JS
// ====================================
const additionalStyles = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification {
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.carousel-container {
    will-change: transform;
}

.main-card, .featured-card {
    will-change: transform, opacity;
}
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ====================================
// INICIALIZACIÓN GLOBAL
// ====================================
const modernUI = new ModernUI();

// Exportar para uso global
window.ModernUI = modernUI;

// Event listeners adicionales para funcionalidades específicas
document.addEventListener('DOMContentLoaded', () => {
    // Configurar eventos personalizados
    modernUI.updateOnResize();
    
    // Ejemplo de uso de notificaciones
    setTimeout(() => {
        modernUI.showNotification('¡Interfaz cargada correctamente!', 'success');
    }, 2000);
});

// Debugging y utilidades de desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugUI = {
        addCard: (title, desc, img) => modernUI.addCarouselItem(title, desc, img),
        notify: (msg, type) => modernUI.showNotification(msg, type),
        nextSlide: () => modernUI.nextSlide(),
        prevSlide: () => modernUI.previousSlide()
    };
    
    console.log('🛠️ Debug utilities available as window.debugUI');
}