class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

// definimos nuestros productos
const catalogoDisponible = [
    new Producto(1, "paleta Hans carbon", 75000, "PaletaCarbon.png" ),
    new Producto(2, "paleta magnus carbon", 150000, "PaletaMagnus.png" ),
    new Producto(3, "paleta royal", 64000, "PaletaRoyal.png" ),
    new Producto(4, "paleta steel", 95000, "PaletaSteel.png" )
];

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))

document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito()
})



let carrito = JSON.parse(sessionStorage.getItem("carrito"))
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")
const carritoTable = document.getElementById("carrito")

// agregamos una seccion para el carrito
btnCarrito.addEventListener("click", () =>{
    dibujarCarrito()
    if(carritoTable.style.display === "block"){
            carritoTable.style.display = "none"
    }else{
        carritoTable.style.display = "block"
    }
        
        
})

export const comprarProducto = (idProducto) => {
    
       const producto = catalogoDisponible.find((producto) => producto.id === idProducto)
       
       const { nombre, precio, imagen, id } = producto

       const productoCarrito = carrito.find((producto) => producto.id === idProducto)
if(productoCarrito === undefined){
    const nuevoProductoCarrito = {
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
    }
    
    carrito.push(nuevoProductoCarrito)

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
}else{
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
}
    carrito = JSON.parse(sessionStorage.getItem("carrito"))

    Swal.fire(
        `Usted agrego al carrito el producto "${nombre}"`,
        'Haga "click" en el boton para continuar',
        'success'
      )
    

    
}

// ARMANDO LA ESTRUCTURA DEL CARRITO
const dibujarCarrito = () => {

    listaCarrito.innerHTML = ""
    carrito.forEach(producto => {
        const { imagen, nombre, cantidad, precio, id } = producto
        let body = document.createElement("tr")
        body.className = "producto__carrito"
        body.innerHTML = `
        <th><img id="fotoProductoCarrito" src="img/${imagen}" class="card-img-top" style="width:40%; height:30%"</th>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio /cantidad}</td>
        <td>${precio}</td>
        <td>
            <button id="+${id}" class="btn btn-sumar">+</button>
            <button id="-${id}" class="btn btn-restar">-</button>
        </td>
         `

        listaCarrito.append(body)
        
        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => aumentarCantidad(id))
        btnRestar.addEventListener("click", () => restarCantidad(id))
    });

    dibujarFooter()
}

const dibujarFooter = () => {

    if(carrito.length > 0){
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")
        footer.innerHTML=`
        <th><b>Totales:</b></th>
        <td></td>
        <td>${generarTotales().cantidadTotal}</td>
        <td></td>
        <td>${generarTotales().costoTotal}</td>
        `
        
        footCarrito.append(footer)
    }else{
        footCarrito.innerHTML = "<h3> No hay productos en carrito</h3>"
    }

}

const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0 )

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

const aumentarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))

    dibujarCarrito()
}

const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad
    
    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad
    
    if(carrito[indexProductoCarrito].cantidad === 0){
        carrito.splice(indexProductoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito))

    dibujarCarrito()
}
