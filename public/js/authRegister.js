const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const payload = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Handle the response as needed
  } catch (error) {
    console.log(error);
  }
});
