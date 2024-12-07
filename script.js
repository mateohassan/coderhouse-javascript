let productos = [];
let productosFiltrado = [];

class Producto {
    constructor(nombre, precio, tipo, marca, nucleos, memoria, ram, almacenamiento, img) {
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.marca = marca;
        this.nucleos = nucleos;
        this.memoria = memoria;
        this.ram = ram;
        this.almacenamiento = almacenamiento;
        this.img = img;
    }
}

const i3 = new Producto ("Intel Core i3-12100", 130000, "procesador", "intel", 4, null, null, null, "i3");
const ry5 = new Producto ("Ryzen 5 8600g", 280000, "procesador", "amd", 6, null, null, null, "ry5");
const ry9 = new Producto ("Ryzen 9 5900xt", 650000, "procesador", "amd", 16, null, null, null, "ry9");
const i9 = new Producto ("Intel Core i9-14900K", 860000, "procesador", "intel", 24, null, null, null, "i9");
const gtx16 = new Producto ("GeForce GTX 1650", 220000, "placavideo", "nvidia", null, 4, null, null, "gtx16");
const rx57 = new Producto ("Radeon RX 5700 XT", 560000, "placavideo", "amd", null, 8, null, null, "rx57");
const rtx30 = new Producto ("GeForce RTX 3060", 800000, "placavideo", "nvidia", null, 12, null, null, "rtx30");
const rx79 = new Producto ("Radeon RX 7900 XTX", 1850000, "placavideo", "amd", null, 24, null, null, "rx79");
const ram4 = new Producto ("RAM Hiksemi 4gb", 14000, "ram", "hiksemi", null, null, 4, null, "ram4");
const ram8 = new Producto ("RAM Kingston Fury 8gb", 29000, "ram", "kingston", null, null, 8, null, "ram8");
const ram16 = new Producto ("RAM Hiksemi Akira 16gb", 56000, "ram", "hiksemi", null, null, 16, null, "ram16");
const ram32 = new Producto ("RAM Kingston Fury 32gb", 93000, "ram", "kingston", null, null, 32, null, "ram32");
const hs128 = new Producto ("SSD Hiksemi Wave 128gb", 18000, "disco", "hiksemi", null, null, null, 128, "hs128");
const hs256 = new Producto ("SSD Hiksemi Wave 256gb", 32000, "disco", "hiksemi", null, null, null, 256, "hs256");
const ks480 = new Producto ("SSD Kingston 480gb", 48000, "disco", "kingston", null, null, null, 480, "ks480");
const ks960 = new Producto ("SSD Kingston 960gb", 80000, "disco", "kingston", null, null, null, 960, "ks960");

function sinFiltro(){
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.splice(0, productos.length)
    productos.push(i3, ry5, ry9, i9, gtx16, rx57, rtx30, rx79, ram4, ram8, ram16, ram32, hs128, hs256, ks480, ks960);
    productos.forEach(function(item) {
    let nuevoProducto = document.createElement('div');
    nuevoProducto.className = "containerProducto";
    nuevoProducto.innerHTML = `
            <img class="imagenProducto" src="img/${item.img}.png">
            <p class="nombreProducto">${item.nombre}</p>
            <p class="precioProducto">$${item.precio}</p>
            <button class="botonProducto" onclick=comprar('${item.nombre}', '${item.precio}', '${item.img}')>Comprar</button>
    `;
    catalogo.appendChild(nuevoProducto)
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

sinFiltro();

function filtrarPrecio() {
    const maximo = parseInt(document.getElementById('max').value);
    const minimo = parseInt(document.getElementById('min').value);
    productosFiltrado = productos.filter(function(producto){
        return producto.precio > minimo && producto.precio < maximo;
    })
    productos = productosFiltrado
    console.log(productos)
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
                <img class="imagenProducto" src="img/${item.img}.png">
                <p class="nombreProducto">${item.nombre}</p>
                <p class="precioProducto">$${item.precio}</p>
                <button class="botonProducto" onclick=comprar('${item.nombre}', '${item.precio}', '${item.img}')>Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto)
    })
}

function filtrarTipo(elegido) {
    productosFiltrado = productos.filter(function(producto){
        return producto.tipo == elegido;
    })
    productos = productosFiltrado
    console.log(productos)
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
                <img class="imagenProducto" src="img/${item.img}.png">
                <p class="nombreProducto">${item.nombre}</p>
                <p class="precioProducto">$${item.precio}</p>
                <button class="botonProducto">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto)
    })
}

function filtrarMarca(elegido) {
    productosFiltrado = productos.filter(function(producto){
        return producto.marca == elegido;
    })
    productos = productosFiltrado
    console.log(productos)
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
                <img class="imagenProducto" src="img/${item.img}.png">
                <p class="nombreProducto">${item.nombre}</p>
                <p class="precioProducto">$${item.precio}</p>
                <button class="botonProducto">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto)
    })
}

function filtrarNucleos(minimo, maximo) {
    productosFiltrado = productos.filter(function(producto){
        return producto.nucleos > minimo && producto.nucleos < maximo;
    })
    productos = productosFiltrado
    console.log(productos)
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
                <img class="imagenProducto" src="img/${item.img}.png">
                <p class="nombreProducto">${item.nombre}</p>
                <p class="precioProducto">$${item.precio}</p>
                <button class="botonProducto">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto)
    })
}

function filtrarMemoria(minimo, maximo) {
    productosFiltrado = productos.filter(function(producto){
        return producto.memoria > minimo && producto.memoria < maximo;
    })
    productos = productosFiltrado
    console.log(productos)
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
                <img class="imagenProducto" src="img/${item.img}.png">
                <p class="nombreProducto">${item.nombre}</p>
                <p class="precioProducto">$${item.precio}</p>
                <button class="botonProducto">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto)
    })
}

function filtrarRam(minimo, maximo) {
    productosFiltrado = productos.filter(function(producto){
        return producto.ram > minimo && producto.ram < maximo;
    })
    productos = productosFiltrado
    console.log(productos)
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
                <img class="imagenProducto" src="img/${item.img}.png">
                <p class="nombreProducto">${item.nombre}</p>
                <p class="precioProducto">$${item.precio}</p>
                <button class="botonProducto">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto)
    })
}

function filtrarAlm(minimo, maximo) {
    productosFiltrado = productos.filter(function(producto){
        return producto.almacenamiento > minimo && producto.almacenamiento < maximo;
    })
    productos = productosFiltrado
    console.log(productos)
    let catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productos.forEach(function(item) {
        let nuevoProducto = document.createElement('div');
        nuevoProducto.className = "containerProducto";
        nuevoProducto.innerHTML = `
                <img class="imagenProducto" src="img/${item.img}.png">
                <p class="nombreProducto">${item.nombre}</p>
                <p class="precioProducto">$${item.precio}</p>
                <button class="botonProducto">Comprar</button>
        `;
        catalogo.appendChild(nuevoProducto)
    })
}

function comprar(nombre, precio, img) {
    const compra = {
        nombreLocal: nombre,
        precioLocal: precio,
        imagenLocal: img
    }
    localStorage.setItem('compra', JSON.stringify(compra));
}