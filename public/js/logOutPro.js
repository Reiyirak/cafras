const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/v1/auth/logout');
    setTimeout(() => {
      window.location.href('http://localhost:5000/')
    }, 1000)
  } catch (error) {
    console.log(error);
  }
});
