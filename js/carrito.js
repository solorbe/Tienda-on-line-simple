const totalconfirmarcompra = document.getElementById('totalconfirmarcompra');
totalconfirmarcompra.innerHTML = `
      <div class="d-flex gap-2">
        <button id="btn-eliminar-todo" class="btn swal2-confirm" disabled>Eliminar todo</button>
        <button id="btn-comprar" class="btn swal2-confirm" disabled>Comprar</button>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span class="fs-5 fw-bold">Total:</span>
        <span class="fs-5 fw-bold" id="carrito-total">$0</span>
      </div>
    `;

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function renderCarrito() {
    const contenedor = document.getElementById('carrito-container');
    const totalEl = document.getElementById('carrito-total');
    const btnComprar = document.getElementById('btn-comprar');
    const btnEliminar = document.getElementById('btn-eliminar-todo');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-center mt-4">El carrito está vacío.</p>';
        totalEl.textContent = '$0';
        btnComprar.disabled = true;
        btnEliminar.disabled = true;
        return;
    }

    contenedor.innerHTML = carrito.map(item => `
        <div class="d-flex align-items-center justify-content-between border-bottom py-3 gap-3">
            <img src="${item.imagen}" style="width:70px; height:70px; object-fit:cover; border-radius:8px;" alt="${item.descripcion}">
            <span class="flex-grow-1">${item.descripcion}
                <br><small class="text-muted">Talle: ${item.talle}</small>
            </span>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary" data-id="${item.id_producto}" data-talle="${item.talle}" data-accion="restar">−</button>
                <span class="text-muted">x${item.cantidad}</span>
                <button class="btn btn-sm btn-outline-secondary" data-id="${item.id_producto}" data-talle="${item.talle}" data-accion="sumar">+</button>
             </div>
            <span class="fw-semibold">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
            <button class="btn btn-sm btn-outline-danger" data-id="${item.id_producto}" data-talle="${item.talle}"data-accion="eliminar">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `).join('');

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalEl.textContent = `$${total.toLocaleString('es-AR')}`;
    btnComprar.disabled = carrito.length === 0;
    btnEliminar.disabled = carrito.length === 0;
}

// eliminar, agregar y restar productos del carrito
document.getElementById('carrito-container').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const talle = btn.dataset.talle;  
    const accion = btn.dataset.accion;

    if (accion === 'eliminar') {
        const producto = carrito.find(item => item.id_producto === id && item.talle === talle);
        Swal.fire({
            title: "¿Está seguro de eliminar el producto?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Sí",
            denyButtonText: "No"
            })
            .then((result) => {
            if (result.isConfirmed) {
                Swal.fire(`${producto.descripcion} eliminado del carrito`, "", "success");
                carrito = carrito.filter(item => item.id_producto !== id || item.talle !== talle);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderCarrito();
                } else if (result.isDenied) {
                Swal.fire(`${producto.descripcion} NO ha sido eliminado del carrito`, "", "info");
                }
            });
    } else if (accion === 'sumar') {
        carrito.find(item => item.id_producto === id && item.talle === talle).cantidad++;
    } else if (accion === 'restar') {
        const item = carrito.find(item => item.id_producto === id && item.talle === talle);
        if (item.cantidad > 1) {
            item.cantidad--;
        } else {
            carrito = carrito.filter(item => item.id_producto !== id || item.talle !== talle); // elimina si llega a 0
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
});

renderCarrito();



// Botón Comprar
document.getElementById('btn-comprar').addEventListener('click', () => {
    if (carrito.length === 0) return;
    Swal.fire({
        title: 'Compra realizada con éxito',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderCarrito();
    });
});

// Botón Eliminar todo
document.getElementById('btn-eliminar-todo').addEventListener('click', () => {
    if (carrito.length === 0) return;
    Swal.fire({
        title: '¿Estás seguro de eliminar todos los productos?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCarrito();
        }
    });
});