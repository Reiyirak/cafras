document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsList = document.getElementById("cart-items");
  const shipping_fee = document.getElementById("shippingFee");
  const shipping = document.getElementById("shipping");
  const subtotal = document.getElementById("subtotal");
  const total = document.getElementById("total");
  const purchaseBtn = document.getElementById("purchase-btn");

  if (cartItems.length > 0) {
    let subtotalCart = 0;
    var shippingfee = 50;
    let totalCart = 0;

    cartItems.forEach((item, index) => {
      let totalItem = (item.price * item.amount).toFixed(2);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <figure class="itemside">
            <div class="aside"><img src="${item.image}" class="img-sm img-fluid"></div>
            <figcaption class="info">
              <a href="#" class="title text-dark">${item.name}</a>
            </figcaption>
          </figure>
        </td>
        <td>
          <p class="form-control">${item.amount}</p>
        </td>
        <td>
          <div class="price-wrap">
            <var class="price">$${totalItem}MXN</var>
            <small class="text-muted">$${item.price}MXN c/u</small>
          </div> <!-- price-wrap .// -->
        </td>
        <td class="text-right">
          <a href="" class="btn btn-light edit-amount-btn" data-index="${index}"> Cantidad</a>
        </td>
        <td class="text-right">
          <a href="" class="btn btn-light remove-btn" data-index="${index}"> Quitar</a>
        </td>
    `;
      cartItemsList.appendChild(tr);
      subtotalCart += parseInt(totalItem);
    });

    // Add event listener to remove buttons
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
      button.addEventListener("click", removeCartItem);
    });

    // Add event listeners to edit amount buttons
    const editAmountButtons = document.querySelectorAll(".edit-amount-btn");
    editAmountButtons.forEach((button) => {
      button.addEventListener("click", editAmount);
    });

    // The prices that will be displayed on the cart
    if (subtotalCart < 200) {
      shipping_fee.innerText = `$${shippingfee} MXN`;
      shipping.innerText = `${shippingfee}`;
    } else {
      shippingfee = 0;
      shipping_fee.innerText = `$${shippingfee} MXN`;
      shipping.innerText = `${shippingfee}`;
    }
    // subtotalCart = (subtotalCart).toFixed(2)
    subtotal.innerText = `$${subtotalCart} MXN`;

    totalCart = (subtotalCart + shippingfee).toFixed(2);
    total.innerText = `$${totalCart} MXN`;
  } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
          <figure class="itemside">
            <div class="aside"><img src="images/icons/empty_cart.png" class="img-sm img-fluid"></div>
            <figcaption class="info">
              <a href="#" class="title text-dark">El carrito esta vacio</a>
            </figcaption>
          </figure>
        </td>
    `;
    cartItemsList.appendChild(tr);

    shipping_fee.innerText = "$0 MXN";
    subtotal.innerText = "$0 MXN";
    total.innerText = "$0 MXN";
  }

  // Remove the disabled status from the purchase button if the cart has items
  if (cartItems.length > 0) {
    purchaseBtn.removeAttribute("disabled");
  }
});

// Function to remove a cart item from the cart
function removeCartItem(event) {
  const index = event.target.dataset.index;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Refresh the cart view
    location.reload();
  }
}

// Funtion to edit the amout of each item
function editAmount(event) {
  const index = event.target.dataset.index;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (index >= 0 && index < cartItems.length) {
    const newAmount = prompt("Introduce la cantidad:");
    const parsedAmount = parseInt(newAmount);

    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      cartItems[index].amount = parsedAmount;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Refresh the cart view
      location.reload();
    } else {
      alert("Numero invalido, porfavor introduce un numero mayor a 0");
    }
  }
}

// Function to redirect to the loge if the user tries to purchase without an account
function redirectToLogin() {
  window.location.href = "/login"; // Replace '/login' with your actual login page URL
}

// Function to purchase items if the user is logged in an there is items on the cart
const purchaseItems = async () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // const shipping = document.getElementById("shipping");
  // const tax = 0; // Replace with actual tax value
  // const shippingFee = parseInt(shipping.innerText);

  const orderData = {
    // tax,
    // shippingFee,
    items: cartItems,
  };

  try {
    const response = await fetch("/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      setTimeout(() => {
        localStorage.removeItem('cartItems'); // Clear cart items from local storage
        location.reload();
      }, 2000); // 5 seconds delay

      Swal.fire({
        title: "Orden creada!",
        text: "La orden fue creada exitosamente!",
        icon: "success",
        confirmButtonText: "Entendido",
      });
    } else {
      console.log("Hubo un fallo");
    }
  } catch (error) {
    console.log(error);
  }
};
