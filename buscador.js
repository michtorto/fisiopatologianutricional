// Arreglo de páginas
const paginas = [
  { titulo: "Inicio", url: "index.html", descripcion: "Página principal del sitio web." },
  { titulo: "Otros Temas", url: "otros.html", descripcion: "Sección de otros temas relacionados." },
  { titulo: "Sistema Excretor", url: "excretor.html", descripcion: "Información sobre el sistema excretor." },
  { titulo: "Sistema Endocrino", url: "endocrino.html", descripcion: "Información sobre el sistema endocrino." },
  { titulo: "Sistema Respiratorio", url: "respiratorio.html", descripcion: "Información sobre el sistema respiratorio." },
  { titulo: "Sistema Digestivo", url: "digestivo.html", descripcion: "Información sobre el sistema digestivo." },
  { titulo: "Sistema Cardiovascular", url: "cardiovascular.html", descripcion: "Información sobre el sistema cardiovascular." }
];

// Pega aquí tu arreglo de patologias (no lo repito aquí por espacio, pero usa el tuyo completo)
const patologias = [
  // ... tu arreglo de patologías ...
];

// Selección de elementos y evento
const input = document.getElementById('buscador');
const resultados = document.getElementById('resultados-busqueda');

input.addEventListener('input', function() {
  const texto = input.value.toLowerCase();
  resultados.innerHTML = '';

  if (texto.length > 1) {
    // Buscar en páginas
    const matchesPaginas = paginas.filter(pagina =>
      pagina.titulo.toLowerCase().includes(texto) ||
      pagina.descripcion.toLowerCase().includes(texto)
    );
    // Buscar en patologías
    const matchesPatologias = patologias.filter(patologia =>
      patologia.nombre.toLowerCase().includes(texto) ||
      patologia.descripcion.toLowerCase().includes(texto)
    );

    if (matchesPaginas.length > 0) {
      resultados.innerHTML += `<h3>Páginas:</h3>`;
      matchesPaginas.forEach(match => {
        resultados.innerHTML += `<div>
          <a href="${match.url}"><strong>${match.titulo}</strong></a><br>
          <span>${match.descripcion}</span>
        </div><hr>`;
      });
    }

    if (matchesPatologias.length > 0) {
      resultados.innerHTML += `<h3>Patologías:</h3>`;
      matchesPatologias.forEach(match => {
        resultados.innerHTML += `<div>
          <a href="${match.url}"><strong>${match.nombre}</strong></a><br>
          <span>${match.descripcion}</span>
        </div><hr>`;
      });
    }

    if (matchesPaginas.length === 0 && matchesPatologias.length === 0) {
      resultados.innerHTML = '<p>No se encontraron resultados.</p>';
    }
  }
});
