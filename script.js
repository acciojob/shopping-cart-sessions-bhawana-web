// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to display products in the product list
function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear any existing products

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(productItem);
  });
}

// Function to add product to the cart and update session storage
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Get cart from session storage or initialize an empty array
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Add product to the cart
  cart.push(product);

  // Save updated cart in session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Update cart UI
  displayCart();
}

// Function to display items in the cart from session storage
function displayCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear any existing cart items

  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cart.forEach((product) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${product.name} - $${product.price}`;
    cartList.appendChild(cartItem);
  });
}

// Function to clear the cart and session storage
function clearCart() {
  sessionStorage.removeItem("cart");
  displayCart(); // Refresh the cart display
}

// Event listener to clear the cart
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initialize the page with products and cart state
displayProducts();
displayCart();
