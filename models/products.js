document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartIcon = document.getElementById("cart-icon");
  const cartContainer = document.getElementById("cart");
  const cartItems = document.getElementById("cart-items");
  const checkoutButton = document.getElementById("checkout-button");
  const cartTotalAmount = document.getElementById("cart-total-amount");

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const productName = product.querySelector("h3").innerText;
      const productPrice = parseFloat(product.querySelector("p").innerText.replace("Precio: $", ""));

      cart.push({ name: productName, price: productPrice });
      updateCart();
    });
  });

  cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("show");
  });

  checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
      alert("La compra se realizó con éxito.");
      cart.length = 0;
      updateCart();
    } else {
      alert("El carrito está vacío.");
    }
  });

  function updateCart() {
    if (!cartContainer.classList.contains("show")) {
      cartContainer.classList.add("show");
    }
  
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price;
    });
    cartTotalAmount.textContent = total.toFixed(2);
  }
});
