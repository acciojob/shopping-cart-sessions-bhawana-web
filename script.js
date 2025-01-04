// Sample products data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to render the products
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productItem = document.createElement('li');
    productItem.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(productItem);
  });

  // Add event listeners to the "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Function to add a product to the cart
function addToCart(event) {
  const productId = parseInt(event.target.getAttribute('data-product-id'));
  const product = products.find(p => p.id === productId);

  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  
  // Check if the product is already in the cart
  const productInCart = cart.find(item => item.id === product.id);
  
  if (productInCart) {
    alert(`${product.name} is already in the cart.`);
  } else {
    cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Function to render the cart from session storage
function renderCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';

  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartList.innerHTML = 'Your cart is empty.';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.innerHTML = `${item.name} - $${item.price}`;
      cartList.appendChild(cartItem);
    });
  }
}

// Function to clear the cart
function clearCart() {
  sessionStorage.removeItem('cart');
  renderCart();
}

// Event listener to clear the cart
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Initialize the page
function init() {
  renderProducts();
  renderCart();
}

// Initialize the page on load
window.onload = init;
