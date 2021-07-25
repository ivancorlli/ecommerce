let form = document.forms[0]
let data = []

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

function guardarProducto (){
    // Accedemos al valor de cada input escrito
    for (el of form){
        // Mandamos los datos al array 
        data.push(el.value)
    }
    // Deocomprimimos los datos para crear el producto
    let product = new Product (data[0], data[1], data[2], data[3], data[4], data[5]);
    // Los datos se guardan en el local
    localStorage.setItem('product', JSON.stringify(product));
}
