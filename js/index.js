const formulario = document.getElementById('formulario');
const tabla = document.getElementById('tabla');
const legajoInput = document.getElementById('legajo');
const nombreInput = document.getElementById('nombre');

let base = [
  { nombre: 'gonzalo', legajo: '12347' },
  { nombre: 'gonzalo', legajo: '12348' },
  { nombre: 'gonzalo', legajo: '12349' },
];

formulario.addEventListener('submit', guardar);

function Vendedor(legajo, nombre) {
  this.nombre = nombre;
  this.legajo = legajo;
}

function guardar(e) {
  e.preventDefault();
  const NuevoVendedor = new Vendedor(legajoInput.value, nombreInput.value);
  base.push(NuevoVendedor);
  const vendedor = modeloVendedor(NuevoVendedor);
  tabla.appendChild(vendedor);
  legajoInput.value = '';
  nombreInput.value = '';
}

function eliminar(e) {
  const newBase = base.filter((vendedor) => vendedor.legajo !== e.target.id);
  base = [...newBase];
  const tr = e.target.parentElement.parentElement;
  tabla.removeChild(tr);
}

function render() {
  const fragment = new DocumentFragment();

  base.forEach((vendedor) => {
    const tr = modeloVendedor(vendedor);
    fragment.appendChild(tr);
  });
  tabla.appendChild(fragment);
}

function modeloVendedor(vendedor) {
  const btnEliminar = document.createElement('button');
  const btnModificar = document.createElement('button');
  btnEliminar.textContent = 'x';
  btnModificar.textContent = 'modificar';
  btnEliminar.onclick = eliminar;
  btnModificar.onclick = modificar;
  const tdCod = document.createElement('td');
  const tdNom = document.createElement('td');
  const tdAcc = document.createElement('td');
  const tr = document.createElement('tr');
  btnEliminar.id = `${vendedor.legajo}`;
  btnModificar.id = `${vendedor.legajo}`;
  tr.id = `${vendedor.legajo}`;
  tdNom.textContent = vendedor.nombre;
  tdCod.textContent = vendedor.legajo;
  tdAcc.append(btnEliminar, btnModificar);
  tr.append(tdCod, tdNom, tdAcc);
  return tr;
}

function modificar(e) {
  const id = e.target.id;
  const vendedor = base.filter((vendedor) => vendedor.legajo === e.target.id);
}

render();
