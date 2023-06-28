document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;
      const productTableBody = document.getElementById("productTableBody");

      products.forEach((product) => {
        const productRow = document.createElement("tr");
        productRow.innerHTML = `
          <td class="table-primary">
            <p class="form-text">${product.name}</p>
          </td>
          <td>
            <p class="form-text">${product.description}</p>
          </td>
          <td class="table-primary">
            <p class="form-text">${product.category}</p>
          </td>
          <td>
            <p class="form-text">${product.price}</p>
          </td>
          <td class="table-primary">
            <p class="form-text">${product.inventory}</p>
          </td>
          <td>
            <button class="btn" onclick="editProduct('${product._id}')">
              <i class="fa fa-edit"></i>
            </button>
          </td>
        `;

        productTableBody.appendChild(productRow);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

function editProduct(productId) {
  // Fetch product details
  fetch(`http://localhost:5000/api/v1/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      // Get modal elements
      const modal = document.getElementById("editModal");
      const nameInput = document.getElementById("editName");
      const priceInput = document.getElementById("editPrice");
      const descriptionInput = document.getElementById("editDescription");
      // const imageInput = document.getElementById("editImage");
      const inventoryInput = document.getElementById("editInventory");
      const saveButton = document.getElementById("saveChanges");

      const priceError = document.getElementById("editPriceError");
      const inventoryError = document.getElementById("editInventoryError");

      // Set initial values in modal inputs
      nameInput.value = product.product.name;
      priceInput.value = product.product.price;
      descriptionInput.value = product.product.description;
      // imageInput.value = product.product.image;
      inventoryInput.value = product.product.inventory;

      // Show the modal
      modal.style.display = "block";
      $("#editModal").modal();

      // Save changes button event listener
      saveButton.addEventListener("click", () => {
        // Create updated product object
        const updatedProduct = {
          name: nameInput.value,
          price: parseFloat(priceInput.value),
          description: descriptionInput.value,
          // image: imageInput.value,
          inventory: parseInt(inventoryInput.value),
        };

        if (isNaN(updatedProduct.price) || updatedProduct.price < 0) {
          priceError.textContent = "El precio debe de ser un numero positivo";

          Swal.fire({
            title: "Error",
            text: "El precio debe de ser un numero positivo",
            icon: "error",
            confirmButtonText: "Entendido",
          });

          return;
        }

        if (isNaN(updatedProduct.inventory) || updatedProduct.inventory <= 0) {
          inventoryError.textContent = "El inverntario tiene que ser mayor a 0";

          Swal.fire({
            title: "Error",
            text: "El inverntario tiene que ser mayor a 0",
            icon: "error",
            confirmButtonText: "Entendido",
          });

          return;
        }

        // Send POST request to update the product
        fetch(`http://localhost:5000/api/v1/products/${productId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Product updated successfully:", data);
            // Close the modal
            modal.style.display = "none";
            // Refresh the product list or perform any other necessary actions
            location.reload();
          })
          .catch((error) => {
            console.error("Error updating product:", error);
            // Handle any error occurred during the update process
            // ...
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      // Handle any error occurred during the fetching process
      // ...
    });
}

// Function to open the create product modal
function openCreateProductModal() {
  // Get modal element
  const modal = document.getElementById("createModal");

  // Clear input values
  document.getElementById("createName").value = "";
  document.getElementById("createPrice").value = "";
  document.getElementById("createDescription").value = "";
  // document.getElementById("createImage").value = "";
  document.getElementById("createInventory").value = "";

  // Show the modal
  modal.style.display = "block";
  $("#createModal").modal();
}

// Function to create a new product
function createProduct() {
  // Get input values from the create modal
  const nameInput = document.getElementById("createName");
  const priceInput = document.getElementById("createPrice");
  const descriptionInput = document.getElementById("createDescription");
  // const imageInput = document.getElementById("createImage");
  const categoryInput = document.getElementById("createCategory");
  const inventoryInput = document.getElementById("createInventory");

  const priceError = document.getElementById("createPriceError");
  const inventoryError = document.getElementById("createInventoryError");

  // Create new product object
  const newProduct = {
    name: nameInput.value,
    price: parseFloat(priceInput.value),
    description: descriptionInput.value,
    category: categoryInput.value,
    // image: imageInput.value,
    inventory: parseInt(inventoryInput.value),
  };

  if (isNaN(newProduct.price) || newProduct.price < 0) {
    priceError.textContent = "El precio debe de ser un numero positivo";

    Swal.fire({
      title: "Error",
      text: "El precio debe de ser un numero positivo",
      icon: "error",
      confirmButtonText: "Entendido",
    });

    return;
  }

  if (isNaN(newProduct.inventory) || newProduct.inventory <= 0) {
    inventoryError.textContent = "El inverntario tiene que ser mayor a 0";

    Swal.fire({
      title: "Error",
      text: "El inverntario tiene que ser mayor a 0",
      icon: "error",
      confirmButtonText: "Entendido",
    });

    return;
  }

  // Send POST request to create the product
  fetch("http://localhost:5000/api/v1/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product created successfully:", data);
      // Close the create modal
      const modal = document.getElementById("createModal");
      modal.style.display = "none";
      // Refresh the product list or perform any other necessary actions
      location.reload();
    })
    .catch((error) => {
      console.error("Error creating product:", error);
      // Handle any error occurred during the creation process
      // ...
    });
}
