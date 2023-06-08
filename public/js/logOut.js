const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/v1/auth/logout');
    location.reload();
  } catch (error) {
    console.log(error);
  }
});
