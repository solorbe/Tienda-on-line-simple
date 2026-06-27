const filtroTalles = document.getElementById('filtro-talles');
const cardListado = document.getElementById('card-container');
let talleActivo = 'Todos';

const talles = ["Todos", "XS", "S", "M", "L", "XL"];
filtroTalles.innerHTML = `<p class="mb-1">Filtro por talle:</p>` +
    talles.map(talle => `
        <button class="btn btn-outline-dark talle-btn ${talle === 'Todos' ? 'active' : ''}" data-talle="${talle}">${talle}</button>
    `).join('');

filtroTalles.addEventListener('click', (e) => {
    const btn = e.target.closest('.talle-btn');
    if (!btn) return;

    // Mover la clase active al botón clickeado
    document.querySelectorAll('.talle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filtrar y re-renderizar
    talleActivo = btn.dataset.talle;

    const filtrados = talleActivo === 'Todos'
        ? arrayAllJeans
        : arrayAllJeans.filter(jean => jean.talles?.includes(talleActivo));

    jeansRender(filtrados);
});
    
let arrayAllJeans = [];

async function listaProductos() {
    try {
        const res = await fetch('/productos.json');
        const data = await res.json();
        arrayAllJeans = data;
        console.log(arrayAllJeans);
        jeansRender(arrayAllJeans);
    } catch (error) {
        console.error("Ups, Algo salio mal...", error);
    } 
}

listaProductos();

function jeansRender(jeans) {
    cardListado.innerHTML = jeans.map(jean => `
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <img src="${jean.imagen}" class="card-img-top" alt="${jean.descripcion}"/>
                    <hr>
                    <h5 class="card-title">${jean.descripcion}</h5>
                    <p class="card-text">$${jean.precio.toLocaleString('es-AR')}</p>
                    <p class="card-text">Talles: ${jean.talles?.join(' - ') ?? 'No especificado'}</p>
                    <div class="mt-auto">
                        <button class="btn btn-secondary" data-id="${jean.id_producto}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>        
        `).join('');
}

cardListado.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]'); // busca el botón más cercano con el atributo data-id
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const producto = arrayAllJeans.find(j => j.id_producto === id);
    agregarAlCarrito(producto);
});

async function agregarAlCarrito(producto) {
    let talleSeleccionado;
    if (!producto.talles) {
        // No tiene talles
        talleSeleccionado = 'No especificado';
        } else if (producto.talles.length === 0) {
        // Tiene talles pero está vacío: sin stock
        Swal.fire({
            title: 'Sin stock disponible',
            text: 'Este producto no tiene talles disponibles.',
            icon: 'warning'
        });
        return;
    } else {
        // Tiene talles
        const { value } = await Swal.fire({
            title: 'Seleccioná un talle',
            input: 'radio',
            inputOptions: Object.fromEntries(producto.talles.map(t => [t, t])),
            inputValidator: (value) => {
                if (!value) return 'Debes seleccionar un talle';
            },
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Agregar'
        });
        if (!value) return;
        talleSeleccionado = value;
    }


    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; //carga el carrito guardado o crea uno nuevo si no existe

    const existe = carrito.find(item => item.id_producto === producto.id_producto && item.talle === talleSeleccionado);
    if (existe) {
        existe.cantidad++;
    } else {
        const { talles: _, ...productoSinTalles } = producto;
        carrito.push({ ...productoSinTalles, cantidad: 1, talle: talleSeleccionado });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
        title: `${producto.descripcion} Talle ${talleSeleccionado}`,
        text:  `agregado con éxito al carrito`,
        icon: 'success',
        showConfirmButton: true
    });
}

