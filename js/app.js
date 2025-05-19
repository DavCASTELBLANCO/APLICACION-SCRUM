// app.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 Gestión Académica cargada');
  if (window.location.pathname.endsWith('cursos.html')) {
    mostrarCursos();
  }
});

const cursos = [
  { id: 1, nombre: 'Matemáticas I', horas: 4 },
  { id: 2, nombre: 'Programación Web', horas: 6 },
];

function mostrarCursos() {
  const contenedor = document.getElementById('lista-cursos');
  cursos.forEach(c => {
    const tarjeta = document.createElement('div');
    tarjeta.innerHTML = `
      <h3>${c.nombre}</h3>
      <p>Horas: ${c.horas}</p>
      <button onclick="inscribir(${c.id})">Inscribir</button>
    `;
    contenedor.appendChild(tarjeta);
  });
}

function inscribir(idCurso) {
  alert('Inscrito en el curso ' + idCurso);
}
