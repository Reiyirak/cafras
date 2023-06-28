function incrementAmount(productId, inventory) {
  const amountElement = document.getElementById("amount" + productId);
  let amount = parseInt(amountElement.textContent);

  if (amount < inventory) {
    // Increment the amount
    amount++;

    // Update the amount element
    amountElement.textContent = amount;
  } 
}

function decrementAmount(productId) {
  const amountElement = document.getElementById("amount" + productId);
  let amount = parseInt(amountElement.textContent);

  // Decrement the amount if it's greater than 0
  if (amount > 1) {
    amount--;
  }

  // Update the amount element
  amountElement.textContent = amount;
}

function getAmount(productId) {
  const amountElement = document.getElementById("amount" + productId);
  return parseInt(amountElement.textContent);
}

function addToCart(productId, name, price, image, amount) {
  // Retrieve cart items from local storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if the product is already in the cart
  const existingProduct = cartItems.find((item) => item.product === productId);

  if (existingProduct) {
    // If the product is already in the cart, update the amount
    existingProduct.amount += amount;
  } else {
    // Create an object for the product
    const product = {
      name: name,
      price: price,
      image: image,
      amount: amount,
      product: productId,
    };

    // Add the product to the cart items array
    cartItems.push(product);
  }

  // Save the updated cart items to the local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Optionally, display a message to the user
  alert("Producto agregado al carrito!");
}
