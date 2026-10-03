// ==============================
// LOAD CART
// ==============================

const cart = JSON.parse(localStorage.getItem("cart")) || [];
if(cart.length === 0){

    alert("Your cart is empty!");

    window.location.href = "product.html";

}

// ==============================
// SUMMARY ELEMENTS
// ==============================

const subtotalElement = document.getElementById("subtotal");
const gstElement = document.getElementById("gst");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("grand-total");
let total = 0;
// ==============================
// FORM ELEMENTS
// ==============================

const fullName = document.getElementById("fullname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const pincode = document.getElementById("pincode");

const placeOrderBtn = document.getElementById("place-order");

// ==============================
// LOAD ORDER SUMMARY
// ==============================

function loadSummary() {

    let subtotal = 0;

    cart.forEach(product => {
        subtotal += product.price * product.quantity;
    });

    const delivery = cart.length > 0 ? 40 : 0;
    const gst = subtotal * 0.05;
    total = subtotal + gst + delivery;

    subtotalElement.textContent = `₹${subtotal}`;
    gstElement.textContent = `₹${gst.toFixed(2)}`;
    deliveryElement.textContent = `₹${delivery}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;

    console.log(cart);
    console.log(total);

}

loadSummary();

// ==============================
// PLACE ORDER
// ==============================

placeOrderBtn.addEventListener("click", () => {

    if(fullName.value.trim().length < 3){
    alert("Please enter a valid full name.");
    fullName.focus();
    return;
    }

    const phonePattern = /^[0-9]{10}$/;

if(!phonePattern.test(phone.value.trim())){
    alert("Please enter a valid 10-digit phone number.");
    phone.focus();
    return;
}

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email.value.trim())){
    alert("Please enter a valid email address.");
    email.focus();
    return;
}

    if(address.value.trim().length < 10){
    alert("Please enter a complete address.");
    address.focus();
    return;
}

    if(city.value.trim() === ""){
    alert("Please enter your city.");
    city.focus();
    return;
}

    if(state.value.trim() === ""){
    alert("Please enter your state.");
    state.focus();
    return;
}

    const pincodePattern = /^[0-9]{6}$/;

if(!pincodePattern.test(pincode.value.trim())){
    alert("Please enter a valid 6-digit PIN code.");
    pincode.focus();
    return;
}

    // Generate Order ID
    const orderId = "YT" + Date.now();

localStorage.setItem("orderId", orderId);

localStorage.setItem(
    "paymentMethod",
    document.querySelector('input[name="payment"]:checked')
        .parentElement.textContent.trim()
);

localStorage.setItem("totalPaid", total.toFixed(2));

// Clear cart after saving order details
localStorage.removeItem("cart");

window.location.href = "success.html";

});