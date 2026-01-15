let total = 0;
let counts = { lizard: 0, monkey: 0, boy: 0, frog: 0, earth: 0, kitten: 0, girl: 0, heart: 0, kuromi: 0, octupus: 0, pikachu: 0, stingray: 0, mushroom: 0};
let prices = { lizard: 120, monkey: 120, boy: 150, frog: 60 , earth: 50, kitten: 260, girl: 150, heart: 150, kuromi: 90, octupus: 55, pikachu: 120, stingray: 100, mushroom: 80};

function addItem(price, item) {
  total += price;
  counts[item]++;
  updateDisplay(item);
}

function removeItem(price, item) {
  if (counts[item] > 0) {
    total -= price;
    counts[item]--;
    updateDisplay(item);
  }
}

function updateDisplay(item) {
  document.getElementById("total").textContent = total;
  document.getElementById(item + "-count").textContent = counts[item];
}

function buyItems() {
  if (total === 0) {
    alert("Your cart is empty!");
    return;
  }

  let receipt = "🧾 Receipt:\n\n";
  for (let item in counts) {
    if (counts[item] > 0) {
      receipt += `${capitalize(item)} x${counts[item]} = ₱${counts[item] * prices[item]}\n`;
    }
  }
  receipt += `\nTotal: ₱${total}\n\nThank you for your purchase!`;

  alert(receipt);

  // Reset cart
  total = 0;
  for (let item in counts) {
    counts[item] = 0;
    updateDisplay(item);
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.getElementById("searchInput");

  // When the search button is clicked
  searchBtn.addEventListener("click", () => {
    searchItems(searchInput.value.toLowerCase());
  });

  // Allow pressing Enter to trigger search
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchItems(searchInput.value.toLowerCase());
    }
  });
});

// Function to filter items
function searchItems(query) {
  const items = document.querySelectorAll(".shop .item");

  // If search box is empty, show all items
  if (query.trim() === "") {
    items.forEach(item => item.style.display = "block");
    return;
  }

  // Otherwise filter by text
  items.forEach(item => {
    const text = item.querySelector("p").textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "block"; // show
    } else {
      item.style.display = "none";  // hide
    }
  });
}