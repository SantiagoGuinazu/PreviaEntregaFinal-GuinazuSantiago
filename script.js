//Prueba Live Server
console.log("Proyecto Final JS - Guiñazu Santiago")

//E-commerce: Botingold - Compra de Botines
//Inicio miPromgramaPrincipal
miProgramaPrincipal()

//Funcion Inicio miPromgramaPrincipal
function miProgramaPrincipal() {
    
    //DB Usuarios
    let usuarios = [
        { usuario: "santigui2003", id: 100, nombre: "Santiago", apellido: "Guiñazu", foto: "usuario1.png"},
        { usuario: "gustagui2003", id: 101, nombre: "Gustavo", apellido: "Guiñazu", foto: "usuario2.png"},
        { usuario: "pauligui2003", id: 102, nombre: "Paula", apellido: "Guiñazu", foto: "usuario3.png"},
    ]

    //DB Productos
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

    //Carrito JSON - Productos
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let contenedor = document.getElementById("productos")

    //1 - Ingreso Usuario
    let botonLogin = document.getElementById("botonLogin")
    botonLogin.addEventListener("click", () => mostrarBienvenida(usuarios))

    //2 - Lista productos
    let botonProductos = document.getElementById("botonProductos")
    botonProductos.addEventListener("click", (e) => listaCompleta(e, productos, contenedor, carrito))

    //3 - Filtro para Adidas y Nike
    let botonesFiltros = document.getElementsByClassName("menuFiltro")
    for (let botonFiltro of botonesFiltros) {
        botonFiltro.addEventListener("click", (e) => filtrarYRenderizarPorMarca(e, productos, contenedor, carrito))
    }

    //4 - Buscador general
    let buscador = document.getElementById("buscador")
    buscador.addEventListener("input", () => filtrar(productos, buscador, contenedor, carrito))

    //5 - Tarjetas para carrito
    crearTarjetas(productos, contenedor, carrito)

    //6 - Agregar al Carrito - Funcion Interna

    //7 - Renderizar Carrito
    renderizarCarrito(carrito)

    //8 - Boton Carrito
    let botonCarrito = document.getElementById("botonCarrito")
    botonCarrito.addEventListener("click", mostrarOcultar)

    //9 - Boton Lista productos e Inicio
    let botonListaBotines = document.getElementById("botonProductos")
    botonListaBotines.addEventListener("click", mostrarOcultarLista)

    //10 - Finalizar Compra
    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))

    //11 - Funcion Interna SweetAlerts
    
    //12 - Funcion Interna Toastify

    /*
    PROXIMO PASO DATAJSON + FETCH THEN CATCH
    dbJSON()

    function dbJSON() {
        let dbJSON = "./db.json"

        fetch(dataJSON)
            .then
            .then 
            .catch
    }
    */
}


//1 - Ingreso Usuario
function mostrarBienvenida(arrayIngresado) {
    let textLogin = document.getElementById("textLogin")
    let usuarioIngresado = document.getElementById("usuarioIngresado")
    let usuario = arrayIngresado.find((u) => u.usuario === textLogin.value)
    
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


//2 - Lista productos
function listaCompleta(e, arrayProductos, contenedor, carrito) {
    e.preventDefault()
    if (e.which === 1) {
        let tarjetaProducto = arrayProductos.filter(producto => producto.nombre.includes(botonProductos.value))
        crearTarjetas(tarjetaProducto, contenedor, carrito)
    }
}

//3 - Filtro para Adidas y Nike
function filtrarYRenderizarPorMarca(e, arrayProductos, contenedor, carrito) {
    let elementosFiltrados = arrayProductos.filter(producto => producto.marca === e.target.value)
    crearTarjetas(elementosFiltrados, contenedor, carrito)
}


//4 - Buscador general
function filtrar(arrayProductos, input, contenedor) {
    let arrayFiltrado = arrayProductos.filter(producto => producto.nombre.includes(input.value.toLowerCase()) || producto.marca.includes(input.value.toLowerCase()))
    crearTarjetas(arrayFiltrado, contenedor, carrito)
}


//5 - Tarjetas para carrito
function crearTarjetas(arrayProductos, contenedor, carrito) {
    contenedor.innerHTML = ""
    arrayProductos.forEach(({ stock, marca, nombre, rutaImagen, precio, id }) => {
        let producto = document.createElement("div")
        let mensaje = "Unidades disponibles: " + stock
        producto.className = "tarjetaProducto"
        if (stock < 3) {
            mensaje = "Ultimas Unidades"
            producto.classList.add("UltimasUnidades")
        }
        producto.innerHTML = `
        <h4>${marca + " - " + nombre + " - $" + precio}</h4>
        <img class="imagen" src="multimedia/${rutaImagen}">
        <h4>${mensaje}</h4>
        <button id=${id}>Agregar al carrito</button>
    `
        contenedor.appendChild(producto)
        let botonAgregarAlCarrito = document.getElementById(id)
        botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(arrayProductos, id, carrito))
    })
}

//6 - Agregar a Carrito
function agregarAlCarrito(arrayProductos, id, carrito) {
    let productoBuscado = arrayProductos.find(producto => producto.id === id)
    let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === id)
    
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
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
    lanzarTostada()
}

//7 - Renderizar Carrito
function renderizarCarrito(carrito) {
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


//8 - Boton Carrito
function mostrarOcultar() {
    let contenedorCarrito = document.getElementById("contenedorCarrito")
    let inicio = document.getElementById("inicio")
    contenedorCarrito.classList.toggle("oculto")
    inicio.classList.add("oculto")
}



//9 - Boton Lista productos e Inicio
function mostrarOcultarLista() {
    let inicio = document.getElementById("inicio")
    inicio.classList.add("oculto")
}



//10 - Finalizar Compra
function finalizarCompra(carrito) {
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


//11 - SweetAlerts
function lanzarAlert() {
    Swal.fire(
        'Compra Exitosa!!',
        `BotinGold - Su compra fue un exito - Recibira su factura al mail`,
        'success',
    )
}

function lanzarAlert2() {
    Swal.fire({
        icon: 'error',
        title: 'Carrito Vacio',
        text: 'No hay nada en el carrito',
        footer: '<a href="index.html">Ir a comprar?</a>',
    })
}

//12 - Toastify
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