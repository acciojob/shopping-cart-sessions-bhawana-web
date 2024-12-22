// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to render products to the page
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';  // Clear any existing content
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Function to get the current cart from session storage
function getCartFromSession() {
  const cart = JSON.parse(sessionStorage.getItem('cart'));
  return cart ? cart : [];
}

// Function to render the cart
function renderCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';  // Clear any existing content
  const cart = getCartFromSession();

  if (cart.length === 0) {
    cartList.innerHTML = 'Your cart is empty.';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - $${item.price}`;
      cartList.appendChild(li);
    });
  }
}

// Function to add a product to the cart and store it in session storage
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cart = getCartFromSession();

  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));

  renderCart();  // Re-render the cart
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem('cart');
  renderCart();  // Re-render the cart
}

// Initialize the page by rendering products and the cart
function init() {
  renderProducts();
  renderCart();

  // Add event listener to clear cart button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  clearCartBtn.addEventListener('click', clearCart);
}

// Call the init function when the page loads
window.onload = init;
