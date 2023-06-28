document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/v1/orders")
    .then((response) => response.json())
    .then((data) => {
      const orders = data.orders;
      const orderTableBody = document.getElementById("orderTableBody");

      orders.forEach((order) => {
        const orderRow = document.createElement("tr");
        orderRow.innerHTML = `
          <td class="table-primary">
            <p class="form-text">${order.user}</p>
          </td>
          <td>
            <p class="form-text">${order.orderItems.map(item => item.name).join('<br>')}</p>
          </td>
          <td class="table-primary">
            <p class="form-text">${order.orderItems.map(item => item.amount).join('<br>')}</p>
          </td>
          <td>
            <p class="form-text">$${order.orderItems.map(item => item.price).join('<br>')}</p>
          </td>
          <td class="table-primary">
            <p class="form-text">$${order.total.toFixed(2)}MXN</p>
          </td>
        `;

        orderTableBody.appendChild(orderRow);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
