// === ACORDEÓN: Solo un panel abierto a la vez ===
document.querySelectorAll(".accordion").forEach((accordion) => {
    accordion.addEventListener("click", function () {
        document.querySelectorAll(".accordion").forEach((otherAccordion) => {
            if (otherAccordion !== this) {
                otherAccordion.classList.remove("active");
                const otherPanel = otherAccordion.nextElementSibling;
                otherPanel.style.display = "none";
            }
        });

        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
});

// === BUSCADOR DE TEXTO EN ARTÍCULOS ===
function buscarTexto() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let articles = document.querySelectorAll("article");
    let encontrado = false;

    articles.forEach(article => {
        let text = article.innerText.toLowerCase();
        if (text.includes(input) && input.length > 0) {
            article.style.backgroundColor = "#ffff99"; // Resalta los resultados
            if (!encontrado) {
                article.scrollIntoView({ behavior: "smooth", block: "start" });
                encontrado = true;
            }
        } else {
            article.style.backgroundColor = "white"; // Restaura si no coincide
        }
    });
}

// === CLICK EN ARTÍCULOS: Cambia el fondo (sin alerta) ===
document.querySelectorAll("article").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll("article").forEach(a => a.style.backgroundColor = "white");
        item.style.backgroundColor = "#ffff99";
    });
});

// === DETAILS: Abre solo uno a la vez (si usas <details>) ===
document.querySelectorAll("details").forEach((item) => {
    item.addEventListener("click", function () {
        document.querySelectorAll("details").forEach((el) => {
            if (el !== item) el.removeAttribute("open");
        });
    });
});
document.querySelectorAll(".accordion").forEach((accordion) => {
    accordion.addEventListener("click", function () {
        // Cierra todos los paneles excepto el actual
        document.querySelectorAll(".accordion").forEach((otherAccordion) => {
            const panel = otherAccordion.nextElementSibling;
            if (otherAccordion !== this) {
                otherAccordion.classList.remove("active");
                panel.style.maxHeight = null;
                panel.style.paddingTop = "0";
                panel.style.paddingBottom = "0";
            }
        });

        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingTop = "0";
            panel.style.paddingBottom = "0";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.style.paddingTop = "10px";
            panel.style.paddingBottom = "10px";
        }
    });
});

// Código para Smooth Scrolling en los enlaces del índice
document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Previene el comportamiento por defecto del enlace (salto instantáneo)
        e.preventDefault();

        // Obtiene el ID del destino desde el atributo href
        const targetId = this.getAttribute('href');

        // Encuentra el elemento de destino en la página
        const targetElement = document.querySelector(targetId);

        // Si el elemento de destino existe, desplázate suavemente hacia él
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth' // Habilita el desplazamiento suave
            });
        }
    });
});
// Código para la funcionalidad de búsqueda
function buscarTexto() {
    // Obtiene el input de búsqueda y el término de búsqueda (en mayúsculas para ser insensible a mayúsculas/minúsculas)
    let input = document.getElementById('searchBox');
    let filter = input.value.toUpperCase();

    // Selecciona el contenedor principal de las secciones de contenido (asumiendo que están dentro de <main>)
    let main = document.querySelector('main');
    // Selecciona todas las secciones principales dentro de main
    let sections = main.getElementsByTagName('section');

    // Itera sobre cada sección
    for (let i = 0; i < sections.length; i++) {
        let section = sections[i];
        // Obtiene todo el texto dentro de la sección (o el texto visible si usas textContent)
        let textContent = section.textContent || section.innerText;

        // Comprueba si el texto de la sección contiene el término de búsqueda
        if (textContent.toUpperCase().indexOf(filter) > -1) {
            // Si coincide, muestra la sección
            section.style.display = ""; // "" revierte al estilo de display por defecto (ej: block)
        } else {
            // Si no coincide, oculta la sección
            section.style.display = "none";
        }
    }
}

// Nota: La función buscarTexto() ya está enlazada al evento onkeyup en tu HTML.
// No necesitas llamarla aquí, solo definirla.
function entrarSitio() {
    const portada = document.getElementById("portadaAnimada");
    portada.style.transition = "opacity 1s ease";
    portada.style.opacity = 0;
    setTimeout(() => {
        portada.style.display = "none";
    }, 1000);
}

