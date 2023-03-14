
// display  products
function displayProducts() {
    let container = "";
    for (let i = 0; i < products.length; i++) {



        container += `<div class="product text-center ">
     <img src="${products[i].productImage}" class="w-100 product-img " alt="product-img">
     <h2 class= "productname"> ${products[i].productName}</h2>
     <h4 class = "productprice">${products[i].productPrice}$</h4>
     <button  onclick="cartHandler(${products[i].id})"  class="add-to-cart">${products[i].added_To_Cart ? " Remove fom cart" : "Add to cart"}</button>
     <button
      id="modelbtn" onclick="quickView(${products[i].id})"  class="quick-view">Quick-view</button>
    </div>
     `
    };
    document.querySelector('.products').innerHTML = container;

}
displayProducts()
//define variabules
let model = document.getElementById('model');
let modelImage = document.querySelector('.model-img')
let modelName = document.querySelector('.model-name')
let modelPrice = document.querySelector('.model-Price')
let cartBtn = document.querySelectorAll('.add-to-cart')

// creating model for each product 


function quickView(id) {

    const element = products.find(elm => elm.id == id)
    modelName.innerHTML = element.productName
    modelPrice.innerHTML = element.productPrice
    modelImage.setAttribute('src', element.productImage)
    model.style.display = "block"


}



let closeBtn = document.querySelector('.closebtn');
closeBtn.addEventListener('click', function () {
    model.style.display = 'none'
})

//Add to cart feature
//define cart
let cart = JSON.parse(localStorage.getItem("cart")) || []

//define cart  variabules
let productCounter =JSON.parse(localStorage.getItem("counter")) || 0;
const openCart = document.querySelector('.checkout')
let total =document.querySelector(".total")
let badge = document.querySelector('.padge')
badge.innerHTML = productCounter
let cardItem = document.querySelector('.cart-item ')
let cartItems =document.querySelector(".shopping-cart-items")
const subTotal = document.querySelector('.subtotal')
let cartDropDown=document.querySelector(".shopping-cart")
const cartToggle =document.getElementById("cart")

//open cart screen

openCart.addEventListener("click", function (e) {
  
    document.querySelector('.products-container').style.display = "none"
    document.querySelector('.cart-section').style.display = "block"
})


//add to cart annd remove from cart 
function cartHandler(id) {

    if (cart.find((item) => item.id == id)) {
        const item = cart.find((product) => product.id == id) 
        let deletedItem = cart.indexOf(item)
        products[id].added_To_Cart = false
        cart.splice(deletedItem, 1)
   if (productCounter > 0,products[id].numberOfUnits>0) {
        
            products[id].numberOfUnit =0
            productCounter --
            badge.innerHTML = productCounter
        }
  
        
        displayProducts()
      

    } else {
        const item = products.find((product) => product.id == id)
        products[id].added_To_Cart = true
        products[id].numberOfUnits=1

        cart.push(item)  
        productCounter +=1
 
        badge.innerHTML = productCounter
     
      
       
        displayProducts()


    }

    updateCart()


}







//changeNumberOfUnits
function changeNumberOfUnits(action, id) {


    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits
        if (item.id === id) {

            if (action == 'minus' && numberOfUnits > 1) {
                numberOfUnits-=1
                productCounter-=1
                badge.innerHTML = productCounter


            } else if (action == 'plus') {
                numberOfUnits+=1
                productCounter+=1
                badge.innerHTML = productCounter



            }

        }
        return {
            ...item,
            numberOfUnits
        }
    })

    updateCart()
}
// render cart items
//render cart dropdown
function renderCartItems() {
     cartItems.innerHTML=''                     
    cardItem.innerHTML = ''
    cart.forEach((item) => {
                                                                                                                                                                     
        cardItem.innerHTML += `  <div class="d-flex">
        <div class="cart-header text-center  cart-coulmn">
            <h3 class="column d-block">Item</h3>
            <div onclick="removeItemFromCart(${item.id})" class="item-info d-flex">
                <img src="${item.productImage}" class=" w-100" alt="${item.productName}">
                <h4 class="unit-name">${item.productName}</h4>
            </div>
        </div>
        <div class="cart-items  text-center cart-coulmn">
            <div class="cart-item ">
                <h3 class="column">Unit price</h3>
                <h4 class="cartPrice">${item.productPrice} $ </h4>
            </div>
        </div>
        <div class=" unites-count text-center cart-coulmn">
        <div class="unites-container">
        <h3 class="unit-row mt-4 ">Units</h3>
        <div class="units d-flex  mt-4">
            <div class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</div>
        </div>
        </div>
        </div>
    </div>`
     cartItems.innerHTML+= `  <li class="clearfix">
     <img src="${item.productImage}" class="w-100" alt="${item.productName}" />
     <span class="item-name">${item.productName}</span>
    <div class="d-flex"> 
    <span class="item-price">${item.productPrice}</span>
    <span class="item-quantity">Quantity: ${item.numberOfUnits}</span>  
    </div>
   </li>`
    })
}
//render cart item if there is a reaload 
if (cart){
   updateCart()
}


// renderSubTotal

function renderSubTotal() {
    let totalPrice = 0
    let totalItems = 0
    cart.forEach((item) => {
        totalPrice += item.productPrice * item.numberOfUnits
     
        totalItems += item.numberOfUnits

    })
    total.innerHTML= totalPrice.toFixed(2)
    productCounter = totalItems
    badge.innerHTML = productCounter
    subTotal.innerHTML = `    Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`
}
//remove function from cart
function removeItemFromCart(id) {
    const item = products.find((product) => product.id == id)
    const deletedElement = products.indexOf(item)
   products[deletedElement].added_To_Cart=false
    cart = cart.filter((item) => item.id != id)


    
    updateCart()
}
//updating cart 
function updateCart() { 
    renderSubTotal()
    renderCartItems()
    localStorage.setItem("cart", JSON.stringify(cart))
    localStorage.setItem("counter", JSON.stringify(productCounter))
    localStorage.setItem("products", JSON.stringify(products))
   

}


 //opening cart toggle and navigate to cart screen
cartToggle.addEventListener("click", function() {
      if (cartDropDown.style.display=="block"){
        cartDropDown.style.display="none"
      }else {
     
        cartDropDown.style.display="block"
      }
    });
    
