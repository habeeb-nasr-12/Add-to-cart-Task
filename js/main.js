// display  products


function displayProducts() {
    let container = "";
    for (let i = 0; i < products.length; i++) {
        container += `<div class="product text-center ">
     <img src="${products[i].productImage}" class="w-100 product-img " alt="product-img">
     <h2 class= "productname"> ${products[i].productName}</h2>
     <h4 class = "productprice">${products[i].productPrice}$</h4>
     <button  onclick="cartHandler(${products[i].id})"  class="add-to-cart">${products[i].added_To_Cart == true ? "Remove from cart " : "Add To cart"}</button>
     <button
      id="modelbtn"  class="quick-view">Quick-view</button>
    </div>
     `
    };
    document.querySelector('.products').innerHTML = container;

}
displayProducts()
// creating model for each product 
let productName, productImage, productPrice;
let model = document.getElementById('model');

let quickViewButtons = document.querySelectorAll('.quick-view')
let allImages = document.querySelectorAll('.product-img')
let allNames = document.querySelectorAll('.productname')
let allPrices = document.querySelectorAll('.productprice')

let modelImage = document.querySelector('.model-img')
let modelName = document.querySelector('.model-name')
let modelPrice = document.querySelector('.model-Price')


for (let i = 0; i < quickViewButtons.length; i++) {

    quickViewButtons[i].addEventListener('click', function () {
        productImage = allImages[i].getAttribute('src')
        productName = allNames[i].innerHTML
        productPrice = allPrices[i].innerHTML
        modelName.innerHTML = productName
        modelPrice.innerHTML = productPrice
        modelImage.setAttribute('src', productImage)
        model.style.display = "block"
    })


}
let closeBtn = document.querySelector('.closebtn');
closeBtn.addEventListener('click', function () {
    model.style.display = 'none'
})

//Add to cart feature
//define variabules
let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
let productCounter = localStorage.getItem("counter") ? JSON.parse(localStorage.getItem("counter")) : 0
let badge = document.querySelector('.padge')
badge.innerHTML = productCounter
let cardItem = document.querySelector('.cart-item ')
const subTotal = document.querySelector('.subtotal')
if (cart) {
    updateCart()
}
//open cart screen
const openCart = document.querySelector('.open-cart')
openCart.addEventListener("click", function (e) {

    document.querySelector('.products-container').style.display = "none"
    document.querySelector('.cart-section').style.display = "block"
})



//add to cart annd removefrom cart 
function cartHandler(id) {

    if (cart.find((item) => item.id == id)) {
        const item = products.find((product) => product.id == id)
        const deletedElement = cart.indexOf(item)
        products[id].added_To_Cart = false
        products[id].numberOfUnits -= 1
        cart.splice(deletedElement, 1)

        if (productCounter > 0) {
            productCounter -= 1
        }
        displayProducts()
        badge.innerHTML = productCounter







    } else {
        const item = products.find((product) => product.id == id)
        cart.push(item)
        products[id].added_To_Cart = true
        products[id].numberOfUnits += 1
        displayProducts()

        productCounter += 1
        badge.innerHTML = productCounter







    }
    updateCart()


}



//changeNumberOfUnits
function changeNumberOfUnits(action, id) {


    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits
        if (item.id === id) {

            if (action == 'minus' && numberOfUnits > 1) {
                numberOfUnits--
                productCounter--
                badge.innerHTML = productCounter


            } else if (action == 'plus') {
                numberOfUnits++
                productCounter++
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
function renderCartItems() {
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
    })
}

// renderSubTotal
function renderSubTotal() {
    let totalPrice = 0
    let totalItems = 0

    cart.forEach((item) => {
        totalPrice += item.productPrice * item.numberOfUnits
        totalItems += item.numberOfUnits
     
    })
    subTotal.innerHTML = `    Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`
}
//remove function from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id != id)
    productCounter = cart.length

    badge.innerHTML = productCounter
    updateCart()
}
//updating cart 
function updateCart() {
    renderCartItems()
    renderSubTotal()
    localStorage.setItem("cart", JSON.stringify(cart))
    localStorage.setItem("counter", JSON.stringify(productCounter))

}