const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!emailInput.value || !passwordInput.value) return;

  const email = emailInput.value;
  const password = passwordInput.value;
  const user = { email, password };

  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      passwordInput.value = "";
      Swal.fire({
        title: "Error!",
        text: "El email o password estan incorrectos, favor de intentarlo una vez mas",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
