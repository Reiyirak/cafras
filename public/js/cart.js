function addToCart(productId, amount) {
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
      product: productId,
      amount: amount,
    };

    // Add the product to the cart items array
    cartItems.push(product);
  }

  // Save the updated cart items to the local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Optionally, display a message to the user
  alert("Product added to cart!");
}
