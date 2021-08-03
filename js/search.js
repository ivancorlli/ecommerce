const btnSearch = document.querySelector('#btnSearch');
const searchProduct = document.querySelector('#searchProduct');
const showProduct = document.querySelector('#showProduct')

let div1 = document.createElement("div");
let div2 = document.createElement("div");
let col = document.createElement("div");
col.classList.add('col-12','col-sm-4')
let colProduct = document.createElement("div");
colProduct.classList.add('product-card')
let spanTitle = document.createElement('span')
spanTitle.classList.add('fw-bold','fs-5','my-2')
let spanPrice = document.createElement('span')
spanPrice.classList.add('w-bold','fs-6','my-2')
let imgProduct = document.createElement('img')
let btnProduct = document.createElement('a')
btnProduct.classList.add('btn','btn-danger','my-2')

let list = getProduct()
function getProduct(){
    let el = localStorage.getItem('product');
    if(el == null){
        productList = [];
    } else{
        productList= JSON.parse(el);
    }
    return productList;
}

searchProduct.addEventListener('keyup', filterProduct )



function filterProduct (){
 let search = [];
   for(el of list){
       let product = el.name;   
    if(Object.keys( searchProduct.value).length > 3){
       if(product.includes(searchProduct.value) ){
        search.push(el)} 
        }
    }
    if(search.length > 0){
        showProducts(search)
    }else{
        showProduct.innerHTML = '';
        }
}




function showProducts (product){

    product.forEach(el => {

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let col = document.createElement("div");
        col.classList.add('col-12','col-sm-4')
        let colProduct = document.createElement("div");
        colProduct.classList.add('product-card')
        let spanTitle = document.createElement('span')
        spanTitle.classList.add('fw-bold','fs-5','my-2')
        let spanPrice = document.createElement('span')
        spanPrice.classList.add('w-bold','fs-6','my-2')
        let imgProduct = document.createElement('img')
        let btnProduct = document.createElement('a')
        btnProduct.classList.add('btn','btn-danger','my-2')

        spanTitle.innerHTML = el.name
        spanPrice.innerHTML =`Precio: $${el.price}`
        btnProduct.innerHTML = 'Comprar'
        imgProduct.setAttribute('src',`/assets/productos/${el.image}.jpg`)
        imgProduct.setAttribute('alt',`${el.name}`)
        btnProduct.setAttribute('href', '/pages/error404.html')
        btnProduct.setAttribute('target', 'blank')
        div1.appendChild(spanTitle); 
        div2.appendChild(spanPrice);
        showProduct.appendChild( col).appendChild(div1)
        showProduct.appendChild( col).appendChild(imgProduct)  
        showProduct.appendChild( col).appendChild(div2)
        showProduct.appendChild( col).appendChild(btnProduct)
    });

}
