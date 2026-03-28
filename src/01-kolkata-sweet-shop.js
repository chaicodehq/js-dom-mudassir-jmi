/**
 * 🍬 Kolkata Sweet Shop - createElement & appendChild
 *
 * Kolkata ke famous sweet shop ka digital menu board banana hai.
 * Rasgulla, sandesh, mishti doi - sab kuch DOM elements se render
 * karenge. createElement se items banao, appendChild se menu board
 * pe lagao. Jaise sweet shop mein ek ek mithai counter pe sajati hai,
 * waise hi tum ek ek element DOM mein add karoge.
 *
 * Functions:
 *
 *   1. createSweetItem(name, price, category)
 *      - Creates a div element with class "sweet-item"
 *      - Inside div: h3 (name), p with class "price" (text: "₹{price}"),
 *        span with class "category" (text: category)
 *      - Returns the div element
 *      - Validation: name must be string, price must be number, category must be string
 *      - Agar koi bhi param missing ya invalid type, return null
 *
 *   2. buildMenuBoard(sweets)
 *      - Takes array of {name, price, category} objects
 *      - Creates a div with id "menu-board"
 *      - Loop through sweets, call createSweetItem for each
 *      - Append each sweet item to menu-board
 *      - Returns the menu-board div
 *      - Empty array returns div with no children (bas empty menu-board)
 *      - Agar sweets not array, return null
 *
 *   3. addSpecialBadge(sweetElement, badgeText)
 *      - Takes a sweet-item element and badge text string
 *      - Creates a span with class "special-badge" and textContent = badgeText
 *      - Appends the span to sweetElement
 *      - Returns the modified sweetElement
 *      - Agar sweetElement null/undefined, return null
 *      - Agar badgeText not string or empty, return null
 *
 * Hint: document.createElement() se naya element banao,
 *   element.classList.add() se class lagao, element.appendChild() se
 *   child add karo, element.textContent se text dalo.
 *
 * @param {string} name - Sweet ka naam (e.g., "Rasgulla")
 * @param {number} price - Sweet ki price in rupees (e.g., 30)
 * @param {string} category - Sweet ki category (e.g., "Bengali")
 * @returns {HTMLDivElement|null} - Sweet item element ya null agar invalid
 *
 * @example
 *   const item = createSweetItem("Rasgulla", 30, "Bengali");
 *   // => <div class="sweet-item">
 *   //      <h3>Rasgulla</h3>
 *   //      <p class="price">₹30</p>
 *   //      <span class="category">Bengali</span>
 *   //    </div>
 *
 *   const board = buildMenuBoard([
 *     { name: "Rasgulla", price: 30, category: "Bengali" },
 *     { name: "Sandesh", price: 40, category: "Bengali" }
 *   ]);
 *   // => <div id="menu-board">...2 sweet items...</div>
 *
 *   addSpecialBadge(item, "Bestseller");
 *   // => item now has <span class="special-badge">Bestseller</span>
 */
export function createSweetItem(name, price, category) {
  const sweetItem = document.createElement("div");
  sweetItem.classList.add("sweet-item");
  if (typeof name !== "string" || typeof price !== "number" || typeof category !== "string") {
    return null;
  }
  const nameElement = document.createElement("h3");
  nameElement.textContent = name;
  sweetItem.appendChild(nameElement);
  const priceElement = document.createElement("p");
  priceElement.classList.add("price");
  priceElement.textContent = `₹${price}`;
  sweetItem.appendChild(priceElement);
  const categoryElement = document.createElement("span");
  categoryElement.classList.add("category");
  categoryElement.textContent = category;
  sweetItem.appendChild(categoryElement);
  return sweetItem;
}

export function buildMenuBoard(sweets) {
  if (!Array.isArray(sweets)) {
    return null;
  }
  const menuBoard = document.createElement("div");
  menuBoard.id = "menu-board";
  sweets.forEach(sweet => {
    const sweetItem = createSweetItem(sweet.name, sweet.price, sweet.category);
    if (sweetItem) {
      menuBoard.appendChild(sweetItem);
    }
  });
  return menuBoard;
}

export function addSpecialBadge(sweetElement, badgeText) {
  if (!sweetElement || typeof badgeText !== "string" || badgeText.trim() === "") {
    return null;
  }
  const badge = document.createElement("span");
  badge.classList.add("special-badge");
  badge.textContent = badgeText;
  sweetElement.appendChild(badge);
  return sweetElement;  
}
