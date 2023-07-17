//Prueba Live Server
console.log("Proyecto Final JS - Guiñazu Santiago")

//E-commerce: Botingold - Compra de Botines

//Carrito - Variable Global
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

//Inicio miPromgramaPrincipal
miProgramaPrincipal()

//Funcion Inicio miPromgramaPrincipal
function miProgramaPrincipal() {
    
    //Contenedor productos
    let contenedor = document.getElementById("productos")
    //1 - Ingreso Usuario
    let botonLogin = document.getElementById("botonLogin")
    //2 - Lista productos
    let botonProductos = document.getElementById("botonProductos")
    //3 - Filtro para Adidas y Nike
    let botonesFiltros = document.getElementsByClassName("menuFiltro")
    //4 - Buscador general
    let buscador = document.getElementById("buscador")
    //5 - Tarjetas para carrito
    //6 - Agregar al Carrito - Funcion Interna
    //7 - Renderizar Carrito
    //8 - Boton Carrito
    let botonCarrito = document.getElementById("botonCarrito")
    //9 - Boton Lista productos e Inicio
    let botonListaBotines = document.getElementById("botonProductos")
    //10 - Finalizar Compra
    let botonFinalizarCompra = document.getElementById("finalizarCompra")

    //DataBase JSON
    dbJSON()

    //Funcion DataBase JSON
    function dbJSON() {
        let dbJSON = "./db.json"

        fetch(dbJSON)
            .then((response) => response.json())
            .then((data) => {
                let usuarios = data.usuarios
                let productos = data.productos

                    //1 - Ingreso Usuario
                    botonLogin.addEventListener("click", () => mostrarBienvenida(usuarios))
                    //2 - Lista productos
                    botonProductos.addEventListener("click", (e) => listaCompleta(e, productos, contenedor))
                    //3 - Filtro para Adidas y Nike
                    for (let botonFiltro of botonesFiltros) {
                        botonFiltro.addEventListener("click", (e) => filtrarYRenderizarPorMarca(e, productos, contenedor))
                    }
                    //4 - Buscador general
                    buscador.addEventListener("input", () => filtrar(productos, buscador, contenedor))
                    //5 - Tarjetas para carrito
                    crearTarjetas(productos, contenedor)
                    //6 - Agregar al Carrito - Funcion Interna
                    //7 - Renderizar Carrito
                    renderizarCarrito()
                    //8 - Boton Carrito
                    botonCarrito.addEventListener("click", mostrarOcultar)
                    //9 - Boton Lista productos e Inicio
                    botonListaBotines.addEventListener("click", mostrarOcultarLista)
                    //10 - Finalizar Compra
                    botonFinalizarCompra.addEventListener("click", () => finalizarCompra())
                    //11 - Funcion Interna SweetAlerts
                    //12 - Funcion Interna Toastify
            })
            .catch(() =>
                Swal.fire({
                    text: 'Error en la base de datos, intente mas tarde',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#003366',
                })
        )
    }
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
            <h4>Bienvenido usuario nuevo ${textLogin.value}</h4>
            `
        usuarioIngresado.classList.remove("oculto")
    }
}

//2 - Lista productos
function listaCompleta(e, arrayProductos, contenedor) {
    e.preventDefault()
    if (e.which === 1) {
        let tarjetaProducto = arrayProductos.filter(producto => producto.nombre.includes(botonProductos.value))
        crearTarjetas(tarjetaProducto, contenedor)
    }
}

//3 - Filtro para Adidas y Nike
function filtrarYRenderizarPorMarca(e, arrayProductos, contenedor) {
    let elementosFiltrados = arrayProductos.filter(producto => producto.marca === e.target.value)
    let inicio = document.getElementById("inicio")
    inicio.classList.add("oculto")
    crearTarjetas(elementosFiltrados, contenedor)
}

//4 - Buscador general
function filtrar(arrayProductos, input, contenedor) {
    let arrayFiltrado = arrayProductos.filter(producto => producto.nombre.includes(input.value.toLowerCase()) || producto.marca.includes(input.value.toLowerCase()))
    let inicio = document.getElementById("inicio")
    inicio.classList.add("oculto")
    crearTarjetas(arrayFiltrado, contenedor)
}

//5 - Tarjetas para carrito
function crearTarjetas(arrayProductos, contenedor) {
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
        botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(arrayProductos, id))
    })
}

//6 - Agregar a Carrito
function agregarAlCarrito(arrayProductos, id) {
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
    renderizarCarrito()
    lanzarTostada()
}

//7 - Renderizar Carrito
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

    carrito.forEach(({ marca, nombre, rutaImagen, precioUnitario, unidades, subtotal }) => {
        let elementoDelCarrito = document.createElement("div")
        elementoDelCarrito.classList.add("elementoDelCarrito")
        elementoDelCarrito.innerHTML = `
        <img class="imagenProducto" src="multimedia/${rutaImagen}">
        <p>${marca}</p>
        <p>${nombre}</p>
        <p>${precioUnitario}</p>
        <p>${unidades}</p>
        <p>${subtotal}</p>
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