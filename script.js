const cartdisplay = document.querySelector("#bag");
const cart = document.querySelector(".cart-shown");
const cartclose = document.querySelector(".close");
// let btnRemove=document.querySelectorAll('.remove');

cartdisplay.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

cartclose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  let qty = document.querySelectorAll(".quantity");
  qty.forEach((input) => {
    input.addEventListener("change", checkQty);
  });

  let addTo = document.querySelectorAll("#bags");
  addTo.forEach((addBtn) => {
    addBtn.addEventListener("click", addCart);
  });
  countTotal();
}

function removeItem() {
  if (confirm("Are you sure to remove?")) {
    let title = this.parentElement.querySelector(".n-title").innerHTML;
    item = item.filter((e) => e.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

function checkQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let item = [];
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector(".fname").innerHTML;
  let foodPrice = food.querySelector(".price").innerHTML;
  let imgSrc = food.querySelector(".foodbox").src;

  let newProduct = { title, foodPrice, imgSrc };
  if (item.find((el) => el.title == newProduct.title)) {
    alert("Already added");
    return;
  } else {
    item.push(newProduct);
  }
  let createElement = createProduct(title, foodPrice, imgSrc);
  let element = document.createElement("div");
  element.innerHTML = createElement;
  let cartElement = document.querySelector(".cart-content");
  cartElement.append(element);
  loadContent();
}

function createProduct(title, foodPrice, imgSrc) {
  return `<div class="cart-box">
    <img class ="cart-img" src="${imgSrc}">
    <div class="card-detail">
       <div class="n-title">${title}</div>
       <div class="amount">
       <div class="cart-price">${foodPrice}</div>
       <div class="cart-amount">${foodPrice}</div>
       
    </div>
       <input type="number" value="1" class="quantity">
       </div>
       <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
    </div>
    
    
    `;
}

function countTotal() {
  const rate = document.querySelector(".totalrate");
  const cartItem = document.querySelectorAll(".cart-box");

  let total = 0;
  cartItem.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector(".quantity").value;
    total += price * qty;

    product.querySelector(".cart-amount").innerText = "Rs." + price * qty;
  });
  rate.innerHTML = "Rs. " + total;

  const cartCount = document.querySelector(".addcart");
  let count = item.length;
  cartCount.innerHTML = count;
  if (count == 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "block";
  }
}

// let btnRemove=document.querySelectorAll('.cart-remove')
// btnRemove.forEach((btn)=>{
// btn.addEventListener('click',removeItem)
// })

// function removeItem(){
// this.parentElement.remove();
// }
