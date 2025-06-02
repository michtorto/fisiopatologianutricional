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

// ... (deja tu arreglo de patologias igual que en tu código original)

const patologias = [/* ... aquí va tu arreglo de patologías ... */];

// Solo una vez obtenemos los elementos del DOM
const input = document.getElementById('buscador');
const resultados = document.getElementById('resultados-busqueda');

// Un solo event listener para ambas búsquedas
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
