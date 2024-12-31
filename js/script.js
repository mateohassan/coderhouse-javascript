let productos = [];
let productosFiltrado = [];

let filtros = {
    precioMin: 0,
    precioMax: Infinity,
    tipo: null,
    marca: null,
    nucleosMin: 0,
    nucleosMax: Infinity,
    memoriaMin: 0,
    memoriaMax: Infinity,
    ramMin: 0,
    ramMax: Infinity,
    almMin: 0,
    almMax: Infinity
};
const filtrosDefault = {
    precioMin: 0,
    precioMax: Infinity,
    tipo: null,
    marca: null,
    nucleosMin: 0,
    nucleosMax: Infinity,
    memoriaMin: 0,
    memoriaMax: Infinity,
    ramMin: 0,
    ramMax: Infinity,
    almMin: 0,
    almMax: Infinity
};


async function traerProductos() {
    try {
        const response = await fetch('js/data.json');
        const data = await response.json();
        productos = data;
    } catch (error) {
        console.error('Error en la carga de los productos');
    }
}

function renderizarProductos() {
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
            <img class="imagenProducto" src="img/${item.img}.png">
            <p class="nombreProducto">${item.nombre}</p>
            <p class="precioProducto">$${item.precio}</p>
            <button class="botonProducto" onclick="agregarCarrito('${item.nombre}', '${item.precio}', '${item.img}')">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto);
    });
}

function aplicarFiltro() {
    productosFiltrado = productos.filter(function(producto) {
        return (
            producto.precio >= filtros.precioMin &&
            producto.precio <= filtros.precioMax &&
            (filtros.tipo === null || producto.tipo === filtros.tipo) &&
            (filtros.marca === null || producto.marca === filtros.marca) &&
            producto.nucleos >= filtros.nucleosMin &&
            producto.nucleos <= filtros.nucleosMax &&
            producto.memoria >= filtros.memoriaMin &&
            producto.memoria <= filtros.memoriaMax &&
            producto.ram >= filtros.ramMin &&
            producto.ram <= filtros.ramMax &&
            producto.almacenamiento >= filtros.almMin &&
            producto.almacenamiento <= filtros.almMax
        );
    });
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productosFiltrado.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
            <img class="imagenProducto" src="img/${item.img}.png">
            <p class="nombreProducto">${item.nombre}</p>
            <p class="precioProducto">$${item.precio}</p>
            <button class="botonProducto" onclick="agregarCarrito('${item.nombre}', '${item.precio}', '${item.img}')">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto);
    });
}

function actualizarCarrito(){
    let carrito = document.getElementById('carrito');
    carrito.innerHTML = `
        <li id="carritoVacio">No hay productos en el carrito.</li>
        <div id="botonesCarrito" hidden>
            <button onclick="vaciarCarrito()">Vaciar carrito</button>
            <button class=botonComprar onclick="abrirCheckout()">Comprar</button>
        </div>
        `;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const contenido = JSON.parse(localStorage.getItem(key));
        let productoEnCarrito = document.createElement('div');
        productoEnCarrito.className = "containerCarrito";
        productoEnCarrito.innerHTML = `
            <img class="imagenProducto" src="img/${contenido.imagenLocal}.png">
            <p class="nombreProducto">${contenido.nombreLocal}</p>
            <p class="precioProducto">$${contenido.precioLocal}</p>
            <button class="botonProducto" onclick="quitarCarrito('${key}')">
            <i class="bi bi-trash"></i>
            </button>
        `;
        carrito.appendChild(productoEnCarrito);
    }

    let carritoVacio = document.getElementById('carritoVacio');
    let abrirCarrito = document.getElementById('abrirCarrito');
    let botonesCarrito = document.getElementById('botonesCarrito');
    if (localStorage.length > 0){
        carritoVacio.hidden = true;
        botonesCarrito.hidden = false;
        if (!abrirCarrito.classList.contains('dropdown-toggle')) {
            abrirCarrito.classList.add('dropdown-toggle');
        }
    } else {
        carritoVacio.hidden = false;
        botonesCarrito.hidden = true;
        if (abrirCarrito.classList.contains('dropdown-toggle')) {
            abrirCarrito.classList.remove('dropdown-toggle');
        }
    }
}

function sinFiltro() {
    Object.assign(filtros, filtrosDefault);
    traerProductos().then(()=>{
        renderizarProductos()
    });
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
        radio.checked = false;
    });
    const precios = document.querySelectorAll('input[type="number"]');
    precios.forEach(function(precio) {
        precio.value = '';
    });
}

function filtrarPrecio() {
    filtros.precioMax = parseInt(document.getElementById('max').value) || Infinity;
    filtros.precioMin = parseInt(document.getElementById('min').value) || 0;
    aplicarFiltro()
}

function filtrarTipo(elegido) {
    filtros.tipo = elegido || null;
    aplicarFiltro();
}

function filtrarMarca(elegido) {
    filtros.marca = elegido || null;
    aplicarFiltro();
}

function filtrarNucleos(minimo, maximo) {
    filtros.nucleosMax = maximo || Infinity;
    filtros.nucleosMin = minimo || 1;
    aplicarFiltro();
}

function filtrarMemoria(minimo, maximo) {
    filtros.memoriaMax = maximo || Infinity;
    filtros.memoriaMin = minimo || 1;
    aplicarFiltro();
}

function filtrarRam(minimo, maximo) {
    filtros.ramMax = maximo || Infinity;
    filtros.ramMin = minimo || 1;
    aplicarFiltro();
}

function filtrarAlm(minimo, maximo) {
    filtros.almMax = maximo || Infinity;
    filtros.almMin = minimo || 1;
    aplicarFiltro();
}

function agregarCarrito(nombre, precio, img) {
    const compra = {
        nombreLocal: nombre,
        precioLocal: precio,
        imagenLocal: img
    }
    let existe = false
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const contenido = JSON.parse(localStorage.getItem(key));
        if (compra.nombreLocal == contenido.nombreLocal) {
            existe = true
        }
    }
    if (existe == false) {
        let producto = "Producto " + (localStorage.length + 1)
        localStorage.setItem(producto, JSON.stringify(compra));
    }
    actualizarCarrito()
}

function calcularPrecio() {
    let precioEliminable = document.getElementById('precioEliminable');
    if (precioEliminable) {
        precioEliminable.remove();
    }
    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const contenido = JSON.parse(localStorage.getItem(key));
        const cantidad = parseInt(document.getElementById(key).value) || 1
        total += parseInt(contenido.precioLocal) * cantidad
    }
    let checkout = document.getElementById('checkout');
    const formularioCheckout = document.getElementById('formularioCheckout')
    let precioTotal = document.createElement('h2');
    precioTotal.innerHTML = 'Total: $' + (total);
    precioTotal.id = 'precioEliminable';
    checkout.insertBefore(precioTotal, formularioCheckout)
}

function llenarCheckout() {
    let eliminables = document.getElementsByClassName('eliminable');
    while(eliminables.length > 0) {
        eliminables[0].parentNode.removeChild(eliminables[0]);
    }
    if (localStorage.length = 0) {
        const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.hide();
        
    }
    let checkout = document.getElementById('checkout');
    const formularioCheckout = document.getElementById('formularioCheckout')
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const contenido = JSON.parse(localStorage.getItem(key));
        let productoEnCheckout = document.createElement('div');
        productoEnCheckout.className = 'row eliminable';
        productoEnCheckout.innerHTML = `
            <div class="col-2 d-flex justify-content-center">
                <img class="imagenProducto img-fluid" src="img/${contenido.imagenLocal}.png">
            </div> 
            <div class="col-4 d-flex justify-content-center">
                <p class="nombreProducto">${contenido.nombreLocal}</p>
            </div>      
            <div class="col-2 d-flex justify-content-center">
                <p class="precioProducto">$${contenido.precioLocal}</p>
            </div>      
            <div class="col-2 d-flex align-items-center">
                <input class="form-control cantidad" type="number" id="${key}" value=1 min=1 max=16>
            </div>
            <div class="col-2 d-flex justify-content-center">
                <button class="botonProducto" onclick="quitarCarrito('${key}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    checkout.insertBefore(productoEnCheckout, formularioCheckout)
    }
}

function quitarCarrito(key) {
    localStorage.removeItem(key)
    actualizarCarrito()
    llenarCheckout()
    calcularPrecio()
    if (localStorage.length === 0) {
        const cerrar = document.querySelector('.btn-close');
        cerrar.click()
    }
}

function vaciarCarrito() {
    localStorage.clear()
    const cerrar = document.getElementById('abrirCarrito');
    cerrar.click()
    actualizarCarrito()
}

function abrirCheckout() {
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.toggle();
    llenarCheckout()
}

function finalizarCompra() {
    const cerrar = document.querySelector('.btn-close');
    cerrar.click()
    const graciasModal = new bootstrap.Modal(document.getElementById('graciasModal'));
    graciasModal.toggle();
    vaciarCarrito()
}

document.getElementById('checkoutModal').addEventListener('shown.bs.modal', function() {
    calcularPrecio()
    const divCheckout = document.getElementById('checkout');
    if (divCheckout) {
        divCheckout.addEventListener('keydown', function(event) {
            if (event.target.classList.contains('cantidad')) {
                if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
                    event.preventDefault();
                }
            }
        });
    }
    const inputs = document.getElementsByClassName('form-control');
    for (let input of inputs) {
        input.addEventListener('change', function() {
            calcularPrecio();
        });
    }
})

document.getElementById('checkoutModal').addEventListener('hide.bs.modal', function() {
let precioEliminable = document.getElementById('precioEliminable');
    if (precioEliminable) {
        precioEliminable.remove();
    }
})

document.getElementById('quitarFiltro').addEventListener("click", function() {
    sinFiltro()
})
document.getElementById('filtrarPrecio').addEventListener("click", function() {
    filtrarPrecio()
})
document.getElementById('filtrarTipoProcesador').addEventListener("click", function() {
    filtrarTipo('procesador')
})
document.getElementById('filtrarTipoPlaca').addEventListener("click", function() {
    filtrarTipo('placavideo')
})
document.getElementById('filtrarTipoRam').addEventListener("click", function() {
    filtrarTipo('ram')
})
document.getElementById('filtrarTipoDisco').addEventListener("click", function() {
    filtrarTipo('disco')
})
document.getElementById('filtrarMarcaIntel').addEventListener("click", function() {
    filtrarMarca('intel');
});
document.getElementById('filtrarMarcaAMD').addEventListener("click", function() {
    filtrarMarca('amd');
});
document.getElementById('filtrarMarcaNvidia').addEventListener("click", function() {
    filtrarMarca('nvidia');
});
document.getElementById('filtrarMarcaKingston').addEventListener("click", function() {
    filtrarMarca('kingston');
});
document.getElementById('filtrarMarcaHiksemi').addEventListener("click", function() {
    filtrarMarca('hiksemi');
})
document.getElementById('filtrarNucleos6-').addEventListener("click", function() {
    filtrarNucleos(0, 6);
})
document.getElementById('filtrarNucleos616').addEventListener("click", function() {
    filtrarNucleos(6, 17);
});
document.getElementById('filtrarNucleos16+').addEventListener("click", function() {
    filtrarNucleos(17, 999);
});
document.getElementById('filtrarMemoria8-').addEventListener("click", function() {
    filtrarMemoria(0, 8);
});
document.getElementById('filtrarMemoria812').addEventListener("click", function() {
    filtrarMemoria(8, 12);
});
document.getElementById('filtrarMemoria12+').addEventListener("click", function() {
    filtrarMemoria(12, 999);
});
document.getElementById('filtrarRam8-').addEventListener("click", function() {
    filtrarRam(0, 8);
});
document.getElementById('filtrarRam816').addEventListener("click", function() {
    filtrarRam(8, 16);
});
document.getElementById('filtrarRam16+').addEventListener("click", function() {
    filtrarRam(16, 999);
});
document.getElementById('filtrarAlm25-').addEventListener("click", function() {
    filtrarAlm(0, 256);
});
document.getElementById('filtrarAlm2548').addEventListener("click", function() {
    filtrarAlm(256, 480);
});
document.getElementById('filtrarAlm48+').addEventListener("click", function() {
    filtrarAlm(480, 9999);
});

document.getElementById('botonComprar').addEventListener('click', function(event) {
    event.preventDefault()
    finalizarCompra()
})

sinFiltro()
actualizarCarrito()