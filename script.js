// --- Inicialización de AOS (Animate On Scroll) ---
document.addEventListener("DOMContentLoaded", function () {
    // Inicializar AOS
    AOS.init({
        duration: 800, // Duración de la animación
        easing: 'ease-in-out', // Tipo de animación
        once: true // Si la animación debe ejecutarse solo una vez
    });

    // --- Funcionalidad del Menú Hamburguesa ---
    window.toggleMenu = function (event) {
        event?.stopPropagation();
        const sidebar = document.getElementById("sidebar");
        const menuIcon = document.querySelector('.menu-icon');
        sidebar.classList.toggle("active");
        menuIcon.classList.toggle("active"); // Para la animación de la X
    };

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", function (event) {
        const sidebar = document.getElementById("sidebar");
        const menuIcon = document.querySelector('.menu-icon');
        if (sidebar.classList.contains("active") &&
            !sidebar.contains(event.target) &&
            !document.querySelector('.menu-icon').contains(event.target)) {
            sidebar.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Cerrar el menú móvil si está abierto
                const sidebar = document.getElementById("sidebar");
                const menuIcon = document.querySelector('.menu-icon');
                if (sidebar.classList.contains("active")) {
                    sidebar.classList.remove("active");
                    menuIcon.classList.remove("active");
                }
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Cerrar menú al cambiar tamaño de ventana
    window.addEventListener('resize', function () {
        const sidebar = document.getElementById("sidebar");
        const menuIcon = document.querySelector('.menu-icon');
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    // --- Funcionalidad del Botón Volver Arriba ---
    const backToTopButton = document.getElementById("backToTop");

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Validación de Formulario ---
  // --- Validación de Formulario ---
// Asegúrate de que este código esté DENTRO del DOMContentLoaded listener
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        // Obtenemos los valores
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        // Bandera para saber si es válido
        let isValid = true;
        let errorMessage = "";

        // Validaciones
        if (!name) {
            isValid = false;
            errorMessage += "Por favor, ingresa tu nombre.\n";
        }
        if (!email) {
            isValid = false;
            errorMessage += "Por favor, ingresa tu correo electrónico.\n";
        } else {
            // Validación de email simple
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                isValid = false;
                errorMessage += "Por favor, introduce un correo electrónico válido.\n";
            }
        }
        if (!service) {
            isValid = false;
            errorMessage += "Por favor, selecciona un servicio.\n";
        }
        if (!message) {
            isValid = false;
            errorMessage += "Por favor, describe tu proyecto.\n";
        }

        // Si NO es válido, prevenimos el envío y mostramos error
        if (!isValid) {
            e.preventDefault(); // Solo prevenimos si hay error
            alert(errorMessage);
            return; // Salimos de la función
        }
        // Si ES válido, NO llamamos a e.preventDefault().
        // El formulario se enviará normalmente a la URL del 'action' (Formspree).
        // Opcionalmente, puedes mostrar un mensaje antes de que se envíe:
        // alert('Enviando mensaje...');
        // O limpiar el formulario después (aunque Formspree suele redirigir)
        // this.reset();
    });
}


    // --- Funcionalidad del Carrusel de Proyectos ---
    const carouselInner = document.querySelector(".carousel-inner");
    const projectCards = document.querySelectorAll(".project-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const indicators = document.querySelectorAll(".indicator");

    if (carouselInner && projectCards.length > 0 && prevBtn && nextBtn && indicators.length > 0) {
        let currentIndex = 0;
        const totalCards = projectCards.length;

        // Función para actualizar el índice del proyecto activo
        function updateActiveIndex(newIndex) {
            // Asegurarse de que el índice esté dentro de los límites
            if (newIndex < 0) {
                currentIndex = totalCards - 1; // Volver al último
            } else if (newIndex >= totalCards) {
                currentIndex = 0; // Volver al primero
            } else {
                currentIndex = newIndex;
            }

            // Eliminar la clase "active" de todos los proyectos e indicadores
            projectCards.forEach((card) => card.classList.remove("active"));
            indicators.forEach((indicator) => indicator.classList.remove("active"));

            // Marcar el proyecto e indicador actual como activo
            projectCards[currentIndex].classList.add("active");
            indicators[currentIndex].classList.add("active");

            // Calcular el desplazamiento
            const offset = -currentIndex * 100 + "%";
            carouselInner.style.transform = `translateX(${offset})`;
        }

        // Evento para botón siguiente
        nextBtn.addEventListener("click", function () {
            updateActiveIndex(currentIndex + 1);
        });

        // Evento para botón anterior
        prevBtn.addEventListener("click", function () {
            updateActiveIndex(currentIndex - 1);
        });

        // Eventos para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", function () {
                updateActiveIndex(index);
            });
        });

        // --- Auto-play opcional (descomentar si se desea) ---
        /*
        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                updateActiveIndex(currentIndex + 1);
            }, 5000); // Cambia cada 5 segundos
        }
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        // Iniciar autoplay
        startAutoPlay();
        // Pausar autoplay al pasar el mouse
        const projectCarousel = document.querySelector('.project-carousel');
        projectCarousel.addEventListener('mouseenter', stopAutoPlay);
        projectCarousel.addEventListener('mouseleave', startAutoPlay);
        */
    }

}); // Fin de DOMContentLoaded