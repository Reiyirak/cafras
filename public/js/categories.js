const searchBar = document.getElementById("searchBar");
const productList = document.getElementById("productList");

searchBar.addEventListener("input", function() {
  const searchValue = searchBar.value.toLowerCase();
  const productItems = productList.getElementsByClassName("productsArr");

  Array.from(productItems).forEach((item) => {
    const productName = item.querySelector(".title").innerText.toLowerCase();

    if (productName.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

const checkboxes = document.querySelectorAll('input[name="categories"]');
const productItems = productList.getElementsByClassName("productsArr");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function() {
    const selectedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    Array.from(productItems).forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (
        selectedCategories.length === 0 ||
        selectedCategories.includes(itemCategory)
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
