class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const catalogoDisponible = [
    new Producto(1, "paleta siux carbon", 75000 ),
    new Producto(2, "paleta magnus carbon", 150000 ),
    new Producto(3, "paleta royal", 64000 ),
    new Producto(4, "paleta steel", 95000 ),
];

const carrito = []

let lista = document.getElementById("listuli");
let searchBtn = document.getElementById("searchBtn")
let searchInput = document.getElementById("searchInput")
let results = document.getElementById("results")
let searchForm = document.getElementById("searchForm")
let menuPrincipal = document.getElementById("menuPrincipal")
let mensajitoMenu = document.getElementById("mensajitoMenu")

const showAllItem = (arry, htmlItem) => {
    arry.forEach(element => {
        let item = document.createElement("div");
        item.innerHTML =`
        <p name="nombre" >${element.nombre}</p>
        <p name="precio" >Precio: $${element.precio}</p>
        <button id="comprar${element.id}" class="btn btn-dark">agregar al carrito</button>
        `
        item.classList.add("col-xs-8");
        item.classList.add("col-md-3");
        item.classList.add("paletas");
        htmlItem.appendChild(item)    

        const btnComprar = document.getElementById(`comprar${element.id}`)
            btnComprar.addEventListener("click", () => console.log ("agregar a carrito")) 
    })
    
}

const showFilteredItems = (arry, htmlItem, keyword) => {
    let filteredArry = arry.filter((element) => element.nombre.includes(keyword))
    mensajitoMenu.innerHTML = `Resultados de busqueda para ${keyword}`
    htmlItem.innerHTML = ""
    showAllItem(filteredArry, htmlItem)
}

showAllItem(catalogoDisponible,lista)

searchBtn.onclick = ()=>{
    showFilteredItems(catalogoDisponible, lista, searchInput.value)
}


