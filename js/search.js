const btnSearch = document.querySelector('#btnSearch');
const searchProduct = document.querySelector('#searchProduct');

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

searchProduct.addEventListener('keyup', ()=>{
    let search = [];
   for(el of list){
       let product = el.name;
    if(product.includes(searchProduct.value) && product > 2){
        console.log(true,product)
    }
    
} 
})


