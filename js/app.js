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
    constructor (code,name,image,category,price,stock,description){
        this.code = code;
        this.name = name;
        this.image = image;
        this.category = category;
        this.price = price; 
        this.stock = stock;
        this.description = description;
    }
}
function createProduct (code,name,image,category,price,stock,description){
    // Deocomprimimos los datos para crear el producto
    
    product = new Product (code,name,image,category,price,stock,description);
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
        console.log(data)
    }
    createProduct(data[0],data[1],data[2],data[3],data[4],data[5]) 
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
                              <button type="button" class="btn btn-success" >FAVORITO</button>`
    

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



function deleteRow(index) {
    if (index !=undefined) {
        productList.splice(index,4);
    } else {
        productList= [];
    }
    //Una vez modificado el array lo guardo y vuelvo a renderizar los elementos
    localStorage.setItem('item', JSON.stringify(productList)); //guardo
    productTable(); //renderizo otra vez
}


/*
var myModal = new bootstrap.Modal(document.getElementById('cambiarValor'), {});

function abrirModal(id) {
    console.log(myModal);
    myModal._dialog.setAttribute('element-to-change', id);
    myModal.show();
}

function changeElement() {
    let newValue = document.getElementById('new-value').value;
    let index = myModal._dialog.getAttribute('element-to-change');
    arrayListaSuper[index] = newValue;
    console.log(arrayListaSuper);
    renderizarLista();
    myModal.hide();
}


*/

///////////////////////////// USER /////////////////////////////
let userList = getUserList()
userTable(userList)



const selectStatus  = document.querySelectorAll('.statusUser');

selectStatus.forEach(option => {
    option.addEventListener('change', () =>{
        let value = option.value
        let att = option.getAttribute('name')
        switch(value){
            case "pending":{
                let op = document.querySelector(`.status-${att}`)
                op.setAttribute('status','pending')
                op.classList.add('text-warning')
                op.classList.remove('text-success')
                op.innerHTML = '<i class="fas fa-grip-lines">'
                break;
            }
            case "approved":{
                let op = document.querySelector(`.status-${att}`)
                op.setAttribute('status','approved')
                op.classList.add('text-success')
                op.classList.remove('text-warning')
                op.innerHTML = '<i class="fas fa-check"></i>'
                break;
            }

        }
        
    })
})


function getUserList(){
    let el = localStorage.getItem('users');
    let userList = [];
    if(el == null){
        userList = [];
    } else{
        userList= JSON.parse(el);
    }
    return userList;
}
function userTable (filter){
    let flag = filter;
    tbody = document.querySelector('#myUsersList tbody');
    tbody.innerHTML = '';
    for (let i=0; i<flag.length; i++){
        let row = tbody.insertRow(i),
        nombreCell= row.insertCell(0);
        apellidoCell= row.insertCell(1);
        emailCell= row.insertCell(2);
        optionCell= row.insertCell(3);
        statusCell= row.insertCell(4);

        nombreCell.innerHTML = flag[i].nameUser;
        apellidoCell.innerHTML = flag[i].subname;
        emailCell.innerHTML = flag[i].email;
        optionCell.innerHTML = `<select class="statusUser" name="${flag[i].nameUser}" ><option value="pending">Pending</option><option value="approved">Approved</option></select>` 
        statusCell.innerHTML = `<a class="status-${flag[i].nameUser} text-warning"><i class="fas fa-grip-lines"></i></a>`
            
        

        tbody.appendChild(row);
    }}


///////////////////////////// GRAFICO //////////////////////////////////////////////
const deviceGraph = document.getElementById('deviceGraph');
const device = ['desktop','movil','tablet'];
const deviceData = {
    label: "Visitas por mes",
    data: [1500, 1000, 2000], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor:[ 
        'rgba(54, 162, 235, 1)',
        'rgba(54, 12, 235, 1)',
        'rgba(54, 9, 35, 1)'
] // Color de fondo
    
};
new Chart(deviceGraph, {
    type: 'doughnut',// Tipo de gráfica
    data: {
        labels: device,
        datasets: [
            deviceData,
            // Aquí más datos...
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {beginAtZero: true},
                
            }]
        }
        
    }
});