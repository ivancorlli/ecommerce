// Accedemos a todos los forms
const form =  document.querySelectorAll('#formProduct input, select, textarea')
let productList = [];
let list = [];
let product;
const btnSave = document.querySelector('#saveProduct');
const btnClose = document.querySelector('#close');
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
    product = new Product (code,name,category,description,price,stock);
    // Los datos se guardan en el local
    productList.push(product);
    setProduct(productList);

    return product;
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

list = getProduct();
productTable (list)


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
    list = getProduct()
    let data = [];
    // Accedemos al valor de cada input escrito
    for (el of form){
        // Mandamos los datos al array 
        data.push(el.value);
    }
    let sis = createProduct(data[0],data[1],data[2],data[3],data[4],data[5]) 
    // console.log(sis.length)
    productTable(list);
    reset(); 
}

// funcion para renderizar productos en lista
function productTable (filter){
    let flag = filter;
    tbody = document.querySelector('#myProducts tbody');
    tbody.innerHTML = '';
    for (let i=0; i<flag.length; i++){
        let row = tbody.insertRow(i),
        codigoCell= row.insertCell(0);
        nombreCell= row.insertCell(1);
        categoriaCell= row.insertCell(2);
        precioCell= row.insertCell(3);
        stockCell= row.insertCell(4);
        selectCell= row.insertCell(5);
        selectCell.innerHTML=`<button type="button" class="btn btn-warning" onclick="changeElement()"> EDITAR</button>
                              <button type="button" class="btn btn-danger" onclick="deleteRow()">ELIMINAR</button>
                              <button type="button" class="btn btn-success" onclick="fav()">FAVORITO</button>`
    

        codigoCell.innerHTML = flag[i].code;
        nombreCell.innerHTML = flag[i].name;
        categoriaCell.innerHTML = flag[i].category;
        precioCell.innerHTML = flag[i].price;
        stockCell.innerHTML = flag[i].stock;

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
let search = document.querySelector('.search')
search.addEventListener('keyup', function(){
    productList = JSON.parse(localStorage.getItem("product"));
    // valor que ingreso en el input
    let searchValue = search.value.toLowerCase();
    // nuevo array que se ingresa.
    let newArray = [];
    productList.forEach(function (el){
        if (
          el.name.toLowerCase().includes(searchValue) ||
          el.category.toLowerCase().includes(searchValue)
        ) {
          newArray.push(el);
        }
                
    })
    productTable(newArray);
});


function deleteRow() {
    alert("Estás a punto de eliminar esta fila.");
    for (item in productList) {
        productList= [];
    }
    
    //Una vez modificado el array lo guardo y vuelvo a renderizar los elementos
    localStorage.setItem('items', JSON.stringify(productList)); //guardo
    productTable(); //renderizo otra vez
}


function fav(){
    document.getElementsByClassName('fav').style.backgroundColor = "green";
}


   

// Validacion de Formulario de Contacto.
(function () {
  let matter = document.getElementById("matter");
  let name = document.getElementById("name1");
  let massage = document.getElementById("massage");

  let validarCampo = function (e) {
    if (
      formulario.name.value == 0 ||
      formulario.matter.value == 0 ||
      formulario.message.value == 0
    ) {
      alert("Debe completar todos los campos");
    }
  };
  let validar = function (e) {
    validarCampo(e);
    alert("El email fue enviado con exito.");
  };
  formulario.addEventListener("submit", validar);
})()

// Enviar email al administrador

var params = {
  from: `document.getElementById("name1").value`,
  to: "pablomcoronel1369@gmail.com",
  mensaje: `Nueva consulta ${matter.value}${message.value}${phone.value}${email1.value}`,
};
  
emailjs.send("service_ysk1goe", "template_9pp3njm", params).then(
   function (response) {
     console.log("SUCCESS!", response);
   },
   function (error) {
     console.log("FAILED...", error);
   }
);