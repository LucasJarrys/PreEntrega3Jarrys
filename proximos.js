let lista = document.getElementById("listado");

// ARMAMOS EL FETCH PARA LLAMAR LA SIMULACION DE LA API

fetch("./productos.json")
.then((response) => response.json())
.then((data) => {
    data.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h2>ID: ${item.id}</h2>
        <img src="img/${item.imagen}"/>
        <p>Nombre: ${item.nombre}</p>
        <b>Precio: ${item.precio}</b>
        `
        listado.append(li)
    });
})  