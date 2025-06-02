document.addEventListener("DOMContentLoaded", function () {
    // === CLICK EN ARTÍCULOS: Cambia el fondo ===
    // Asegúrate de que esta funcionalidad sea deseada. Si no, puedes eliminar este bloque.
    document.querySelectorAll("main article").forEach(item => { // Apuntamos a articles dentro de main
        item.addEventListener("click", () => {
            // Opcional: Si solo quieres que se resalte el artículo clicado y no se desresalten los otros
            // document.querySelectorAll("main article").forEach(a => a.style.backgroundColor = "white");
            // item.style.backgroundColor = "#ffff99";
            // Si prefieres no hacer nada al hacer clic en el artículo, elimina este event listener.
        });
    });

    // === DETAILS: Abre solo uno a la vez ===
    // Si no usas la etiqueta <details> en tus páginas, puedes eliminar este bloque.
    document.querySelectorAll("details").forEach((item) => {
        item.addEventListener("click", function () {
            document.querySelectorAll("details").forEach((el) => {
                if (el !== item) el.removeAttribute("open");
            });
        });
    });

    // === ACORDEÓN ===
    // Código unificado y corregido para el acordeón.
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach((accordion) => {
        accordion.addEventListener("click", function () {
            // Cierra todos los demás acordeones excepto el actual
            accordions.forEach((otherAccordion) => {
                const otherPanel = otherAccordion.nextElementSibling;
                if (otherAccordion !== this) {
                    otherAccordion.classList.remove("active");
                    // No necesitamos remover la clase 'active' del panel aquí, ya que el max-height lo controla.
                    otherPanel.style.maxHeight = null;
                    otherPanel.style.paddingTop = "0";
                    otherPanel.style.paddingBottom = "0";
                    otherAccordion.setAttribute("aria-expanded", "false");
                }
            });

            // Alterna el estado del acordeón actual
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            const isOpen = this.classList.contains("active");

            this.setAttribute("aria-expanded", isOpen);
            // No necesitamos toggler la clase 'active' en el panel si usamos max-height.
            // panel.classList.toggle("active"); // Eliminado o comentado

            // Ajusta dinámicamente la altura máxima del panel y el padding
            if (isOpen) {
                // Usamos scrollHeight para obtener la altura real del contenido
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.paddingTop = "15px"; // Ajusta según tu CSS
                panel.style.paddingBottom = "15px"; // Ajusta según tu CSS
            } else {
                panel.style.maxHeight = null;
                panel.style.paddingTop = "0";
                panel.style.paddingBottom = "0";
            }
        });

        // Accesibilidad: marca inicialmente el estado cerrado
        accordion.setAttribute("aria-expanded", "false");
    });


    // === Smooth Scroll en el Índice ===
    // Si solo usas esto en index.html, puedes mantenerlo allí o aquí si el script es compartido.
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


    // === Botón Volver Arriba ===
    // Código unificado y corregido para el botón volver arriba.
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) { // Verifica si el botón existe en la página actual
        backToTopBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        window.addEventListener("scroll", () => {
            // Usa classList.add/remove para controlar la visibilidad con CSS
            if (window.scrollY > 300) { // Muestra el botón después de hacer scroll 300px
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });
    }


    // === Código para el Buscador ===
    // Integración de la función de búsqueda refinada.
    const searchInput = document.getElementById('searchBox');

    if (searchInput) { // Verifica si el campo de búsqueda existe en la página actual
        // Selecciona los contenedores principales de contenido que quieres buscar.
        // Basado en tu cardiovascular.html, cada <article> es un buen contenedor.
        const mainContentContainers = document.querySelectorAll('main article'); // <-- SELECTOR AJUSTADO

        function buscarTexto() {
            const query = searchInput.value.toLowerCase().trim();

            mainContentContainers.forEach(container => {
                let containerHasMatch = false; // Bandera para saber si se encontró algo en este artículo

                // Selecciona los elementos dentro del contenedor (article) donde buscar.
                // Buscamos en el título (h3), botones del acordeón y contenido dentro de los paneles.
                const elementsToSearch = container.querySelectorAll('h3, button.accordion, .panel p, .panel li, .panel div, .panel table'); // <-- SELECTOR AJUSTADO (añadido table)

                if (query === '') {
                     // Si el campo de búsqueda está vacío, muestra todo el contenedor y sus elementos
                     container.style.display = ''; // Muestra el artículo completo
                     elementsToSearch.forEach(el => el.style.display = ''); // Muestra todos los elementos dentro
                     // Opcional: Cierra todos los paneles del acordeón al vaciar la búsqueda
                     container.querySelectorAll('.panel').forEach(panel => {
                         panel.style.maxHeight = null;
                         panel.style.paddingTop = "0";
                         panel.style.paddingBottom = "0";
                         let accordionButton = panel.previousElementSibling;
                         if (accordionButton && accordionButton.classList.contains('accordion')) {
                             accordionButton.classList.remove('active');
                             accordionButton.setAttribute("aria-expanded", "false");
                         }
                     });
                     return; // Pasa al siguiente contenedor (artículo)
                }

                // Si hay texto en la búsqueda, itera sobre los elementos dentro del contenedor
                elementsToSearch.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    if (text.includes(query)) {
                        containerHasMatch = true; // Marca que se encontró una coincidencia en este artículo
                        element.style.display = ''; // Muestra el elemento que contiene la coincidencia

                        // Si la coincidencia está dentro de un panel, asegúrate de que el panel y su botón estén visibles y el panel abierto.
                        let parentPanel = element.closest('.panel');
                        if (parentPanel) {
                            parentPanel.style.display = ''; // Asegura que el panel es visible (aunque el max-height lo controla)
                            // Abre el panel ajustando su altura máxima
                            parentPanel.style.maxHeight = parentPanel.scrollHeight + "px"; // Abre el panel
                            parentPanel.style.paddingTop = "15px"; // Ajusta padding
                            parentPanel.style.paddingBottom = "15px"; // Ajusta padding

                            let accordionButton = parentPanel.previousElementSibling;
                            if (accordionButton && accordionButton.classList.contains('accordion')) {
                                 accordionButton.style.display = ''; // Asegura que el botón del acordeón es visible
                                 accordionButton.classList.add('active'); // Marca el botón como activo/abierto
                                 accordionButton.setAttribute("aria-expanded", "true");
                            }
                        } else {
                             // Si el elemento no está dentro de un panel (ej: h3 o botón del acordeón), solo asegúrate de que sea visible.
                             element.style.display = '';
                             // Si es un botón de acordeón que coincide, ábrelo.
                             if (element.classList.contains('accordion')) {
                                 let panel = element.nextElementSibling;
                                 if (panel) {
                                     panel.style.display = ''; // Asegura que el panel es visible
                                     panel.style.maxHeight = panel.scrollHeight + "px"; // Abre el panel
                                     panel.style.paddingTop = "15px"; // Ajusta padding
                                     panel.style.paddingBottom = "15px"; // Ajusta padding
                                     element.classList.add('active'); // Marca el botón como activo
                                     element.setAttribute("aria-expanded", "true");
                                 }
                             }
                        }

                    } else {
                        // Oculta los elementos que no contienen la coincidencia.
                        // Nota: Esto ocultará elementos *dentro* de paneles que sí contienen otras coincidencias.
                        // Si quieres que todo el contenido del panel se muestre si hay *alguna* coincidencia en él,
                        // necesitarías una lógica más compleja o un enfoque de resaltado en lugar de ocultar.
                        // Para este buscador simple, ocultamos elementos individuales que no coinciden.
                        element.style.display = 'none';
                    }
                });

                // Después de revisar todos los elementos dentro del artículo, decide si mostrar u ocultar el artículo completo
                if (query === '') {
                    // Si la consulta está vacía, ya manejamos mostrar todo al principio.
                } else {
                    if (containerHasMatch) {
                        container.style.display = ''; // Muestra el artículo si hubo coincidencia en alguno de sus elementos
                    } else {
                        container.style.display = 'none'; // Oculta el artículo si no hubo coincidencia en ninguno de sus elementos
                    }
                }
            });
        }

        // Añadir eventos para ejecutar la búsqueda
        searchInput.addEventListener('keyup', buscarTexto);

        // También ejecutar la búsqueda si el usuario pega texto o si el campo se limpia
         searchInput.addEventListener('input', () => {
             if (searchInput.value === '') {
                 buscarTexto(); // Muestra todo el contenido de nuevo si el campo se vacía
             }
         });
    } // Fin if(searchInput)

}); // Fin DOMContentLoaded


// === Función para la portada animada ===
// Esta función está fuera del DOMContentLoaded porque se llama directamente desde el HTML (onclick="entrarSitio()").
// Si prefieres llamarla de otra manera, podrías moverla dentro del DOMContentLoaded.
window.entrarSitio = function () {
    const portada = document.getElementById("portadaAnimada");
    if (portada) { // Verifica si el elemento existe
        portada.style.transition = "opacity 1s ease";
        portada.style.opacity = 0;
        setTimeout(() => {
            portada.style.display = "none";
            // Desplazar automáticamente a la subportada
            const subportada = document.getElementById("subportada");
            if (subportada) { // Verifica si el elemento existe
                subportada.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }, 1000); // Espera 1 segundo (la duración de la transición) antes de ocultar y desplazar
    }
};

// La línea 'item.style.backgroundColor = "#ffff99";' estaba suelta y ha sido eliminada.
