// Sample products data
const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

// Function to render products in the product list
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;

        // Create the "Add to Cart" button
        const addButton = document.createElement('button');
        addButton.textContent = "Add to Cart";
        addButton.addEventListener('click', () => addToCart(product));

        li.appendChild(addButton);
        productList.appendChild(li);
    });
}

// Function to add product to the shopping cart
function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Add the selected product to the cart
    cart.push(product);

    // Update the session storage with the new cart
    sessionStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart
    renderCart();
}

// Function to render the shopping cart from session storage
function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear the current cart list

    // Get the cart from session storage
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

// Function to clear the shopping cart
function clearCart() {
    sessionStorage.removeItem('cart');
    renderCart(); // Update the UI after clearing the cart
}

// Event listener for the "Clear Cart" button
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Initialize the page by rendering products and the cart
function init() {
    renderProducts();
    renderCart();
}

// Call the init function to set up the page
init();
