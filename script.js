// Sample product data
// Sample Product Data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Retrieve cart data from session storage or initialize an empty cart
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Function to render product list on the page
function renderProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous products
  products.forEach((product) => {
    const li = document.createElement("li");
    li.className = "product-item";
    li.innerHTML = `${product.name} - $${product.price} 
      <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Function to render shopping cart
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear previous cart items
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Function to add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product && !cart.some((item) => item.id === productId)) {
    cart.push(product);
    updateCartInSession();
    renderCart();
  }
}

// Function to clear the cart
function clearCart() {
  cart = [];
  updateCartInSession();
  renderCart();
}

// Function to update cart data in session storage
function updateCartInSession() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Event listener for clear cart button
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial render
renderProductList();
renderCart();
