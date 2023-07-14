//Prueba Live Server
console.log("JS Proyecto Final - Guiñazu Santiago")

//E-commerce: Botingold - Compra y venta de Botines

//Usuarios
let usuarios = [
    { usuario: "santigui2003", id: 100, nombre: "Santiago", apellido: "Guiñazu", foto: "usuario1.png"},
    { usuario: "gustagui2003", id: 101, nombre: "Gustavo", apellido: "Guiñazu", foto: "usuario2.png"},
    { usuario: "pauligui2003", id: 102, nombre: "Paula", apellido: "Guiñazu", foto: "usuario3.png"},
]

//Ingreso Usuario
let botonLogin = document.getElementById("botonLogin")
botonLogin.addEventListener("click", mostrarBienvenida)

function mostrarBienvenida() {
    let textLogin = document.getElementById("textLogin")
    let usuarioIngresado = document.getElementById("usuarioIngresado")
    let usuario = usuarios.find((u) => u.usuario === textLogin.value)
    
    if (usuario) {
        usuarioIngresado.innerHTML = `
            <h4>Bienvenido: ${usuario.nombre}  ${usuario.apellido}</h4>
            <img src="./multimedia/${usuario.foto}">
            `
        usuarioIngresado.classList.remove("oculto")
    } else {
        usuarioIngresado.innerHTML = `
            <h4>Bienvenido usuario nuevo: ${textLogin.value}</h4>
            `
        usuarioIngresado.classList.remove("oculto")
    }
}


//Productos
let productos = [
    { id: 1, nombre: "predator", marca: "adidas", color: "blanco", tapones: "bajos", stock: 4, precio: 15000, rutaImagen: "botin1.png" },
    { id: 2, nombre: "copa", marca: "adidas", color: "negro", tapones: "intermedios", stock: 1, precio: 26000, rutaImagen: "botin2.png" },
    { id: 3, nombre: "mercurial", marca: "nike", color: "negro", tapones: "bajos", stock: 7, precio: 22000, rutaImagen: "botin3.png" },
    { id: 4, nombre: "vapor", marca: "nike", color: "blanco", tapones: "intermedios", stock: 5, precio: 8000, rutaImagen: "botin4.png" },
    { id: 5, nombre: "tiempo", marca: "nike", color: "blanco", tapones: "bajos", stock: 1, precio: 8000, rutaImagen: "botin5.png" },
    { id: 6, nombre: "x", marca: "adidas", color: "negro", tapones: "altos", stock: 8, precio: 7500, rutaImagen: "botin6.png" },
    { id: 7, nombre: "copa pro", marca: "adidas", color: "blanco", tapones: "bajos", stock: 4, precio: 3500, rutaImagen: "botin7.png" },
    { id: 8, nombre: "phantom", marca: "nike", color: "negro", tapones: "altos", stock: 5, precio: 20000, rutaImagen: "botin8.png" },
    { id: 9, nombre: "pro copa", marca: "adidas", color: "blanco", tapones: "intermedios", stock: 9, precio: 17000, rutaImagen: "botin9.png" },
    { id: 10, nombre: "superfly", marca: "nike", color: "negro", tapones: "altos", stock: 2, precio: 9600, rutaImagen: "botin10.png" },
    { id: 11, nombre: "speedflow", marca: "adidas", color: "blanco", tapones: "intermedios", stock: 10, precio: 17600, rutaImagen: "botin11.png" },
    { id: 12, nombre: "phantom", marca: "nike", color: "negro", tapones: "altos", stock: 3, precio: 12300, rutaImagen: "botin12.png" },
    { id: 13, nombre: "superfly", marca: "nike", color: "blanco", tapones: "bajos", stock: 5, precio: 29000, rutaImagen: "botin13.png" },
    { id: 14, nombre: "ghosted", marca: "adidas", color: "blanco", tapones: "altos", stock: 2, precio: 35000, rutaImagen: "botin14.png" },
    { id: 15, nombre: "mercurial", marca: "nike", color: "negro", tapones: "intermedios", stock: 15, precio: 17000, rutaImagen: "botin15.png" },
    { id: 16, nombre: "vapor", marca: "nike", color: "negro", tapones: "bajos", stock: 7, precio: 15200, rutaImagen: "botin16.png" },
]


let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let contenedor = document.getElementById("productos")

crearTarjetas(productos, contenedor)
renderizarCarrito(carrito)

//Marcas
let marca = []
for (let producto of productos) {
    if (!marca.includes(producto.marca)) {
        marca.push(producto.marca)
    }
}

//Lista productos
let botonProductos = document.getElementById("botonProductos")
botonProductos.addEventListener("click", listaCompleta)

function listaCompleta(e) {
    e.preventDefault()
    if (e.which === 1) {
        let tarjetaProducto = productos.filter(producto => producto.nombre.includes(botonProductos.value))
        crearTarjetas(tarjetaProducto)
    }
}

//Filtro para Adidas y Nike
let botonesFiltros = document.getElementsByClassName("menuFiltro")
for (let botonFiltro of botonesFiltros) {
    botonFiltro.addEventListener("click", filtrarYRenderizarPorMarca)
}

function filtrarYRenderizarPorMarca(e) {
    console.log(e)
    let elementosFiltrados = productos.filter(producto => producto.marca === e.target.value)
    crearTarjetas(elementosFiltrados)
}

//Buscador general
let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrar)

function filtrar() {
    let arrayFiltrado = productos.filter(producto => producto.nombre.includes(buscador.value.toLowerCase()) || producto.marca.includes(buscador.value.toLowerCase()))
    crearTarjetas(arrayFiltrado)
}


//Tarjetas para carrito
function crearTarjetas(array) {
    contenedor.innerHTML = ""
    array.forEach(elemento => {
        let producto = document.createElement("div")
        let mensaje = "Unidades disponibles: " + elemento.stock
        producto.className = "tarjetaProducto"
        if (elemento.stock < 3) {
            mensaje = "Ultimas Unidades"
            producto.classList.add("UltimasUnidades")
        }
        producto.innerHTML = `
        <h4>${elemento.marca + " - " + elemento.nombre + " - $" + elemento.precio}</h4>
        <img class="imagen" src="multimedia/${elemento.rutaImagen}">
        <h4>${mensaje}</h4>
        <button id=${elemento.id}>Agregar al carrito</button>
    `
        contenedor.appendChild(producto)
        let botonAgregarAlCarrito = document.getElementById(elemento.id)
        //botonAgregarAlCarrito.addEventListener("click",(e) => console.log(e.target.id)) //mostrar en console el ID
        botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito)
    })
}


//Carrito
function agregarAlCarrito(e) {
    let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
    let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === Number(e.target.id))
    
    if (posicionProductoEnCarrito !== -1) {
        carrito[posicionProductoEnCarrito].unidades++
        carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].unidades * carrito[posicionProductoEnCarrito].precioUnitario
    } else {
        carrito.push({
            id: productoBuscado.id,
            rutaImagen: productoBuscado.rutaImagen,
            marca: productoBuscado.marca,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }
    console.log(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
    lanzarTostada()
}

function renderizarCarrito() {
    let carritoTotal = document.getElementById("carrito")
    carritoTotal.innerHTML = `
    <div id=encabezadoCarrito>
        <p>Imagen:</p>
        <p>Marca:</p>
        <p>Nombre:</p>
        <p>Precio Unitario:</p>
        <p>Unidades:</p>
        <p>Subtotal:</p>
    </div>
    `

    carrito.forEach(producto => {
        let elementoDelCarrito = document.createElement("div")
        elementoDelCarrito.classList.add("elementoDelCarrito")
        elementoDelCarrito.innerHTML = `
        <img class="imagenProducto" src="multimedia/${producto.rutaImagen}">
        <p>${producto.marca}</p>
        <p>${producto.nombre}</p>
        <p>${producto.precioUnitario}</p>
        <p>${producto.unidades}</p>
        <p>${producto.subtotal}</p>
        `
        carritoTotal.appendChild(elementoDelCarrito)
    })

    let compraTotal = carrito.reduce((acc, producto) => acc + producto.precioUnitario * producto.unidades, 0)
    let compraParcial = document.createElement("div")
    compraParcial.className = "compraTotal"
    compraParcial.innerHTML = `Total a Pagar: $${compraTotal} `
    carritoTotal.append(compraParcial)
}


//Boton Carrito
let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", mostrarOcultar)
function mostrarOcultar() {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    let inicio = document.getElementById("inicio")
    contenedorCarrito.classList.toggle("oculto")
    inicio.classList.add("oculto")
}


//Boton Lista productos e Inicio
let botonListaBotines = document.getElementById("botonProductos")
botonListaBotines.addEventListener("click", mostrarOcultarLista)
function mostrarOcultarLista() {
    let inicio = document.getElementById("inicio")
    inicio.classList.add("oculto")
}


//Finalizar Compra
let botonFinalizarCompra = document.getElementById("finalizarCompra")
botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))

function finalizarCompra() {
    let carritoFisico = document.getElementById("carrito")
    if (carrito != 0) {
        lanzarAlert()
    } else {
        lanzarAlert2()
    }
    carritoFisico.innerHTML = ""
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([])
}


//SweetAlerts
function lanzarAlert() {
    Swal.fire(
        'BotinGold',
        `Su compra fue un exito`,
        'success',
    )
}

function lanzarAlert2() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay nada en el carrito',
        footer: '<a href="index.html">Ir a comprar?</a>',
    })
}

//Toastify
function lanzarTostada() {
    Toastify({
        text: "El producto se agrego al carrito",
        className: "infoTostada",
        duration: 2000,
        close: true,
        style: {
            background: "green",
            color: "white",
        },
        gravity: "top",
        position: "right",
    }).showToast()
}