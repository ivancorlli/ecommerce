// Accedemos a todos los forms
const form =  document.querySelectorAll('#formProduct input, select, textarea')
let productList = [];
let btnSave =document.querySelector('#saveProduct');
const expres = {
    text: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    numbers: /^\d{0,14}$/ // 0 a 14 numeros.
}
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

btnSave.addEventListener('click', saveProduct);
// Validar campos
// Tomando todo el array de los inputs del formulario usamos foreach para acceder a cada uno
form.forEach((input) => {
    // a cada input lo escuchamos cuando se levanta una tecla
   input.addEventListener('keyup', () => {
        // clasificamos a ese input escuchado por su atributo    
       switch (input.getAttribute('name')){
        //    Si los atrbutos coinciden con cada caso le aplicamos la expresion regular para validar
        case 'code':
            // Expres es un objeto con las validaciones guardadas
            if(expres.text.test(input.value)){
                // Si la valdacion coincide con el valor ingresado en el input le aplicamos la clase
                document.querySelector('#code').classList.add('formulario_correcto')
                // Si la validacion es correcta quitamos la clase de incerrecto
                document.querySelector('#code').classList.remove('formulario_incorrecto')
                // Quitamos la visibilidad del texto que nos marca el error
                document.querySelector('.code').classList.add('d-none')
            }else{  
                document.querySelector('#code').classList.remove('formulario_correcto')
                document.querySelector('#code').classList.add('formulario_incorrecto')
                document.querySelector('.code').classList.remove('d-none')
            }
        break;
        case 'name':
            if(expres.text.test(input.value)){
                document.querySelector('#name').classList.add('formulario_correcto')
                document.querySelector('#name').classList.remove('formulario_incorrecto')
                document.querySelector('.name').classList.add('d-none')
            }else{  
                document.querySelector('#name').classList.remove('formulario_correcto')
                document.querySelector('#name').classList.add('formulario_incorrecto')
                document.querySelector('.name').classList.remove('d-none')
            }
        break;
        case 'price':
            if(expres.numbers.test(input.value)){
                document.querySelector('#price').classList.add('formulario_correcto')
                document.querySelector('#price').classList.remove('formulario_incorrecto')
                document.querySelector('.price').classList.add('d-none')
            }else{  
                document.querySelector('#price').classList.remove('formulario_correcto')
                document.querySelector('#price').classList.add('formulario_incorrecto')
                document.querySelector('.price').classList.remove('d-none')
            }
        break;
        case 'stock':
            if(expres.numbers.test(input.value)){
                document.querySelector('#stock').classList.add('formulario_correcto')
                document.querySelector('#stock').classList.remove('formulario_incorrecto')
                document.querySelector('.stock').classList.add('d-none')
            }else{  
                document.querySelector('#stock').classList.remove('formulario_correcto')
                document.querySelector('#stock').classList.add('formulario_incorrecto')
                document.querySelector('.stock').classList.remove('d-none')
            }
        break;
        
    }
   })
})

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

//Validación LogIn
function validarLogIn(){
    var idemail, password1;
    idemail = document.getElementById("emailLogIn").value;
    password1 = document.getElementById("passwordLogIn").value;
  
    if(idemail=="" || password1==""){
      alert("Todos los campos son obligatorios. Por favor, completalos e intentá nuevamente");
      return false;
    }
  }








