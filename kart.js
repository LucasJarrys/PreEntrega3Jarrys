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

localStorage.setItem("catalogoDisponible", JSON.stringify(catalogoDisponible))
let inventory = localStorage.getItem("catalogoDisponible");
let remove = document.getElementById("remove");
let load = document.getElementById("load")
let lista = document.getElementById("listuli");


console.log(JSON.parse(inventory))
const showAllItem = (arry, htmlItem) => {
    if(arry){
        htmlItem.innerHTML = ""
        arry.forEach(element => {
            let item = document.createElement("div");
            item.innerHTML =`
            <p name="nombre" >${element.nombre}</p>
            <p name="precio" >Precio: $${element.precio}</p>
            <button class="btn btn-dark">agregar al carrito</button>
            `
            item.classList.add("col-xs-8");
            item.classList.add("col-md-3");
            item.classList.add("paletas");
            htmlItem.appendChild(item)})
    }else{
        htmlItem.innerHTML = ""
        let item = document.createElement("div");
        item.innerHTML = `No hay mas items en el carrito`
        htmlItem.appendChild(item)
    }
    
}

load.onclick = () => {
    showAllItem(JSON.parse(inventory),lista)
}

remove.onclick = ()=>{
    localStorage.clear();
    let removedInventory = localStorage.getItem("catalogoDisponible");
    showAllItem(JSON.parse(removedInventory),lista)
}