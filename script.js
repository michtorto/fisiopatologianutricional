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
const paginas = [
  {
    titulo: "Inicio",
    url: "index.html",
    descripcion: "Página principal del sitio web."
  },
  {
    titulo: "Otros Temas",
    url: "otros.html",
    descripcion: "Sección de otros temas relacionados."
  },
  {
    titulo: "Sistema Excretor",
    url: "excretor.html",
    descripcion: "Información sobre el sistema excretor."
  },
  {
    titulo: "Sistema Endocrino",
    url: "endocrino.html",
    descripcion: "Información sobre el sistema endocrino."
  },
  {
    titulo: "Sistema Respiratorio",
    url: "respiratorio.html",
    descripcion: "Información sobre el sistema respiratorio."
  },
  {
    titulo: "Sistema Digestivo",
    url: "digestivo.html",
    descripcion: "Información sobre el sistema digestivo."
  },
  {
    titulo: "Sistema Cardiovascular",
    url: "cardiovascular.html",
    descripcion: "Información sobre el sistema cardiovascular."
  }
  // Puedes agregar más páginas aquí si las creas después
];

const input = document.getElementById('buscador');
const resultados = document.getElementById('resultados-busqueda');

input.addEventListener('input', function() {
  const texto = input.value.toLowerCase();
  resultados.innerHTML = '';
  if (texto.length > 1) {
    const matches = paginas.filter(pagina =>
      pagina.titulo.toLowerCase().includes(texto) ||
      pagina.descripcion.toLowerCase().includes(texto)
    );
    if (matches.length > 0) {
      matches.forEach(match => {
        resultados.innerHTML += `<div>
          <a href="${match.url}"><strong>${match.titulo}</strong></a><br>
          <span>${match.descripcion}</span>
        </div><hr>`;
      });
    } else {
      resultados.innerHTML = '<p>No se encontraron resultados.</p>';
    }
  }
});
const patologias = [
  // Sistema Digestivo
  { 
    nombre: "Gastritis", 
    url: "digestivo.html#digestivo", 
    descripcion: "Inflamación de la mucosa gástrica que puede causar dolor, náuseas y molestias digestivas." 
  },
  { 
    nombre: "Enfermedad por Reflujo Gastroesofágico (ERGE)", 
    url: "digestivo.html#digestivo", 
    descripcion: "Condición en la que el ácido del estómago regresa al esófago causando ardor y molestias." 
  },
  { 
    nombre: "Úlcera Péptica", 
    url: "digestivo.html#digestivo", 
    descripcion: "Lesión en la mucosa del estómago o duodeno por efecto del ácido gástrico." 
  },
  { 
    nombre: "Enfermedad Inflamatoria Intestinal (EII)", 
    url: "digestivo.html#digestivo", 
    descripcion: "Grupo de trastornos inflamatorios crónicos del tracto digestivo, como Crohn y colitis ulcerosa." 
  },
  { 
    nombre: "Síndrome de Intestino Irritable (SII)", 
    url: "digestivo.html#digestivo", 
    descripcion: "Trastorno funcional del intestino caracterizado por dolor abdominal y cambios en el ritmo intestinal." 
  },
  { 
    nombre: "Diverticulosis y Diverticulitis", 
    url: "digestivo.html#digestivo", 
    descripcion: "Formación de pequeñas bolsas en el colon que pueden inflamarse o infectarse." 
  },
  { 
    nombre: "Colecistitis y Colelitiasis", 
    url: "digestivo.html#digestivo", 
    descripcion: "Inflamación de la vesícula biliar y presencia de cálculos biliares." 
  },
  { 
    nombre: "Pancreatitis", 
    url: "digestivo.html#digestivo", 
    descripcion: "Inflamación del páncreas que puede ser aguda o crónica." 
  },
  { 
    nombre: "Hepatitis", 
    url: "digestivo.html#digestivo", 
    descripcion: "Inflamación del hígado por diversas causas, incluyendo infecciones virales." 
  },
  { 
    nombre: "Cirrosis Hepática", 
    url: "digestivo.html#digestivo", 
    descripcion: "Daño crónico e irreversible del hígado que afecta su función." 
  },
  { 
    nombre: "Malabsorción", 
    url: "digestivo.html#digestivo", 
    descripcion: "Dificultad para absorber nutrientes en el intestino." 
  },
  { 
    nombre: "Estreñimiento", 
    url: "digestivo.html#digestivo", 
    descripcion: "Evacuación infrecuente o dificultosa de las heces." 
  },
  { 
    nombre: "Diarrea", 
    url: "digestivo.html#digestivo", 
    descripcion: "Evacuación frecuente de heces líquidas." 
  },
  { 
    nombre: "Enfermedad Celíaca", 
    url: "digestivo.html#digestivo", 
    descripcion: "Intolerancia al gluten que produce daño en el intestino delgado." 
  },
  { 
    nombre: "Intolerancia a la Lactosa", 
    url: "digestivo.html#digestivo", 
    descripcion: "Incapacidad de digerir lactosa por deficiencia de lactasa." 
  },

  // Sistema Cardiovascular
  { 
    nombre: "Hipertensión Arterial", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Elevación crónica de la presión arterial que incrementa el riesgo cardiovascular." 
  },
  { 
    nombre: "Cardiopatía Isquémica", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Reducción del flujo sanguíneo al corazón, causa principal de infarto." 
  },
  { 
    nombre: "Insuficiencia Cardíaca", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "El corazón no puede bombear sangre adecuadamente al resto del cuerpo." 
  },
  { 
    nombre: "Arritmias Cardíacas", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Alteraciones en el ritmo cardíaco que pueden afectar su función." 
  },
  { 
    nombre: "Valvulopatías", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Enfermedades de las válvulas cardíacas que afectan el flujo sanguíneo." 
  },
  { 
    nombre: "Enfermedad Arterial Periférica", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Obstrucción de las arterias de las extremidades, normalmente por aterosclerosis." 
  },
  { 
    nombre: "Accidente Cerebrovascular (ACV)", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Interrupción del flujo sanguíneo cerebral que provoca daño neurológico." 
  },
  { 
    nombre: "Dislipidemias", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Alteraciones en los niveles de lípidos en sangre, como colesterol y triglicéridos." 
  },
  { 
    nombre: "Aterosclerosis", 
    url: "cardiovascular.html#cardiovascular", 
    descripcion: "Acumulación de placas de grasa en las arterias que dificulta el flujo sanguíneo." 
  },

  // Sistema Respiratorio
  { 
    nombre: "Asma", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Enfermedad inflamatoria crónica de las vías respiratorias con episodios de dificultad respiratoria." 
  },
  { 
    nombre: "EPOC", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Enfermedad pulmonar obstructiva crónica, limita el flujo de aire y dificulta la respiración." 
  },
  { 
    nombre: "Neumonía", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Infección aguda de los pulmones que causa fiebre, tos y dificultad respiratoria." 
  },
  { 
    nombre: "Bronquitis", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Inflamación de los bronquios, vías respiratorias inferiores." 
  },
  { 
    nombre: "Fibrosis Quística", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Enfermedad genética que produce moco espeso y afecta varios órganos, principalmente pulmones." 
  },
  { 
    nombre: "Apnea del Sueño", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Interrupciones breves en la respiración durante el sueño." 
  },
  { 
    nombre: "Tuberculosis Pulmonar", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Infección bacteriana crónica que afecta principalmente a los pulmones." 
  },
  { 
    nombre: "Cáncer de Pulmón", 
    url: "respiratorio.html#respiratorio", 
    descripcion: "Tumor maligno que se origina en los tejidos del pulmón." 
  },

  // Sistema Endocrino
  { 
    nombre: "Diabetes Mellitus Tipo 1", 
    url: "endocrino.html#endocrino", 
    descripcion: "Trastorno autoinmune donde el páncreas no produce insulina." 
  },
  { 
    nombre: "Diabetes Mellitus Tipo 2", 
    url: "endocrino.html#endocrino", 
    descripcion: "Resistencia a la insulina y producción insuficiente, asociado a obesidad." 
  },
  { 
    nombre: "Hipotiroidismo", 
    url: "endocrino.html#endocrino", 
    descripcion: "Disminución de la función tiroidea que causa metabolismo lento." 
  },
  { 
    nombre: "Hipertiroidismo", 
    url: "endocrino.html#endocrino", 
    descripcion: "Exceso de hormonas tiroideas que acelera el metabolismo." 
  },
  { 
    nombre: "Síndrome de Cushing", 
    url: "endocrino.html#endocrino", 
    descripcion: "Exceso de cortisol que provoca obesidad, hipertensión y debilidad muscular." 
  },
  { 
    nombre: "Enfermedad de Addison", 
    url: "endocrino.html#endocrino", 
    descripcion: "Deficiencia de hormonas suprarrenales que causa fatiga y debilidad." 
  },
  { 
    nombre: "Acromegalia", 
    url: "endocrino.html#endocrino", 
    descripcion: "Crecimiento excesivo de tejidos por exceso de hormona del crecimiento." 
  },
  { 
    nombre: "Enanismo Pituitario", 
    url: "endocrino.html#endocrino", 
    descripcion: "Baja estatura por déficit de hormona del crecimiento." 
  },
  { 
    nombre: "Osteoporosis", 
    url: "endocrino.html#endocrino", 
    descripcion: "Pérdida de masa ósea que aumenta el riesgo de fracturas." 
  },
  { 
    nombre: "Síndrome de Ovario Poliquístico (SOP)", 
    url: "endocrino.html#endocrino", 
    descripcion: "Trastorno hormonal que afecta la ovulación y causa quistes ováricos." 
  },
  { 
    nombre: "Trastornos de la Glándula Suprarrenal", 
    url: "endocrino.html#endocrino", 
    descripcion: "Alteraciones en la producción de hormonas suprarrenales." 
  },

  // Sistema Excretor
  { 
    nombre: "Enfermedad Renal Crónica (ERC)", 
    url: "excretor.html#excretor", 
    descripcion: "Pérdida progresiva de la función renal." 
  },
  { 
    nombre: "Insuficiencia Renal Aguda (IRA)", 
    url: "excretor.html#excretor", 
    descripcion: "Disminución rápida de la función de los riñones." 
  },
  { 
    nombre: "Infecciones del Tracto Urinario (ITU)", 
    url: "excretor.html#excretor", 
    descripcion: "Infecciones que afectan el sistema urinario." 
  },
  { 
    nombre: "Litiasis Renal (Cálculos Renales)", 
    url: "excretor.html#excretor", 
    descripcion: "Formación de piedras en los riñones que pueden causar dolor intenso." 
  },
  { 
    nombre: "Glomerulonefritis", 
    url: "excretor.html#excretor", 
    descripcion: "Inflamación de los glomérulos renales que puede llevar a insuficiencia renal." 
  },
  { 
    nombre: "Síndrome Nefrótico", 
    url: "excretor.html#excretor", 
    descripcion: "Pérdida excesiva de proteínas por la orina, causando hinchazón." 
  },
  { 
    nombre: "Hiperuricemia y Gota", 
    url: "excretor.html#excretor", 
    descripcion: "Elevación del ácido úrico en sangre que puede causar dolor articular." 
  },

  // Otros Temas
  { 
    nombre: "Obesidad", 
    url: "otros.html#otros", 
    descripcion: "Exceso de grasa corporal que incrementa el riesgo de enfermedades crónicas." 
  },
  { 
    nombre: "Desnutrición", 
    url: "otros.html#otros", 
    descripcion: "Deficiencia de nutrientes esenciales para el organismo." 
  },
  { 
    nombre: "Anorexia Nerviosa", 
    url: "otros.html#otros", 
    descripcion: "Trastorno alimentario caracterizado por restricción extrema de la ingesta." 
  },
  { 
    nombre: "Bulimia Nerviosa", 
    url: "otros.html#otros", 
    descripcion: "Trastorno alimentario con episodios de ingesta excesiva y purgas." 
  },
  { 
    nombre: "Trastorno por Atracón", 
    url: "otros.html#otros", 
    descripcion: "Episodios recurrentes de ingesta excesiva de alimentos sin purgas." 
  },
  { 
    nombre: "Síndrome Metabólico", 
    url: "otros.html#otros", 
    descripcion: "Conjunto de factores de riesgo que predisponen a enfermedades cardiovasculares y diabetes." 
  },
  { 
    nombre: "Anemias Nutricionales", 
    url: "otros.html#otros", 
    descripcion: "Disminución de glóbulos rojos por deficiencia de nutrientes." 
  },
  { 
    nombre: "Deficiencias de Vitaminas y Minerales", 
    url: "otros.html#otros", 
    descripcion: "Falta de micronutrientes esenciales para la salud." 
  },
  { 
    nombre: "Interacciones Fármaco-Nutriente", 
    url: "otros.html#otros", 
    descripcion: "Efectos que tienen los medicamentos y nutrientes entre sí en el organismo." 
  },
  { 
    nombre: "Nutrición en el Paciente Crítico", 
    url: "otros.html#otros", 
    descripcion: "Manejo nutricional en pacientes graves o en cuidados intensivos." 
  },
  { 
    nombre: "Nutrición Enteral y Parenteral", 
    url: "otros.html#otros", 
    descripcion: "Métodos de alimentación artificial para pacientes que no pueden comer por vía oral." 
  },
  { 
    nombre: "Microbiota Intestinal y Salud", 
    url: "otros.html#otros", 
    descripcion: "El papel de los microorganismos intestinales en la salud humana." 
  }
];

const input = document.getElementById('buscador');
const resultados = document.getElementById('resultados-busqueda');

input.addEventListener('input', function() {
  const texto = input.value.toLowerCase();
  resultados.innerHTML = '';
  if (texto.length > 1) {
    const matches = patologias.filter(patologia =>
      patologia.nombre.toLowerCase().includes(texto)
    );
    if (matches.length > 0) {
      matches.forEach(match => {
        resultados.innerHTML += `<div>
          <a href="${match.url}"><strong>${match.nombre}</strong></a><br>
          <span style="font-size:0.95em;color:#666">${match.descripcion}</span>
        </div><hr>`;
      });
    } else {
      resultados.innerHTML = '<p>No se encontraron resultados.</p>';
    }
  }
});
