document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsList = document.getElementById("cart-items");

  if (cartItems.length > 0) {
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
    });
  } else {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
          <figure class="itemside">
            <div class="aside"><img src="images/icons/empty_cart.png" class="img-sm img-fluid"></div>
            <figcaption class="info">
              <a href="#" class="title text-dark">No items at the moment</a>
            </figcaption>
          </figure>
        </td>
    `;
    cartItemsList.appendChild(tr);
  }
});
