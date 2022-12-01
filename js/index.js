const formulario = document.getElementById('formulario');
const formVentas = document.getElementById('formVentas');
const tabla = document.getElementById('tabla');
const tablaVentas = document.getElementById('tablaVentas');
const legajoInput = document.getElementById('legajo');
const nombreInput = document.getElementById('nombre');
const vendedorInput = document.getElementById('vendedor');
const productoInput = document.getElementById('producto');

let base = [
  { nombre: 'gonzalo', legajo: '12347' },
  { nombre: 'gonzalo', legajo: '12348' },
  { nombre: 'gonzalo', legajo: '12349' },
];
let ventas = [
  { producto: 'prueba1', vendedor: '12347' },
  { producto: 'prueba2', vendedor: '12348' },
  { producto: 'prueba3', vendedor: '12349' },
];

formulario.addEventListener('submit', guardar);
formVentas.addEventListener('submit', guardarVentas);

function Vendedor(legajo, nombre) {
  this.nombre = nombre;
  this.legajo = legajo;
}
function Ventas(vendedor, producto) {
  this.producto = producto;
  this.vendedor = vendedor;
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
function guardarVentas(e) {
  e.preventDefault();
  const nuevaVenta = new Ventas(vendedorInput.value, productoInput.value);
  ventas.push(nuevaVenta);
  const venta = modeloVentas(nuevaVenta);
  tablaVentas.appendChild(venta);
  vendedorInput.value = '';
  vendedorInput.value = '';
}

function eliminar(e) {
  const newBase = base.filter((vendedor) => vendedor.legajo !== e.target.id);
  base = [...newBase];
  const tr = e.target.parentElement.parentElement;
  tabla.removeChild(tr);
}
function eliminarVentas(e) {
  const newVentas = ventas.filter((vendedor) => vendedor.legajo !== e.target.id);
  ventas = [...newVentas];
  const tr = e.target.parentElement.parentElement;
  tablaVentas.removeChild(tr);
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
function modeloVentas(venta) {
  const btnEliminar = document.createElement('button');
  const btnModificar = document.createElement('button');
  btnEliminar.textContent = 'x';
  btnModificar.textContent = 'modificar';
  btnEliminar.onclick = eliminarVentas;
  btnModificar.onclick = modificar;
  const tdCod = document.createElement('td');
  const tdNom = document.createElement('td');
  const tdAcc = document.createElement('td');
  const tr = document.createElement('tr');
  btnEliminar.id = `${venta.vendedor}`;
  btnModificar.id = `${venta.vendedor}`;
  tr.id = `${venta.vendedor}`;
  tdNom.textContent = venta.producto;
  tdCod.textContent = venta.vendedor;
  tdAcc.append(btnEliminar, btnModificar);
  tr.append(tdCod, tdNom, tdAcc);
  return tr;
}

function modificar(e) {
  const id = e.target.id;
  const vendedor = base.filter((vendedor) => vendedor.legajo === e.target.id);
}

render();
