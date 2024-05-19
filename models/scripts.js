document.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.querySelector(".header-icons a img[alt='User']");
  const loginCard = document.getElementById("login-card");
  const registerButton = document.getElementById("register-button");

  let isCardVisible = false;

  userIcon.addEventListener("click", function (event) {
    event.preventDefault();
    if (!isCardVisible) {
      const userIconRect = userIcon.getBoundingClientRect();
      const cardHeight = loginCard.offsetHeight;
      const screenPadding = 10;

      let topPosition = userIconRect.bottom + window.scrollY + 10;

      if (topPosition + cardHeight > window.innerHeight - screenPadding) {
        topPosition = window.innerHeight - cardHeight - screenPadding;
      }

      loginCard.style.top = `${topPosition}px`;
      loginCard.style.left = `${userIconRect.left}px`;

      loginCard.style.display = "block";
      setTimeout(() => {
        loginCard.classList.add("show");
      }, 50);

      isCardVisible = true;
    } else {
      loginCard.classList.remove("show");

      setTimeout(() => {
        loginCard.style.display = "none";
      }, 300);

      isCardVisible = false;
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !loginCard.contains(event.target) &&
      event.target !== userIcon &&
      isCardVisible
    ) {
      loginCard.classList.remove("show");

      setTimeout(() => {
        loginCard.style.display = "none";
      }, 300);

      isCardVisible = false;
    }
  });

  // Redirigir a la página de registro al hacer clic en el botón "Registrarse"
  registerButton.addEventListener("click", function () {
    window.location.href = "/views/signup.html";
  });
});
