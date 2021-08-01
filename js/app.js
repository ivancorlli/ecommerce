// Accedemos a todos los forms
const form =  document.querySelectorAll('#formProduct input, select, textarea')
let productList = [];
let btnSave = document.querySelector('#saveProduct');
let btnClose = document.querySelector('#close');
const expres = {
    text: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    numbers: /^\d{0,14}$/ // 0 a 14 numeros.
}
let fields = {
    code : false,
    name : false,
    price : false,
    stock : false
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

productTable();


btnSave.addEventListener('click', saveProduct);
btnClose.addEventListener('click', reset);


// Validar campos
// Tomando todo el array de los inputs del formulario usamos foreach para acceder a cada uno
form.forEach((input) => {
    // a cada input lo escuchamos cuando se levanta una tecla
   input.addEventListener('keyup', () => {
       let field = input.getAttribute('name')
       let value = input.value;
        // clasificamos a ese input escuchado por su atributo    
       switch (field){
           //    Si los atrbutos coinciden con cada caso le aplicamos la expresion regular para validar
        case 'code':
            checkInput(expres.text,value,field)
        break;
        case 'name':
            checkInput(expres.text,value,field)
        break;
        case 'price':
            checkInput(expres.numbers,value,field)
        break;
        case 'stock':
            checkInput(expres.numbers,value,field)
        break; 
    }
    checkSave()
   })
})


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
    reset(); 
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
        precioCell= row.insertCell(3);
        stockCell= row.insertCell(4);
        selectCell= row.insertCell(5);

        codigoCell.innerHTML = list[i].code;
        nombreCell.innerHTML = list[i].name;
        categoriaCell.innerHTML = list[i].category;
        precioCell.innerHTML = list[i].price;
        stockCell.innerHTML = list[i].stock;

        tbody.appendChild(row);
    }
}
function checkInput (type,input,field){
    if(type.test(input)){
        // Si la valdacion coincide con el valor ingresado en el input le aplicamos la clase
        document.getElementById(`${field}`).classList.add('formulario_correcto')
        // Si la validacion es correcta quitamos la clase de incerrecto
        document.getElementById(`${field}`).classList.remove('formulario_incorrecto')
        // Quitamos la visibilidad del texto que nos marca el error
        document.querySelector(`.${field}`).classList.add('d-none') 
        fields[field] = true;
    }else{  
        document.getElementById(`${field}`).classList.remove('formulario_correcto')
        document.getElementById(`${field}`).classList.add('formulario_incorrecto')
        document.querySelector(`.${field}`).classList.remove('d-none')
        fields[field] = false;
    }
}
function checkSave (){
    if(fields.code && fields.name && fields.price && fields.stock){
        btnSave.classList.remove('disabled')
    } else{
        btnSave.classList.add('disabled')
    }
}
function reset (){
form.forEach(el => {
        let field = el.getAttribute('name')
        el.value = "";
        document.getElementById(`${field}`).classList.remove('formulario_correcto')
        document.getElementById(`${field}`).classList.remove('formulario_incorrecto')
        fields[field] = false;
    });
    checkSave()
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






