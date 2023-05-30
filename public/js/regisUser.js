const form = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!emailInput.value || !passwordInput.value) return;

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const user = { name, email, password };

  try {
    const response = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      emailInput.value = "";
      Swal.fire({
        title: "Error!",
        text: "El email ya esta siendo usado, porfavor introduce otro",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
