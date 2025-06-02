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
