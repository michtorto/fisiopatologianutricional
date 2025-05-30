document.addEventListener("DOMContentLoaded", function () {
    // === CLICK EN ARTÍCULOS: Cambia el fondo (sin alerta) ===
    document.querySelectorAll("article").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll("article").forEach(a => a.style.backgroundColor = "white");
            item.style.backgroundColor = "#ffff99";
        });
    });

    // === DETAILS: Abre solo uno a la vez ===
    document.querySelectorAll("details").forEach((item) => {
        item.addEventListener("click", function () {
            document.querySelectorAll("details").forEach((el) => {
                if (el !== item) el.removeAttribute("open");
            });
        });
    });

    // === ACORDEÓN ===
    document.querySelectorAll(".accordion").forEach((accordion) => {
        accordion.addEventListener("click", function () {
            document.querySelectorAll(".accordion").forEach((otherAccordion) => {
                const panel = otherAccordion.nextElementSibling;
                if (otherAccordion !== this) {
                    otherAccordion.classList.remove("active");
                    panel.style.maxHeight = null;
                    panel.style.paddingTop = "0";
                    panel.style.paddingBottom = "0";
                    otherAccordion.setAttribute("aria-expanded", "false");
                }
            });

            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            const isOpen = this.classList.contains("active");
            this.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.paddingTop = "10px";
                panel.style.paddingBottom = "10px";
            } else {
                panel.style.maxHeight = null;
                panel.style.paddingTop = "0";
                panel.style.paddingBottom = "0";
            }
        });
    });

    // === Smooth Scroll en el Índice ===
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

  window.entrarSitio = function () {
    const portada = document.getElementById("portadaAnimada");
    portada.style.transition = "opacity 1s ease";
    portada.style.opacity = 0;
    setTimeout(() => {
        portada.style.display = "none";
        // Desplazar automáticamente a la subportada
        const subportada = document.getElementById("subportada");
        if (subportada) {
            subportada.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, 1000);
};


    // === Botón Volver Arriba ===
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });
    }
});
window.buscarTexto = function () {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const articulos = document.querySelectorAll("main article");

    articulos.forEach(article => {
        const textoOriginal = article.textContent.toLowerCase();
        article.style.display = textoOriginal.includes(query) ? "block" : "none";
    });
};
