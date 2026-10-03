const orderId = localStorage.getItem("orderId") || "Not Available";
const payment = localStorage.getItem("paymentMethod") || "Cash On Delivery";
const total = localStorage.getItem("totalPaid") || "0";

if(!localStorage.getItem("orderId")){

    window.location.href = "product.html";

}

document.getElementById("order-id").textContent = "#" + orderId;
document.getElementById("payment-method").textContent = payment;
document.getElementById("total-paid").textContent = "₹" + total;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const options = {
    day: "numeric",
    month: "long",
    year: "numeric"
};

document.getElementById("delivery-day").textContent =
`Tomorrow (${tomorrow.toLocaleDateString("en-IN", options)})`;
document.getElementById("delivery-time").textContent =
"Between 10:00 AM - 6:00 PM";

document
    .getElementById("continue-shopping")
    .addEventListener("click", () => {

        localStorage.removeItem("orderId");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("totalPaid");

        window.location.href = "product.html";

});

const orderBtn = document.querySelector(".btn-order");

orderBtn.addEventListener("click", () => {
    alert("This feature will be available in the next version.");
});