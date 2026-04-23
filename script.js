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

const productsGrid = document.getElementById("products-grid");
const cartCount = document.getElementById("cart-count");

let cart = 0;

function renderProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

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
          <button class="add-btn" data-name="${product.name}" data-price="${product.price}">
            Add
          </button>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-btn")) {
    cart++;
    cartCount.textContent = cart;

    const productName = e.target.dataset.name;
    alert(`${productName} added to cart!`);
  }
});

renderProducts();
