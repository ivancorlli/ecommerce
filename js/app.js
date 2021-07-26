// Accedemos a todos los forms
let form = document.forms[0];
let productList = [];

class Product{
    constructor (code,name,category,price,stock,description){
        this.code = code;
        this.name = name;
        this.category = category;
        this.price = price; 
        this.stock = stock;
        this.description = description;
    }
}
function createProduct (code,name,category,description,price,stock){
    // Deocomprimimos los datos para crear el producto
    let product = new Product (code,name,category,description,price,stock);
    // Los datos se guardan en el local
    productList.push(product);
    setProduct(productList);
}
// Cargar productos al Local
function setProduct(item){
    localStorage.setItem('product', JSON.stringify(item));
}
// Descargar produtos del local
function getProduct(){
    let el = localStorage.getItem('product');
    if(el == null){
        productList = [];
    } else{
        productList= JSON.parse(el);
    }
    return productList;
}

document.querySelector('#saveProduct').addEventListener('click', saveProduct);

productTable();

function saveProduct (){
    getProduct ();
    let data = [];
    // Accedemos al valor de cada input escrito
    for (el of form){
        // Mandamos los datos al array 
        data.push(el.value);
    }
    createProduct(data[0],data[1],data[2],data[3],data[4],data[5])
    productTable();
}

// funcion para renderizar productos en lista
function productTable (){
    let list = getProduct(); 
    console.log(list);
    tbody = document.querySelector('#myProducts tbody');
    tbody.innerHTML = '';
    for (let i=0; i<list.length; i++){
        let row = tbody.insertRow(i),
        codigoCell= row.insertCell(0);
        nombreCell= row.insertCell(1);
        categoriaCell= row.insertCell(2);
        descripcionCell= row.insertCell(3);
        precioCell= row.insertCell(4);
        stockCell= row.insertCell(5);
        selectCell= row.insertCell(6);

        codigoCell.innerHTML = list[i].code;
        nombreCell.innerHTML = list[i].name;
        categoriaCell.innerHTML = list[i].category;
        descripcionCell.innerHTML = list[i].description;
        precioCell.innerHTML = list[i].price;
        stockCell.innerHTML = list[i].stock;

        tbody.appendChild(row);
    }
}




