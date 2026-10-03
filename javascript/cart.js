const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const gstElement = document.getElementById("gst");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("grand-total");
const itemCountElement = document.getElementById("item-count");
const continueBtn = document.querySelector(".cs button");

if(cart.length === 0){

    alert("Your cart is empty.");

    window.location.href = "product.html";

}

continueBtn.addEventListener("click", () => {
    window.location.href = "product.html";
});

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {

if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }
    window.location.href = "checkout.html";

});

function updateSummary() {

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(product => {

        subtotal += product.price * product.quantity;
        totalItems += product.quantity;

    });

    let gst = subtotal * 0.05;
    let delivery = cart.length > 0 ? 40 : 0;
    let total = subtotal + gst + delivery;

    itemCountElement.textContent = totalItems;
    subtotalElement.textContent = `₹${subtotal}`;
    gstElement.textContent = `₹${gst.toFixed(2)}`;
    deliveryElement.textContent = `₹${delivery}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

function displayCart() {

    cartItems.innerHTML = "";

    cart.forEach(product => {

        const card = document.createElement("div");

        card.className = "cart-item";
        card.dataset.id = product.id;

        card.innerHTML = `
            <div class="product-info">
                <img src="${product.image}" alt="${product.name}">

                <div class="product-text">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                </div>
            </div>

            <p class="price">₹${product.price}</p>

            <div class="quantity">
                <button class="minus">-</button>
                <span class="qty">${product.quantity}</span>
                <button class="plus">+</button>
            </div>

            <p class="total">₹${product.price * product.quantity}</p>

            <div class="delete">
                <i class="fa-solid fa-trash"></i>
            </div>
        `;

        // Select buttons AFTER the HTML is created
        const plusBtn = card.querySelector(".plus");
        const minusBtn = card.querySelector(".minus");
        const deleteBtn = card.querySelector(".delete");

        plusBtn.addEventListener("click", () => {

            product.quantity++;

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();

        });

        minusBtn.addEventListener("click", () => {

            if (product.quantity > 1) {

                product.quantity--;

                localStorage.setItem("cart", JSON.stringify(cart));

                displayCart();

            }

        });

        deleteBtn.addEventListener("click", () => {

        const index = cart.findIndex(item => item.id === product.id);

        if(index !== -1){
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();   
        }
    });
    
    cartItems.appendChild(card);
    
});
updateSummary();

}



displayCart();