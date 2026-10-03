let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productCards = document.querySelectorAll(".product_card");
const cartCount = document.getElementById("cart-count");

function updateCartCount(){
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    cartCount.textContent = totalItems;
}

const searchInput = document.getElementById("search2");

searchInput.addEventListener("keyup", () => {

    const searchValue = searchInput.value.toLowerCase();

    productCards.forEach(card => {

        const productName = card.dataset.name.toLowerCase();

        if(productName.includes(searchValue)){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});

const categoryFilter = document.querySelector(".categorie");

categoryFilter.addEventListener("change", () => {

    const selectedCategory = categoryFilter.value;

    productCards.forEach(card => {

        const category = card.dataset.category;

        if(selectedCategory === "All Categories" || category === selectedCategory){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

});

updateCartCount();
productCards.forEach(card=>{

    const button = card.querySelector(".ATC");

    button.addEventListener("click",()=>{

        const product={

            id:card.dataset.id,

            name:card.dataset.name,

            price:Number(card.dataset.price),

            image:card.dataset.image,

            category:card.dataset.category,

            rating:Number(card.dataset.rating),

            quantity:1

        };

        const existingProduct = cart.find(item => item.id === product.id);
        
            if(existingProduct){
                existingProduct.quantity++;
            }
            else{
                cart.push(product);
            }
            
            updateCartCount();
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart);
    
});

});