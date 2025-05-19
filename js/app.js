// app.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 Gestión Académica cargada');

  // Inicializar calendario con Flatpickr
  if (document.getElementById('fecha')) {
    flatpickr('#fecha', {
      minDate: 'today',
      onChange: (_, dateStr) => {
        document.getElementById('calendario').textContent =
          `Has seleccionado: ${dateStr}`;
      }
    });
  }

  // Mostrar cursos si estamos en cursos.html
  if (window.location.pathname.endsWith('cursos.html')) {
    const filtro = document.getElementById('filtro-horas');
    filtro.addEventListener('input', () => mostrarCursos(+filtro.value));
    mostrarCursos(0);
  }
});

// Datos externos (reutilizables)
const cursos = [
  { id: 1, nombre: 'Matemáticas I', horas: 4, prereq: [] },
  { id: 2, nombre: 'Programación Web', horas: 6, prereq: [1] },
  { id: 3, nombre: 'Bases de Datos', horas: 5, prereq: [2] }
];

// Función para recorrer recursivamente prerrequisitos
const listarPrereqs = (id, seen = new Set()) => {
  if (seen.has(id)) return [];
  seen.add(id);
  const curso = cursos.find(c => c.id === id);
  if (!curso || curso.prereq.length === 0) return [];
  return curso.prereq
    .flatMap(pid => [pid, ...listarPrereqs(pid, seen)]);
};

// Mostrar y filtrar usando map, filter y reduce
function mostrarCursos(minHoras = 0) {
  const cont = document.getElementById('lista-cursos');
  cont.innerHTML = '';

  // filter
  const filtrados = cursos.filter(c => c.horas >= minHoras);

  // map + reduce para sumar horas
  const totalHoras = filtrados.reduce((sum, c) => sum + c.horas, 0);
  const resumen = document.createElement('p');
  resumen.textContent = `Total de horas: ${totalHoras}`;
  cont.appendChild(resumen);

  // map para renderizar
  filtrados.map(c => {
    const card = document.createElement('div');
    card.className = 'curso-card';
    const prereqs = listarPrereqs(c.id)
      .map(pid => cursos.find(x => x.id === pid).nombre)
      .join(', ');
    card.innerHTML = `
      <h3>${c.nombre}</h3>
      <p>Horas: ${c.horas}</p>
      ${prereqs ? `<p class="small">Prerrequisitos: ${prereqs}</p>` : ''}
      <button onclick="inscribir(${c.id})">Inscribir</button>
    `;
    cont.appendChild(card);
  });
}

// Función de inscripción
function inscribir(idCurso) {
  alert('Inscrito en el curso ' + idCurso);
}
