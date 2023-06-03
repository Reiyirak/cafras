document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsList = document.getElementById("cart-items");
  const shipping_fee = document.getElementById("shippingFee");
  const subtotal = document.getElementById("subtotal");
  const total = document.getElementById("total");

  if (cartItems.length > 0) {
    let subtotalCart = 0;
    let shippingfee = 50;
    let totalCart = 0;

    cartItems.forEach((item) => {
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
            <var class="price">${totalItem}</var>
            <small class="text-muted">${item.price} c/u</small>
          </div> <!-- price-wrap .// -->
        </td>
        <td class="text-right">
          <a href="" class="btn btn-light"> Remove</a>
        </td>
    `;
      cartItemsList.appendChild(tr);
      subtotalCart += parseInt(totalItem);
    });

    if (subtotalCart < 200) {
      shipping_fee.innerText = `$${shippingfee} MXN`;
    } else {
      shippingfee = 0;
      shipping_fee.innerText = `$${shippingfee} MXN`;
    }
    // subtotalCart = (subtotalCart).toFixed(2)
    console.log(typeof subtotalCart)
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
});
