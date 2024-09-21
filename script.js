let cartCount = 0;
let totalPrice = 0;
let quantities = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};

function addToCart(itemId, price) {
    if (quantities[itemId] === 0) {
        // First time adding the item, show + and - buttons
        document.querySelector(`#product-${itemId} button`).style.display = 'none';
        document.querySelector(`#product-${itemId} .controls`).style.display = 'flex';
    }
    
    // Increment quantity, cart count, and total price
    quantities[itemId] += 1;
    cartCount += 1;
    totalPrice += price;

    // cart count, total price, and item quantity
    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    document.getElementById(`item-${itemId}-quantity`).textContent = quantities[itemId];
    
    // selected items and cart
    updateSelectedItems();
}

function removeFromCart(itemId, price) {
    if (quantities[itemId] > 0) {
        // Decrement quantity, cart count, and total price
        quantities[itemId] -= 1;
        cartCount -= 1;
        totalPrice -= price;
        
        // cart count, total price, and item quantity
        document.getElementById("cart-count").textContent = cartCount;
        document.getElementById("total-price").textContent = totalPrice.toFixed(2);
        document.getElementById(`item-${itemId}-quantity`).textContent = quantities[itemId];

        // If item quantity goes to 0, hide + and - buttons and show "Add to Cart"
        if (quantities[itemId] === 0) {
            document.querySelector(`#product-${itemId} button`).style.display = 'block';
            document.querySelector(`#product-${itemId} .controls`).style.display = 'none';
        }

        // selected items in the cart
        updateSelectedItems();
    }
}

function updateSelectedItems() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // Clear the list

    let cartHasItems = false;
    
    for (let i = 1; i <= 9; i++) {
        if (quantities[i] > 0) {
            cartHasItems = true;

            // Get product name and price
            const productName = document.querySelector(`#product-${i} figcaption`).innerText;
            const productPrice = document.querySelector(`#product-${i} .price`).innerText;

            // Create a list item for the product
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${productName} x ${quantities[i]} @ ${productPrice}
                <span class="remove-item" onclick="removeFromCart(${i}, ${parseFloat(productPrice.replace('$', ''))})"></span>
            `;
            itemList.appendChild(listItem);
        }
    }

    // Show an empty cart image if no items are in the cart
    if (!cartHasItems) {
        const emptyCartImg = document.createElement('img');
        emptyCartImg.src = './Images/illustration-empty-cart.svg';
        emptyCartImg.alt = 'Empty cart';
        emptyCartImg.classList.add('empty');
        itemList.appendChild(emptyCartImg);
    }
}

function confirmOrder() {
    let orderSummary = '';
    let orderHasItems = false;

    for (let i = 1; i <= 9; i++) {
        if (quantities[i] > 0) {
            const productName = document.querySelector(`#product-${i} figcaption`).innerText;
            orderSummary += `${productName}: ${quantities[i]} x $${parseFloat(document.querySelector(`#product-${i} .price`).innerText.replace('$', ''))} <br>`;
            orderHasItems = true;
        }
    }

    if (orderHasItems) {
        document.getElementById('order-summary').innerHTML = orderSummary;
        document.getElementById('popup-total-price').innerText = totalPrice.toFixed(2); // Show Total Price in popup
        document.getElementById('order-confirm-popup').style.display = 'flex';
        document.getElementById('overlay').style.display = 'block'
    } else {
        alert("Your cart is empty.");
    }
}

function startNewOrder() {
    // Close popup and reset everything
    document.getElementById('order-confirm-popup').style.display = 'none';
    resetCart();
    document.getElementById('overlay').style.display = 'none'
    
}

function resetCart() {
    // Reset cart count, total price, and item quantities
    cartCount = 0;
    totalPrice = 0;
    quantities = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};

    // Update HTML
    document.getElementById("cart-count").innerText = cartCount;
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
    document.getElementById('item-list').innerHTML = ''; // Clear the selected items list

    // Reset all item quantities and switch back to "Add to Cart" button
    for (let i = 1; i <= 9; i++) {
        document.querySelector(`#product-${i} button`).style.display = 'block';
        document.querySelector(`#product-${i} .controls`).style.display = 'none';
        document.getElementById(`item-${i}-quantity`).innerText = 1;
    }

    
}
