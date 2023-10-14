document.title='To Do App'

const form = document.querySelector('form');
const errorDiv = document.getElementById('error-div');
const inputAdd = document.getElementById('input-add');
const btnSubmit =  document.getElementById('btn-submit');
const allListContainer = document.querySelector('.all-list');

// main submite funcitonn
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputValue = inputAdd.value;
    
    if(inputValue){
        // sub container 
        const subContainer = document.createElement('div')
        subContainer.classList.add('single-list')
        
        // icon
        const icon = document.createElement('div')
        icon.innerHTML='<i class="icon-1 fa-solid fa-circle"></i>'
        console.log(icon)
        
        // input into sub container
        const input = document.createElement('input')
        input.setAttribute('value',inputValue)
        input.setAttribute('readonly','readonly')
        
        // edit button
        const btnEdit = document.createElement('button');
        btnEdit.innerText='Edit'
        btnEdit.classList.add('btn-edit');
        
        // complete button
        const btnComplete = document.createElement('button')
        btnComplete.innerText = 'Complete';
        btnComplete.classList.add('btn-complete');
        
        // complete button
        const btnDelete = document.createElement('button')
        btnDelete.innerText = 'Delete';
        btnDelete.classList.add('btn-delete');
        
        // append in sub container
        subContainer.appendChild(icon)
        subContainer.appendChild(input)
        subContainer.appendChild(btnEdit)
        subContainer.appendChild(btnComplete)
        subContainer.appendChild(btnDelete)
        allListContainer.appendChild(subContainer)
        
        
        // btn edit function
        btnEdit.addEventListener('click',(e)=>{
            if(btnEdit.innerText==='Edit'){
                btnEdit.innerText='Save';
                icon.innerHTML='<i class="icon-1 fa-solid fa-pen-to-square"></i>'
                input.removeAttribute('readonly')
                input.focus()
            }
            else{
                btnEdit.innerText='Edit'
                input.setAttribute('readonly','readonly')
                icon.innerHTML='<i class="icon-1 fa-solid fa-circle"></i>'
            }
        })
        
        // btn completed function
        btnComplete.addEventListener('click',function(e){
            btnComplete.innerText='Completed'
            icon.innerHTML='<i class=" icon-1 fa-solid fa-circle-check"></i>';
            input.setAttribute('readonly','readonly')
            btnEdit.innerText='Edit'
        })
        
        
        // delete btn function
        btnDelete.addEventListener('click',function(){
            allListContainer.removeChild(subContainer)
        })
        
        // clear input 
        errorDiv.innerHTML=''
        inputAdd.value=''
    }
    else{
        errorDiv.classList.add('error-text');
        errorDiv.innerText = "Please fill input"
    }
})









//  add product in cart
const CartForm = document.querySelector('#cart-form');
const mainProductContainer = document.querySelector('.add-product-container');
const inputProductName = document.getElementById('input-product-name');
const inputProductPrice = document.getElementById('input-product-price');
const inputProductUrl = document.getElementById('input-product-url');
const inputProductDetails = document.getElementById('input-product-details');

let allProducts =JSON.parse( localStorage.getItem("allItems")) || []    
// console.log(allProducts)


// create element function
const createElementFun = (productNameVal,productPriceVal,productUrlVal,productDetailsVal)=>{
    let singleProduct = document.createElement('div');
    singleProduct.classList.add('single-product')
    singleProduct.innerHTML = `
        <img  src="${productUrlVal}" alt="">
        <div class="product-data">
            <h4 class="product-name">${productNameVal}</h4>
            <h4 class="product-price">Price : ${productPriceVal}$</h4>
            <p class="product-deatils">${productDetailsVal}</p>
            <div class="div-btn"><button class="bnt-add-to-cart">Add To Card</button></div>
        </div>
    `
    // add single item
    mainProductContainer.classList.add('add-product-container');
    mainProductContainer.appendChild(singleProduct)
}


// cartSubmit main function
CartForm.addEventListener('submit',function(e){
    e.preventDefault();
    
    const productNameVal = inputProductName.value;
    const productPriceVal = inputProductPrice.value;
    const productUrlVal = inputProductUrl.value;
    const productDetailsVal = inputProductDetails.value;
    
    createElementFun(productNameVal,productPriceVal,productUrlVal,productDetailsVal)
    
    allProducts.push({
        name: productNameVal,
        image: productUrlVal,
        price: productPriceVal,
        dateils: productDetailsVal
    })
    // set in localstorage
    localStorage.setItem('allItems',JSON.stringify(allProducts))

    // clear input 
    inputProductName.value='';
    inputProductDetails.value='';
    inputProductPrice.value='';
    inputProductUrl.value='';
})

allProducts.forEach(eachItem=>{
    const {name,image,price,dateils}= eachItem
    createElementFun(name,price,image,dateils)
})











// fetch 
fetch('products.json')
.then((res)=>res.json())
.then((data)=>displayFun(data))
.catch(function(err){console.log('error to fatch')})

let Allitems;
let carts = JSON.parse(localStorage.getItem('carts')) || []
const itemsContainer = document.querySelector('.items')


// display products
function displayFun(items){
    Allitems=items
    items.forEach((item)=>{
        itemsContainer.innerHTML += `
        <div class="item">
        <img src="${item.img}" alt="">
        <h3>Price : ${item.price}$</h3>
        <h2>${item.name}</h2>
        <p>${item.text}</p>
        <button onclick="addToCart('${item.id}')">Add To Cart</button>
        </div>
        `
    })
}
const cartContainer = document.querySelector('.cart-products')
const total =document.getElementById('total')

// display cart
function displayCart(){
    for(let each of carts){
        cartContainer.innerHTML += `
        <div class="cart-product-single">
            <img width="50" height="50" src="${each.img}" alt="">
            <p>Quintity: ${each.quantity}</p>
            <p>${each.name}</p> 
            <h3>Sub Total : ${each.price}$</h3>  
            <button class="remove-cart" onclick="removeCart(event)">X</button>
        </div>
    `
    }
}
displayCart()


// cart Total
function cartTotal (){
    const sub = carts.map((each)=>{
        return each.price * each.quantity
    })
    const final = sub.reduce((pre,curr)=>{
        return pre+curr;
    },0)
    total.innerText = final;
}
cartTotal()


// add To cart main function
function addToCart(productId){
    const item = Allitems.find((eachItem)=>eachItem.id === productId)
    
    carts.push(item);
    item.quantity =1;
    localStorage.setItem('carts',JSON.stringify(carts));
    // displayCart()
    const cartEachHtml = `
        <div class="cart-product-single">
            <img width="50" height="50" src="${item.img}" alt="">
            <p>Quintity: ${item.quantity}</p>
            <p>${item.name}</p> 
            <h3>Sub Total : ${item.price}$</h3>  
            <button class="remove-cart" onclick="removeCart(event)">X</button>
        </div>
    `
    cartContainer.innerHTML += cartEachHtml;
    // add total
    cartTotal()
}


// remove cart
function removeCart(event){
    let click=  event.target.closest('.cart-product-single')
    click.style.display='none'
}







const promistMy = new Promise((reslove,reject)=>{
    let taka=12;
    let nam='kabir';
    reslove(taka)
})

promistMy
    .then((taka)=>{
        console.log('name and taka '+taka)
    })
    .catch((err)=>{
        console.log('sorrye error')
    })