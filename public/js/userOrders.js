document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/v1/orders/showAllMyOrders")
    .then((response) => response.json())
    .then((data) => {
      const orders = data.orders;
      const orderTableBody = document.getElementById("orderTableBody");

      orders.forEach((order) => {
        const orderRow = document.createElement("tr");
        orderRow.innerHTML = `
          <td>
            <p class="form-text">${order.orderItems.map(item => item.name).join('<br>')}</p>
          </td>
          <td>
            <p class="form-text">${order.orderItems.map(item => item.amount).join('<br>')}</p>
          </td>
          <td>
            <p class="form-text">$${order.orderItems.map(item => item.price).join('<br>')}</p>
          </td>
          <td>
            <p class="form-text">$${order.total.toFixed(2)}MXN</p>
          </td>
        `;

        orderTableBody.appendChild(orderRow);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // if (cartItems.length > 0) {
  //   let subtotalCart = 0;
  //   var shippingfee = 50;
  //   let totalCart = 0;
  //
  //   cartItems.forEach((item, index) => {
  //     let totalItem = (item.price * item.amount).toFixed(2);
  //     const tr = document.createElement("tr");
  //     tr.innerHTML = `
  //       <td>
  //         <figure class="itemside">
  //           <div class="aside"><img src="${item.image}" class="img-sm img-fluid"></div>
  //           <figcaption class="info">
  //             <a href="#" class="title text-dark">${item.name}</a>
  //           </figcaption>
  //         </figure>
  //       </td>
  //       <td>
  //         <p class="form-control">${item.amount}</p>
  //       </td>
  //       <td>
  //         <div class="price-wrap">
  //           <var class="price">$${totalItem}MXN</var>
  //           <small class="text-muted">$${item.price}MXN c/u</small>
  //         </div> <!-- price-wrap .// -->
  //       </td>
  //       <td class="text-right">
  //         <a href="" class="btn btn-light edit-amount-btn" data-index="${index}"> Cantidad</a>
  //       </td>
  //       <td class="text-right">
  //         <a href="" class="btn btn-light remove-btn" data-index="${index}"> Quitar</a>
  //       </td>
  //   `;
  //     cartItemsList.appendChild(tr);
  //     subtotalCart += parseInt(totalItem);
  //   });
  // }
});
