// Formulario para agregar productos
let productList = [];

function addProductToSystem (pcodigo, pnombre, pcategoria, pdescripcion, pprecio, pstock) {
    let newProduct = {
      nombre: pnombre,
      codigo: pcodigo,
      categoria: pcategoria,
      descripcion: pdescripcion,
      precio: pprecio,
      stock: pstock,
    };
    console.log(newProduct);
    productList.push(newProduct); 
    localStorageProductList(productList);
}

// Guardar productos en LocalStorage
function getProductList (){
    let storedList = localStorage.getItem('localProductList');
    if(storedList == null){
        productList = [];
    }else {
        productList = JSON.parse(storedList);
    }

    return productList;
}

function localStorageProductList(list){
    localStorage.setItem('localProductList', JSON.stringify(list));
}



document.querySelector('#agregarProductos').addEventListener('click', agregarProductos);

imprimirProductTable ()

function agregarProductos(){
    let codigo = document.querySelector('#codigo').value;
        nombre = document.querySelector('#nombre').value;
        categoria = document.querySelector('#categoria').value;
        descripcion = document.querySelector('#descripcion').value;
        precio = document.querySelector('#precio').value;
        stock = document.querySelector('#stock').value;
    
        addProductToSystem(codigo,nombre,categoria,descripcion,precio,stock);
        imprimirProductTable ();
}

// funcion para renderizar productos en lista
function imprimirProductTable (){
    let list = getProductList(); 
    tbody = document.querySelector('#misProductos tbody');
    tbody.innerHTML= '';
    for (let i=0; i<list.length; i++){
        let row = tbody.insertRow(i),
        codigoCell= row.insertCell(0);
        nombreCell= row.insertCell(1);
        categoriaCell= row.insertCell(2);
        descripcionCell= row.insertCell(3);
        precioCell= row.insertCell(4);
        stockCell= row.insertCell(5);
        selectCell= row.insertCell(6);

        codigoCell.innerHTML = list[i].codigo;
        nombreCell.innerHTML = list[i].nombre;
        categoriaCell.innerHTML = list[i].categoria;
        descripcionCell.innerHTML = list[i].descripcion;
        precioCell.innerHTML = list[i].precio;
        stockCell.innerHTML = list[i].stock;

        // let inputSelect = document.createElement('input');
        // inputSelect.type= 'radio';
        // inputSelect.value= list[i].codigo;
        // selectCell.appendChild(inputSelect);

        tbody.appendChild(row);
    }
}

