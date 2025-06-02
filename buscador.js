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
