/* =========================
   Product Data
   - website မှာပြမယ့် product 10 ခု
   ========================= */
const products = [
  {
    id: 1,
    name: "Nike Air Max Pulse",
    category: "Running",
    price: 180,
    desc: "Responsive cushioning with modern streetwear style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Nike Zoom Fly 5",
    category: "Performance",
    price: 200,
    desc: "Built for speed with lightweight support and comfort.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Nike Metcon X",
    category: "Training",
    price: 170,
    desc: "Strong grip and balance for gym and power workouts.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Nike Air Force One",
    category: "Lifestyle",
    price: 150,
    desc: "Classic silhouette with timeless everyday appeal.",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Nike Revolution 6",
    category: "Running",
    price: 120,
    desc: "Light and flexible comfort for daily movement.",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Nike Court Vision",
    category: "Casual",
    price: 130,
    desc: "Basketball-inspired design for a clean urban look.",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 7,
    name: "Nike Free Run 5.0",
    category: "Training",
    price: 145,
    desc: "Natural movement feel with flexible sole support.",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 8,
    name: "Nike Pegasus Turbo",
    category: "Running",
    price: 190,
    desc: "Reliable daily trainer for smooth fast runs.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 9,
    name: "Nike Dunk Low",
    category: "Street",
    price: 165,
    desc: "A cultural icon with bold colorway potential.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 10,
    name: "Nike React Infinity",
    category: "Performance",
    price: 210,
    desc: "High-mileage cushioning designed to keep you going.",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80"
  }
];

/* =========================
   Google Apps Script URL
   ========================= */
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxx6vMJWAKVGkfhS1MA5ItXOQfoI6S00r-eIU8yf2pyeXNJ0n4oZVXopPlCk8j6H3CP/exec";

/* =========================
   Cart Data
   ========================= */
let cart = JSON.parse(localStorage.getItem("nikeCart")) || [];

/* =========================
   DOM Elements
   ========================= */
const productsGrid = document.getElementById("products-grid");
const cartCount = document.getElementById("cart-count");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckoutBtn = document.getElementById("close-checkout-btn");
const orderForm = document.getElementById("order-form");
const orderedItemsField = document.getElementById("ordered-items");
const totalPriceField = document.getElementById("total-price");
const successModal = document.getElementById("success-modal");
const successOkBtn = document.getElementById("success-ok-btn");
const submitOrderBtn = document.getElementById("submit-order-btn");

/* =========================
   Product Card တွေ render လုပ်မယ်
   ========================= */
function renderProducts() {
  productsGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="product-bottom">
          <div class="product-price">$${product.price}</div>
          <button class="add-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

/* =========================
   Cart ကို browser မှာမှတ်ထားမယ်
   ========================= */
function saveCart() {
  localStorage.setItem("nikeCart", JSON.stringify(cart));
}

/* =========================
   Cart Count update
   ========================= */
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
}

/* =========================
   Add to Cart
   ========================= */
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  saveCart();
  updateCartCount();
  renderCart();
  openCart();
}

/* =========================
   Cart ထဲက item ဖျက်မယ်
   ========================= */
function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

/* =========================
   Quantity ပြောင်းမယ်
   ========================= */
function changeQty(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    removeItem(productId);
    return;
  }

  saveCart();
  updateCartCount();
  renderCart();
}

/* =========================
   Cart Drawer render
   ========================= */
function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-text">Your cart is empty.</p>`;
    cartTotal.textContent = "$0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    return `
      <div class="cart-item">
        <div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-sub">$${item.price} × ${item.qty} = $${subtotal}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  cartTotal.textContent = `$${total}`;
}

/* =========================
   Cart Drawer open/close
   ========================= */
function openCart() {
  cartDrawer.classList.add("show");
  cartOverlay.classList.add("show");
}

function closeCart() {
  cartDrawer.classList.remove("show");
  cartOverlay.classList.remove("show");
}

/* =========================
   Checkout Form ဖွင့်မယ်
   - cart summary auto ဖြည့်
   ========================= */
function openCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const summary = cart.map(item => {
    return `${item.name} x${item.qty} = $${item.price * item.qty}`;
  }).join("\n");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  orderedItemsField.value = summary;
  totalPriceField.value = `$${total}`;

  /* cart drawer ကိုအရင်ပိတ် */
  cartDrawer.classList.remove("show");
  cartOverlay.classList.remove("show");

  checkoutModal.classList.add("show");
  document.body.classList.add("modal-open");
}

/* checkout modal ပိတ် */
function closeCheckout() {
  checkoutModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

/* success modal ပြ */
function showSuccess() {
  successModal.classList.add("show");
  document.body.classList.add("modal-open");
}

/* success modal ပိတ် */
function closeSuccess() {
  successModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

/* =========================
   Cart Clear
   ========================= */
function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
}

/* =========================
   Add to Cart button event
   ========================= */
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("add-btn")) {
    const productId = Number(e.target.dataset.id);
    addToCart(productId);
  }
});

/* =========================
   Other Button Events
   ========================= */
openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", openCheckout);
closeCheckoutBtn.addEventListener("click", closeCheckout);

successOkBtn.addEventListener("click", () => {
  closeSuccess();
  closeCheckout();
  closeCart();
});

/* modal နောက်ခံကိုနှိပ်ရင် checkout modal ပိတ် */
checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    closeCheckout();
  }
});

/* success modal နောက်ခံကိုနှိပ်ရင်ပိတ် */
successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    closeSuccess();
  }
});

/* ESC နှိပ်ရင် modal ပိတ် */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (successModal.classList.contains("show")) {
      closeSuccess();
    }
    if (checkoutModal.classList.contains("show")) {
      closeCheckout();
    }
  }
});

/* =========================
   Order Submit
   - form data ကို Google Apps Script ဆီပို့
   ========================= */
orderForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  submitOrderBtn.disabled = true;
  submitOrderBtn.textContent = "Submitting...";

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const orderedItems = cart.map(item => `${item.name} x${item.qty}`).join(", ");

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    location: document.getElementById("location").value.trim(),
    orderedItems: orderedItems,
    totalPrice: total
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.status === "success") {
      orderForm.reset();
      closeCheckout();
      clearCart();
      showSuccess();
    } else {
      alert("Order submit failed.");
    }
  } catch (error) {
    alert("Error submitting order. Please try again.");
    console.error(error);
  } finally {
    submitOrderBtn.disabled = false;
    submitOrderBtn.textContent = "Submit Order";
  }
});

/* =========================
   Initial Load
   ========================= */
renderProducts();
updateCartCount();
renderCart();
